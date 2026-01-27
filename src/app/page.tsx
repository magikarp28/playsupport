import ContactSection from "@/components/ContactSection";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import TestemonialsSection from "@/components/TestemonialsSection";
import PricingSection from "@/components/PricingSection";
import PaintingHome from "@/components/PaintingHome";
import SupportingHome from "@/components/supportingHome";
import MiniGallery from "@/components/MiniGallery";

export default function Home() {
  return (
    <main className="max-w-[100vw] text-white">
      <Hero />
      <PaintingHome />
      <SupportingHome />
      <MiniGallery />
      <TestemonialsSection />
      <ContactSection />
    </main>
  );
}
