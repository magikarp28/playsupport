export function getGalleryImages() {
  const imagesContext = require.context(
    "../../public/images/minisReel",
    false,
    /\.(png|jpe?g|svg)$/
  );

  const images = imagesContext
    .keys()
    .map((filename) => imagesContext(filename).default);

  return images;
}
