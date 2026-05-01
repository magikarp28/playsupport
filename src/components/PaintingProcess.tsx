import { paintingSteps } from "@/app/lib/data";
import PlaysuppButton from "./PlaysuppButton";
import PaintingProcessCard from "./PaintingProcessCard";

function PaintingProcess() {
  return (
    <section className="w-full py-2 ">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
          Commission Flow
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 sm:text-4xl">
          How to Order Your Miniatures
        </h2>
        <p className="mt-4 text-md leading-7 text-slate-300">
          The process stays simple from first message to finished army. Follow
          the steps below and we will get back to you with a quote and timeline
          for your project.
        </p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:auto-rows-fr w-full  min-h-10">
        {paintingSteps.map((step, index) => (
          <PaintingProcessCard
            step={step}
            index={index}
            key={`${step.title}-${step.ImgSrc}`}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-300 sm:text-base">
        And that's it! Once we get your message we will get back to you with a
        quote and timeline for your project along with any additional
        information we need.
      </p>
      <div className="flex flex-col items-center">
        <PlaysuppButton text="Click For Your Quote!" href="/contact" />
      </div>
    </section>
  );
}

export default PaintingProcess;
