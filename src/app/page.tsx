import ContactSection from "@/components/ContactSection";
import Hero from "@/components/hero";
import Supporting from "@/components/supporting";
import Painting from "@/components/Painting";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import TestemonialsSection from "@/components/TestemonialsSection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="max-w-[100vw]">
      <Header />
      <Hero />
      <Painting />
      <PricingSection />
      <Supporting />
      <TestemonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
