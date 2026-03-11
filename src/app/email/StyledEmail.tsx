import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface StyledEmailProps {
  message: string;
  senderEmail: string;
  senderName: string;
  inquiryType: string;
  honey: string;
}

function StyledEmail(StyledEmailProps: StyledEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message</Preview>
      <Tailwind>
        <Body className="bg-gray-100 w-full text-center ">
          <Container>
            <Section className="bg-white border border-black p-4 my-4 rounded-md">
              <Heading>Playsupport Contact form message</Heading>
              <Hr />
              <Text>Message: {StyledEmailProps.message}</Text>
              <Hr />
              <Text>Inquiry Type: {StyledEmailProps.inquiryType}</Text>
              <Text>Email: {StyledEmailProps.senderEmail}</Text>
              <Text>Name: {StyledEmailProps.senderName}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default StyledEmail;
