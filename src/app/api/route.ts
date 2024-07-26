import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Image {
  src: string;
}

export function getGalleryImages(): string[] {
  const imagesDirectory = path.join(
    process.cwd(),
    "public",
    "images/minisReel"
  );
  const filenames = fs.readdirSync(imagesDirectory);

  const images: string[] = filenames.map(
    (filename) => `/images/minisReel/${filename}`
  );

  return images;
}

export async function GET(req: NextRequest) {
  const images = getGalleryImages();
  return NextResponse.json(images);
}
