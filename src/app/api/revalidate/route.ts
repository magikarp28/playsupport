import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret =
    searchParams.get("secret") ?? searchParams.get("REVALIDATE_SECRET");
  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    console.error("[revalidate] REVALIDATE_SECRET is not configured");
    return NextResponse.json(
      { message: "Server misconfigured" },
      { status: 500 },
    );
  }

  if (secret !== configuredSecret) {
    console.warn("[revalidate] Invalid token", {
      hasSecretParam: Boolean(secret),
      tokenLength: secret?.length ?? 0,
      userAgent: req.headers.get("user-agent"),
    });
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const urlPaths = ["/", "/gallery", "/de", "/de/gallery"];
  for (const path of urlPaths) {
    revalidatePath(path);
  }

  // Invalidate dynamic app-router entries as well, which can be the actual cache keys.
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/gallery", "page");

  console.info("[revalidate] Success", {
    paths: [...urlPaths, "/[locale]", "/[locale]/gallery"],
    userAgent: req.headers.get("user-agent"),
  });

  return NextResponse.json({
    revalidated: true,
    paths: [...urlPaths, "/[locale]", "/[locale]/gallery"],
  });
}
