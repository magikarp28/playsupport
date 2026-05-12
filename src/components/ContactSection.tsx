"use client";

import ContactForm from "./ContactForm";
import { useTranslations } from "next-intl";

function ContactSection() {
  const t = useTranslations("ContactSection");

  return (
    <section
      id="Contact"
      className="w-full bg-gradient-to-b from-slate-950  to-black
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3 text-center"
      aria-labelledby="contact-us-heading"
    >
      <h2
        id="contact-us-heading"
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        {t("title")}
      </h2>
      <p className="max-w-screen-xl">{t("subtitle")}</p>
      <ContactForm />
    </section>
  );
}

export default ContactSection;
