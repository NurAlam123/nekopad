import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || url.trim() === "") {
    return NextResponse.json(
      { valid: false, error: "EMPTY_URL" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url, { method: "HEAD" });

    if (!res.ok) {
      return NextResponse.json(
        { valid: false, error: "UNREACHABLE" },
        { status: 404 },
      );
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return NextResponse.json(
        { valid: false, error: "NOT_IMAGE" },
        { status: 400 },
      );
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json(
      { valid: false, error: "INVALID_URL" },
      { status: 500 },
    );
  }
}
