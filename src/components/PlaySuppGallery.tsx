"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useTranslations } from "next-intl";

type GalleryImage = {
  url: string;
};

type Gallery = {
  id: string;
  images: GalleryImage[];
  paintingTier: string;
};

type CustomSlide = SlideImage & { tierIdx: number };

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

const BackgroundColors = ["#c9885e", "#a5bcc7", "#e2c78c"];
const fonts = ["font-army", "font-hero", "font-art"];
const levelNames = ["Army", "Hero", "Art"];
const filterOptions = ["all", "army", "hero", "art"] as const;

const ITEMS_PER_PAGE = 9;

function getTierIndex(tier: string) {
  const idx = levelNames.findIndex(
    (name) => name.toLowerCase() === tier.toLowerCase(),
  );
  return idx !== -1 ? idx : 0;
}

type PlaySuppGalleryProps = {
  galleries: Gallery[];
};

function PlaySuppGallery({ galleries }: PlaySuppGalleryProps) {
  const t = useTranslations("Gallery");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const localizedLevelNames = [
    t("tiers.army"),
    t("tiers.hero"),
    t("tiers.art"),
  ];

  const filteredGalleries =
    activeFilter === "all"
      ? galleries
      : galleries.filter(
          (g) => g.paintingTier.toLowerCase() === activeFilter.toLowerCase(),
        );

  // Pagination calculations
  const totalPages = Math.ceil(filteredGalleries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedGalleries = filteredGalleries.slice(startIndex, endIndex);

  const slides: CustomSlide[] = paginatedGalleries
    .filter((g) => g.images[0])
    .map((g) => ({
      src: g.images[0].url,
      alt: `Gallery ${g.id}`,
      tierIdx: getTierIndex(g.paintingTier),
    }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of gallery
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-5 px-5 md:px-0">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {filterOptions.map((filter, idx) => {
          const isActive = activeFilter === filter;
          const filterIdx = idx === 0 ? -1 : idx - 1; // "All" has no tier
          return (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentPage(1);
              }}
              className={clsx(
                "px-5 py-2 rounded-lg font-bold text-lg transition-all duration-200 border-2",
                idx === 0 && fonts[0],
                idx > 0 && fonts[filterIdx],
                isActive
                  ? "text-white scale-105 shadow-lg"
                  : "bg-black/60 text-gray-300 hover:scale-105 hover:shadow-md",
              )}
              style={{
                backgroundImage: isActive
                  ? idx === 0
                    ? "linear-gradient(to right, oklch(64.5% 0.246 16.439), oklch(66.7% 0.295 322.15))"
                    : BackgroundGradients[filterIdx]
                  : undefined,
                borderColor:
                  idx === 0
                    ? isActive
                      ? "#fff"
                      : "#888"
                    : BackgroundColors[filterIdx],
              }}
            >
              {t(`filters.${filter}`)}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="w-full grid auto-rows-[22rem] md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-4 relative">
        {paginatedGalleries.map((gallery, galleryIdx) => {
          const tierIdx = getTierIndex(gallery.paintingTier);
          return (
            <div
              key={gallery.id}
              className={clsx(
                "relative rounded-xl cursor-pointer col-span-1 md:col-span-1",
              )}
              style={{
                backgroundImage: BackgroundGradients[tierIdx],
              }}
              onClick={() => setOpenIndex(galleryIdx)}
            >
              {gallery.images[0] && (
                <Image
                  src={gallery.images[0].url}
                  alt={`Gallery ${gallery.id} image`}
                  fill={true}
                  sizes="(max-width: 768px) 70vw, 60vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-xl p-[0.5rem]"
                  priority={galleryIdx === 1}
                />
              )}
              <div
                className="backdrop-blur-sm bg-black/70 absolute bottom-2 left-2 px-2 py-1 overflow-hidden border-r-4 border-t-4 max-w-[50%] rounded-tr-lg"
                style={{
                  borderColor: BackgroundColors[tierIdx],
                }}
              >
                <p
                  className={`font-bold bg-clip-text text-transparent text-xl text-left text-white ${fonts[tierIdx]}`}
                  style={{
                    backgroundImage: BackgroundGradients[tierIdx],
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {localizedLevelNames[tierIdx]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              "px-4 py-2 rounded-lg font-bold transition-all duration-200 border-2",
              currentPage === 1
                ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
                : "bg-black/60 text-white border-gray-400 hover:scale-105 hover:shadow-md",
            )}
          >
            <FaArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={clsx(
                "w-10 h-10 rounded-lg font-bold transition-all duration-200 border-2",
                currentPage === page
                  ? "text-white scale-105 shadow-lg border-white"
                  : "bg-black/60 text-gray-300 border-gray-500 hover:scale-105 hover:shadow-md",
              )}
              style={{
                backgroundImage:
                  currentPage === page
                    ? "linear-gradient(to right, oklch(64.5% 0.246 16.439), oklch(66.7% 0.295 322.15))"
                    : undefined,
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              "px-4 py-2 rounded-lg font-bold transition-all duration-200 border-2",
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
                : "bg-black/60 text-white border-gray-400 hover:scale-105 hover:shadow-md",
            )}
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <p className="text-center text-gray-400 mt-3 text-sm">
          {t("pagination.showing", {
            start: startIndex + 1,
            end: Math.min(endIndex, filteredGalleries.length),
            total: filteredGalleries.length,
          })}
        </p>
      )}

      {/* Lightbox */}
      {openIndex !== null && (
        <Lightbox
          open={openIndex !== null}
          close={() => setOpenIndex(null)}
          index={openIndex}
          slides={slides}
          render={{
            slide: ({ slide }) => {
              const customSlide = slide as CustomSlide;
              return (
                <div className="relative w-full h-full flex justify-center items-center bg-black">
                  <Image
                    src={customSlide.src}
                    alt={customSlide.alt || "slide image"}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                  <div
                    className={`text-white absolute bottom-2 bg-black/50 px-2 py-1 rounded text-4xl ${
                      fonts[customSlide.tierIdx]
                    }`}
                    style={{ color: BackgroundColors[customSlide.tierIdx] }}
                  >
                    {localizedLevelNames[customSlide.tierIdx]}
                  </div>
                </div>
              );
            },
          }}
        />
      )}
    </div>
  );
}

export default PlaySuppGallery;
