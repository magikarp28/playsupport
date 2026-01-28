import Image from "next/image";
import PlaysuppButton from "./PlaysuppButton";
import image from "@/../public/images/paintShowcase/ogroid myrmidon.png";

function PaintingHome() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-slate-900 flex justify-center items-center">
      <div className="w-full max-w-screen-xl flex flex-col-reverse md:flex-row py-6 px-4 md:px-0">
        <div className="md:basis-1/2 flex flex-col justify-center gap-2 mb-6 md:mb-0">
          <h2
            className="text-3xl bg-clip-text text-transparent mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
          >
            Miniature painting service
          </h2>
          <p className="max-w-full text-lg">
            We offer a professional service to get your miniatures painted,
            based, magnetized and ready for gaming or display.
          </p>
          <p className="max-w-full text-lg">
            We can also 3D print your miniatures with a high quality resin 3D
            printer.
          </p>
          <p className="max-w-full text-lg">
            We paint all kinds of miniatures, from wargaming figures like
            Warhammer to Dungeons & Dragons, board games, and display pieces.
          </p>
          <p className="max-w-full text-lg">
            A single display figure or a whole army, playsupport is here to make
            it happen!
          </p>
          <div className="w-full flex justify-center">
            <PlaysuppButton
              text="See Painting Tiers and Pricing"
              href="/painting"
            />
          </div>
        </div>
        <div className="md:basis-1/2 flex justify-center md:justify-end items-center mb-6 md:mb-0">
          <Image
            src={image}
            alt="warhammerPaintingShowcaseImage"
            className="w-full max-w-[85%] h-auto"
            sizes="(min-width: 1280px) 500px,(min-width: 768px) 350px,90vw"
          />
        </div>
      </div>
    </section>
  );
}

export default PaintingHome;
