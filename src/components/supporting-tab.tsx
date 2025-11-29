import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

type SupportingTabProps = {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  video?: string;
};

function SupportingTab({
  title,
  description,
  imageUrl,
  video,
}: SupportingTabProps) {
  const [videoUrl, setVideoUrl] = useState(video || ""); // Default to an empty string if video is undefined
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video && video.startsWith("/")) {
      const absoluteUrl = `${window.location.origin}${video}`;
      setVideoUrl(absoluteUrl);
    } else {
      setVideoUrl(video || ""); // Fallback for external URLs
    }
  }, [video]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            videoElement.play(); // Play video when it enters the viewport
          } else {
            videoElement.pause(); // Pause video when it leaves the viewport
          }
        },
        { threshold: 0.5 } // Adjust threshold as needed (50% visibility)
      );

      observer.observe(videoElement);

      return () => {
        observer.unobserve(videoElement);
      };
    }
  }, []);

  return (
    <div className="p-[3px] relative mt-2 w-[18rem] sm:w-[24rem] lg:w-[28rem]">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-2xl" />
      <div className="p-4 flex flex-col bg-gradient-to-b from-black to-slate-800 relative group justify-start items-center w-full h-full rounded-2xl">
        <div className="flex flex-col items-center text-center">
          <video
            ref={videoRef}
            muted
            loop
            src={videoUrl}
            className="rounded-2xl mb-4 w-full h-auto"
          ></video>
          <h3
            className="text-xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-2xl pb-2 font-semibold"
          >
            {title}
          </h3>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SupportingTab;
