import PlaysuppButton from "./PlaysuppButton";
import InfiniteMovingCards from "./ui/infinite-moving-cards";
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

type MiniGalleryProps = {
  title: string;
  cta: string;
  galleryHref: string;
};

async function MiniGallery({ title, cta, galleryHref }: MiniGalleryProps) {
  const response = (await performRequest(
    PAGE_CONTENT_QUERY,
  )) as GalleriesResponse;

  const images =
    response?.allGalleries?.flatMap((gallery) =>
      gallery.images.map((img) => ({
        src: img.url,
        alt: img.title || "Painted miniature",
        tier: gallery.paintingTier,
      })),
    ) || [];

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
          {title}
        </h2>
        <InfiniteMovingCards items={images} showTierStyling />
        <PlaysuppButton text={cta} href={galleryHref} />
      </div>
    </section>
  );
}

export default MiniGallery;
