import { StaticImageData } from "next/image";

type SupportingTabProps = {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  video?: string;
};

function getAbsoluteVideoUrl(video?: string): string | undefined {
  if (!video) return undefined;
  if (video.startsWith("/")) {
    return video;
  }
  return video;
}

function SupportingTab({
  title,
  description,
  imageUrl,
  video,
}: SupportingTabProps) {
  const videoUrl = getAbsoluteVideoUrl(video);
  return (
    <div className="p-[3px] relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-xl sm:rounded-2xl" />
      <div className="p-4 sm:p-6 flex flex-col bg-gradient-to-b from-black to-slate-800 relative group h-full rounded-xl sm:rounded-2xl">
        {/* Video section */}
        {videoUrl && (
          <div className="mb-4 w-full overflow-hidden rounded-lg sm:rounded-xl">
            <video
              muted
              loop
              autoPlay
              src={videoUrl}
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
              playsInline
            ></video>
          </div>
        )}

        {/* Content section */}
        <div className="flex flex-col flex-grow">
          <h2
            className="text-lg sm:text-xl lg:text-2xl bg-clip-text text-transparent mb-2 sm:mb-3
            bg-gradient-to-b from-white to-slate-400 font-semibold text-center px-1"
          >
            {title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base text-center flex-grow px-1 sm:px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SupportingTab;
