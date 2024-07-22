import React, { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-medium capitalize mb-8 mt-8 text-center">
      {children}
    </h2>
  );
}

export default SectionHeading;
