import fs from "fs";
import path from "path";

export function getGalleryImages() {
  const imagesDirectory = path.join(
    process.cwd(),
    "public",
    "images/minisReel"
  );
  const filenames = fs.readdirSync(imagesDirectory);

  const images = filenames.map((filename) => ({
    src: `/images/minisReel/${filename}`,
  }));

  return images;
}
