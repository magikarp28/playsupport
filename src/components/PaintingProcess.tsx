import { paintingSteps } from "@/app/lib/data";
import PlaysuppButton from "./PlaysuppButton";
import PaintingProcessCard from "./PaintingProcessCard";

function PaintingProcess() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
          Commission Flow
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 sm:text-4xl">
          How to Order Your Miniatures
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
          The process stays simple from first message to finished army. Send the
          basics, choose your finish, and we will build the quote around your
          project.
        </p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:auto-rows-fr">
        {paintingSteps.map((step, index) => (
          <PaintingProcessCard
            step={step}
            index={index}
            key={`${step.title}-${step.ImgSrc}`}
          />
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <PlaysuppButton text="Get a Free Quote" href="/contact" />
      </div>
    </section>
  );
}

export default PaintingProcess;
