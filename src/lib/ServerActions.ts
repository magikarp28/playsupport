"use server";
import React from "react";
import { render } from "@react-email/render";
import StyledEmail from "@/app/email/StyledEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== "string" || value.length > maxLength)
    return false;
  return true;
};

export async function sendEmail(formData: FormData): Promise<FormState> {
  const message = formData.get("message");
  const email = formData.get("email");
  const name = formData.get("name");
  const inquiryType = formData.get("inquiryType");
  const honey = formData.get("honey");
  if (honey && typeof honey === "string" && honey.trim() !== "") {
    return {
      success: false,
      error: "Bot detected",
    };
  }

  if (
    !validateString(message, 6000) ||
    !validateString(email, 100) ||
    !validateString(name, 100)
  ) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  const html = await render(
    React.createElement(StyledEmail, {
      message: message as string,
      senderEmail: email as string,
      senderName: name as string,
      inquiryType: inquiryType as string,
      honey: honey as string,
    }),
    {
      pretty: true,
    },
  );

  try {
    const { error } = await resend.emails.send({
      from: "Poruka sa playsupport stranice! <onboarding@resend.dev>",
      to: ["playsuppminis@gmail.com"],
      replyTo: email as string,
      subject: `Playsupport miniatures inquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error); // <-- Add this line
      return {
        success: false,
        error:
          typeof error === "string"
            ? error
            : "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Success! I'll get back to you as soon as possible.",
    };
  } catch (error: unknown) {
    console.error("Server action error:", error); // <-- Add this line
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String((error as any).message);
  }
  if (typeof error === "string") {
    return error;
  }
  return "An error occurred";
}
