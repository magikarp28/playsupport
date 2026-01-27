import { AnimatedTestimonials } from "./ui/AnimatedTestimonials";
import { testemonialsData } from "@/app/lib/data";

function TestemonialsSection() {
  return (
    <section
      id="Testimonials"
      className="w-full bg-gradient-to-b text-center from-black to-slate-950  
     flex flex-col justify-center gap-2 items-center text-white px-3 z-10"
    >
      <h4
        className="text-xl bg-clip-text text-transparent mt-6
        bg-gradient-to-b from-white to-slate-400 sm:text-3xl font-semibold"
      >
        Testimonials
      </h4>
      <AnimatedTestimonials testimonials={testemonialsData} />
    </section>
  );
}

export default TestemonialsSection;
