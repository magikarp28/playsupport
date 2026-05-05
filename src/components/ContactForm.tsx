"use client";
import { useState } from "react";
import { sendEmail } from "@/lib/ServerActions";
import SubmitFormButton from "./SubmitFormButton";
import { MdMarkEmailRead } from "react-icons/md";

function ContactForm() {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {formSent ? (
        <div className="bg-slate-900 py-4 px-8 rounded-lg my-5 flex flex-col justify-center items-center gap-3">
          <MdMarkEmailRead className="text-7xl" />
          <h1 className="text-2xl">Thank you for your message!</h1>
          <p className="text-lg ">
            We will get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form
          action={async (formData) => {
            const result = await sendEmail(formData);
            if (!result.success) {
              alert(result.error);
              return;
            }
            setFormSent(true);
          }}
          className="flex flex-col gap-5 pt-5 w-[min(100%,40rem)]"
        >
          <input
            name="email"
            type="email"
            maxLength={50}
            required
            placeholder="Email"
            className="p-2 rounded-lg border border-transparent focus:border-fuchsia-600 focus:outline-none transition duration-300"
          />
          <input
            name="name"
            type="text"
            maxLength={25}
            required
            placeholder="Name"
            className="p-2 rounded-lg border border-transparent focus:border-fuchsia-600 focus:outline-none transition duration-300"
          />
          <div className="flex w-full justify-between items-center gap-2">
            <label
              htmlFor="inquiryType"
              className="text-md font-medium text-slate-200"
            >
              Inquiry type:
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              className="flex-1 p-2 rounded-lg border border-transparent focus:border-fuchsia-600 focus:outline-none transition duration-300 text-slate-100"
              defaultValue="painting commission"
            >
              <option value="painting commission">Painting commission</option>
              <option value="pressuport service">Pressuport service</option>
              <option value="general inquiry">General inquiry</option>
            </select>
          </div>
          <textarea
            name="message"
            maxLength={5000}
            placeholder="Message"
            required
            className="p-2 h-44 resize-none rounded-lg border border-transparent focus:border-fuchsia-600 focus:outline-none transition duration-300"
          />

          <input
            name="honey"
            type="text"
            maxLength={25}
            placeholder=""
            className="hidden"
          />

          <SubmitFormButton />
        </form>
      )}
    </div>
  );
}

export default ContactForm;
