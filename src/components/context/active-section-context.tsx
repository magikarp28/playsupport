"use client";
import React, { createContext, useState } from "react";

type ActiveSectionContext = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
};

export const ActiveSectionContext = createContext<ActiveSectionContext | null>(
  null
);

export default function ActiveSectionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("home");
  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = React.useContext(ActiveSectionContext);
  if (context === null) {
    throw new Error(
      "useActiveSection must be used within ActiveSectionProvider"
    );
  }
  return context;
}
