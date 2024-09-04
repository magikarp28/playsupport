"use server";
import { error } from "console";
import React from "react";
import { render } from "@react-email/render";
import StyledEmail from "@/app/email/StyledEmail";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.STMP_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== "string" || value.length > maxLength)
    return false;

  return true;
};

export async function sendEmail(formData: FormData) {
  const message = formData.get("message");
  const email = formData.get("email");
  const name = formData.get("name");

  if (
    !validateString(message, 1000) ||
    !validateString(email, 100) ||
    !validateString(name, 100)
  ) {
    return {
      error: "Invalid input",
    };
  }

  const html = await render(
    React.createElement(StyledEmail, {
      message: message as string,
      senderEmail: email as string,
      senderName: name as string,
    }),
    {
      pretty: true,
    }
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "playsuppminis@gmail.com",
    subject: `Playsupport message from ${formData.get("name")}`,
    replyTo: formData.get("email"),
    html: html,
  };

  let data;

  try {
    data = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + data.response);
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return data;
}

function getErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    return error;
  }
  return "An error occurred";
}
