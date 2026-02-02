import ContactForm from "./ContactForm";

function ContactSection() {
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
        Contact
      </h2>
      <p className="max-w-screen-xl">
        Ask for a miniature painting, resin 3d pre-supporting service or any
        question you have!
      </p>
      <ContactForm />
    </section>
  );
}

export default ContactSection;
