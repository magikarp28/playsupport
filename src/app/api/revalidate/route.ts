import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const paths = ["/", "/gallery", "/de", "/de/gallery"];
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: true, paths });
}
