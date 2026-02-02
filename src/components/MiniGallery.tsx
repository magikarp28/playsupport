import PlaysuppButton from "./PlaysuppButton";
import InfiniteMovingCards from "./ui/infinite-moving-cards";
import { testImageArray } from "@/app/lib/data";
import { performRequest } from "@/lib/dato.js";

type GalleryImage = {
  url: string;
  title?: string;
};

type Gallery = {
  id: string;
  images: GalleryImage[];
  paintingTier: string;
};

type GalleriesResponse = {
  allGalleries: Gallery[];
};

const PAGE_CONTENT_QUERY = `
  query Home {
    allGalleries(first: 6) {
      id
      images {
        url(imgixParams: { w: 600, auto: [format] })
        title
      }
      paintingTier
    }
  }
`;

async function MiniGallery() {
  const response = (await performRequest(
    PAGE_CONTENT_QUERY,
  )) as GalleriesResponse;

  const images =
    response?.allGalleries
      ?.flatMap((gallery) => gallery.images)
      .map((img) => ({
        src: img.url,
        alt: img.title || "Painted miniature", // fallback if no title
      })) || [];

  return (
    <section
      className="w-full bg-gradient-to-b from-black via-slate-900 to-black flex justify-center items-center"
      ria-labelledby="miniature-painting-gallery-heading"
    >
      <div className="w-full max-w-screen-xl overflow-hidden flex flex-col py-6 mx-4 md:mx-0 items-center">
        <h2
          id="miniature-painting-gallery-heading"
          className="text-2xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-3xl pb-2 font-semibold"
        >
          Recently painted miniatures
        </h2>

        <InfiniteMovingCards items={images} />

        <PlaysuppButton text="Check Gallery" href="/gallery" />
      </div>
    </section>
  );
}

export default MiniGallery;
