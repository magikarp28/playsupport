import { performRequest } from "@/lib/dato.js";
import PlaySuppGallery from "./PlaySuppGallery";

type GalleryImage = {
  url: string;
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
    allGalleries {
      id
      images {
        url
      }
      paintingTier
    }
  }
`;

async function PlaySuppGalleryWrapper() {
  const response = (await performRequest(
    PAGE_CONTENT_QUERY,
  )) as GalleriesResponse;

  if (!response?.allGalleries?.length) {
    return <div>No galleries found.</div>;
  }

  return <PlaySuppGallery galleries={response.allGalleries} />;
}

export default PlaySuppGalleryWrapper;
