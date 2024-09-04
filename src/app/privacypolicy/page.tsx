"use client";
import React from "react";
import { useRouter } from "next/navigation";

function PrivacyPolicy() {
  const router = useRouter();
  return (
    <section className="bg-slate-900 py-10 min-h-screen">
      <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At <span className="font-semibold">PlaySupport</span>, we are
          committed to protecting your privacy. This privacy policy explains how
          we collect, use, and protect your personal information when you use
          our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect only the following personal information when you use our
          contact form:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <span className="font-semibold">Name:</span> Used to address you in
            our communications.
          </li>
          <li>
            <span className="font-semibold">Email Address:</span> Used to
            respond to your inquiries.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the personal information you provide solely to contact you in
          response to your inquiries. We do not use your information for any
          other purpose, and we do not share it with third parties.
        </p>

        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back To Page
          </button>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
