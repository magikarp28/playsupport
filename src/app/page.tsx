import ContactSection from "@/components/ContactSection";
import Hero from "@/components/hero";
import Supporting from "@/components/supporting";
import Painting from "@/components/Painting";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="max-w-[100vw]">
      <Header />
      <Hero />
      <Supporting />
      <Painting />
      <ContactSection />
    </main>
  );
}
