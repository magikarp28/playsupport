"use client";

import dynamic from "next/dynamic";

const DeferredTestimonials = dynamic(
  () => import("@/components/TestemonialsSection"),
  {
    ssr: false,
  },
);

const DeferredContactSection = dynamic(
  () => import("@/components/ContactSection"),
  {
    ssr: false,
  },
);

function HomeDeferredSections() {
  return (
    <>
      <DeferredTestimonials />
      <DeferredContactSection />
    </>
  );
}

export default HomeDeferredSections;
