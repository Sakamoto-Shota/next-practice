import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { google } from "@ai-sdk/google";
import { generateImage } from "ai";

const PREFIXES = ["ring", "mount", "gem"] as const;

function partFilePath(categoryIndex: number, partIndex: number): string {
  const key = PREFIXES[categoryIndex as 0 | 1 | 2];
  if (!key) throw new Error("Invalid category");
  return join(
    process.cwd(),
    "public",
    "images",
    "parts",
    `${key}-${partIndex}.png`
  );
}

/**
 * POST /api/generate
 * body: { selectedParts: [number, number, number], displayType?: string }
 * 選択した3パーツ画像を参照し、Gemini 画像モデルで完成イメージを生成します。
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const selectedParts = body.selectedParts as number[] | undefined;
    const displayType = (body.displayType as string) ?? "ring-only";

    if (
      !Array.isArray(selectedParts) ||
      selectedParts.length < 3 ||
      selectedParts.some((n) => typeof n !== "number")
    ) {
      return Response.json(
        { error: "selectedParts は [リング, 台座, 宝石] の3要素の数値配列が必要です" },
        { status: 400 }
      );
    }

    const buffers: Buffer[] = [];
    for (let c = 0; c < 3; c++) {
      const p = partFilePath(c, selectedParts[c]);
      if (!existsSync(p)) {
        return Response.json(
          { error: `パーツ画像が見つかりません: ${p}` },
          { status: 400 }
        );
      }
      buffers.push(readFileSync(p));
    }

    const displayHint =
      displayType === "wearing"
        ? "指に装着した着用イメージ（手元のリング）"
        : "リング単体の商品写真（スタジオ照明、背景は落ち着いたトーン）";

    // Google 側は参照画像ありのとき、TEXT+IMAGE の両方を許可した方が応答が安定することがある
    const { image, warnings } = await generateImage({
      model: google.image("gemini-2.5-flash-image"),
      prompt: {
        images: buffers.map((b) => new Uint8Array(b)),
        text: `これら3枚の画像は順に「リングの形状」「台座（セッティング）」「宝石」のパーツ参考です。
この3つを論理的に組み合わせた1本のジュエリー（指輪）の完成イメージを1枚、フォトリアルに生成してください。
${displayHint}
パーツの特徴を尊重し、高級感のある仕上がりにしてください。`,
      },
      aspectRatio: "1:1",
      providerOptions: {
        google: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      },
    });

    if (warnings?.length) {
      console.warn("/api/generate warnings:", warnings);
    }

    const imageDataUrl = `data:${image.mediaType};base64,${image.base64}`;

    return Response.json({
      imageDataUrl,
      meta: { selectedParts, displayType },
    });
  } catch (error) {
    console.error("/api/generate:", error);
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    if (stack) console.error(stack);

    return Response.json(
      {
        error: "画像生成に失敗しました",
        details: message,
      },
      { status: 500 }
    );
  }
}
