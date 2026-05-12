"use client";
import React from "react";
import { useRouter } from "next/navigation";

function PrivacyPolicy() {
  const router = useRouter();
  return (
    <section className="bg-slate-900 py-10 min-h-screen">
      <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4 text-sm text-gray-600">
          <span className="font-semibold">Last Updated:</span> February 5, 2026
        </p>

        <p className="mb-4">
          At <span className="font-semibold">PlaySupport</span>, we are
          committed to protecting your privacy and complying with the EU General
          Data Protection Regulation (GDPR). This privacy policy explains how we
          collect, use, store, and protect your personal information when you
          use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Data Controller</h2>
        <p className="mb-4">
          The data controller responsible for your personal data is:
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="font-semibold">PlaySupport</p>
          <p>Obrt za usluge i proizvodnju</p>
          <p>Owner: Filip Knezović</p>
          <p>Address: Gradišće 9 C, Zagreb, Croatia</p>
          <p>Email: playsuppminis@gmail.com</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. Information We Collect
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-3">
          2.1 Contact Form Data
        </h3>
        <p className="mb-4">When you use our contact form, we collect:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <span className="font-semibold">Name:</span> To address you in our
            communications
          </li>
          <li>
            <span className="font-semibold">Email Address:</span> To respond to
            your inquiries
          </li>
          <li>
            <span className="font-semibold">Message Content:</span> Your inquiry
            or request
          </li>
          <li>
            <span className="font-semibold">Inquiry Type:</span> The nature of
            your request (painting commission, presupport service, or general
            inquiry)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-3">2.2 Analytics Data</h3>
        <p className="mb-4">
          We use <span className="font-semibold">Vercel Analytics</span> and{" "}
          <span className="font-semibold">Vercel Speed Insights</span> to
          collect anonymized website usage statistics. These services do{" "}
          <span className="font-semibold">not use cookies</span> and do not
          collect personal information. They provide aggregated data about page
          views, performance metrics, and user behavior patterns without
          identifying individual users.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Legal Basis for Processing
        </h2>
        <p className="mb-4">
          We process your personal data based on the following legal grounds
          under GDPR Article 6(1):
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <span className="font-semibold">
              Legitimate Interest (Article 6(1)(f)):
            </span>{" "}
            When you contact us via our form, we have a legitimate interest in
            responding to your inquiry and providing the services you requested.
          </li>
          <li>
            <span className="font-semibold">Consent (Article 6(1)(a)):</span> By
            submitting the contact form, you provide consent for us to process
            your data to respond to your inquiry.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          4. How We Use Your Information
        </h2>
        <p className="mb-4">We use your personal data solely to:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Respond to your inquiries submitted through our contact form</li>
          <li>Provide information about our services</li>
          <li>
            Process and fulfill painting commissions or presupport service
            requests
          </li>
          <li>
            Communicate with you regarding your inquiry or ongoing projects
          </li>
        </ul>
        <p className="mb-4">
          We <span className="font-semibold">do not</span> use your information
          for marketing purposes unless you explicitly request to be contacted
          about our services. We do not sell, rent, or share your personal data
          with third parties for their marketing purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          5. Third-Party Services
        </h2>
        <p className="mb-4">
          We use the following third-party service to process your data:
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="font-semibold">Resend Email Service</p>
          <p className="mb-2">
            Your contact form submissions are sent via Resend, a transactional
            email service. Resend processes your email address, name, and
            message content solely for the purpose of delivering your inquiry to
            us.
          </p>
          <p>
            Resend Privacy Policy:{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://resend.com/legal/privacy-policy
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          6. Data Storage and Retention
        </h2>
        <p className="mb-4">
          <span className="font-semibold">Storage Location:</span> Your contact
          form data is transmitted via Resend and stored in our email system
          (Gmail). Resend servers are located in the United States.
        </p>
        <p className="mb-4">
          <span className="font-semibold">Retention Period:</span> We retain
          your contact information and correspondence for as long as necessary
          to fulfill the purpose for which it was collected:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            Active inquiries and ongoing projects: Duration of the inquiry plus
            up to 3 years
          </li>
          <li>
            Completed projects: Up to 3 years after project completion for
            reference purposes
          </li>
          <li>
            General inquiries without follow-up: Up to 1 year, then deleted
          </li>
        </ul>
        <p className="mb-4">
          After the retention period, your data is permanently deleted unless we
          are required by law to retain it longer.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          7. International Data Transfers
        </h2>
        <p className="mb-4">
          Our email service provider (Resend) may process data in the United
          States. Data transfers to countries outside the European Economic Area
          (EEA) are protected by appropriate safeguards, including standard
          contractual clauses approved by the European Commission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          8. Your Rights Under GDPR
        </h2>
        <p className="mb-4">
          As an individual in the EU, you have the following rights regarding
          your personal data:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <span className="font-semibold">Right of Access (Article 15):</span>{" "}
            You can request a copy of the personal data we hold about you.
          </li>
          <li>
            <span className="font-semibold">
              Right to Rectification (Article 16):
            </span>{" "}
            You can request correction of inaccurate or incomplete data.
          </li>
          <li>
            <span className="font-semibold">
              Right to Erasure (Article 17):
            </span>{" "}
            You can request deletion of your personal data ("right to be
            forgotten").
          </li>
          <li>
            <span className="font-semibold">
              Right to Restriction (Article 18):
            </span>{" "}
            You can request that we limit how we use your data.
          </li>
          <li>
            <span className="font-semibold">
              Right to Data Portability (Article 20):
            </span>{" "}
            You can request a copy of your data in a machine-readable format.
          </li>
          <li>
            <span className="font-semibold">Right to Object (Article 21):</span>{" "}
            You can object to our processing of your data based on legitimate
            interests.
          </li>
          <li>
            <span className="font-semibold">
              Right to Withdraw Consent (Article 7):
            </span>{" "}
            You can withdraw consent at any time where processing is based on
            consent.
          </li>
        </ul>
        <p className="mb-4">
          To exercise any of these rights, please contact us at{" "}
          <span className="font-semibold">playsuppminis@gmail.com</span>. We
          will respond to your request within 30 days.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          9. Right to Lodge a Complaint
        </h2>
        <p className="mb-4">
          If you believe we have not handled your personal data in accordance
          with GDPR, you have the right to lodge a complaint with your national
          data protection authority:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Croatia (AZOP):{" "}
            <a
              href="https://azop.hr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://azop.hr
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Us</h2>
        <p className="mb-4">
          If you have questions about this privacy policy or wish to exercise
          your GDPR rights, please contact us at:
        </p>
        <p className="font-semibold">
          Email:{" "}
          <a
            href="mailto:playsuppminis@gmail.com"
            className="text-blue-600 hover:underline"
          >
            playsuppminis@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
