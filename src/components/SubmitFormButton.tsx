"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function SubmitFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="p-[3px] relative" disabled={pending}>
      <div className="absolute inset-0 purpleBackground rounded-lg" />
      <div className="px-8 py-2 bg-slate-950 rounded-lg  relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center">
        {pending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          "Send"
        )}
      </div>
    </button>
  );
}

export default SubmitFormButton;
