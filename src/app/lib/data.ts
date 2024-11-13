import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import supportedSoldier from "@/../public/SupportedSoldier.svg";

export const PaintingShowcaseData = [
  {
    title: "Sons of Horus",
    level: 1,
    Image: "/images/paintShowcase/paintShowcase1.jpg",
    colspan: 1,
  },
  {
    title: "Sons of Horus 2",
    level: 2,
    Image: "/images/paintShowcase/paintShowcase2.jpg",
    colspan: 2,
  },
  {
    title: "Sons of Horus 3",
    level: 3,
    Image: "/images/paintShowcase/paintShowcase3.jpg",
    colspan: 2,
  },
  {
    title: "Sons of Horus 4",
    level: 1,
    Image: "/images/paintShowcase/paintShowcase4.jpg",
    colspan: 1,
  },
];

export const SupportTabsData = [
  {
    title: "Reliability",
    description:
      "Careful manual support placement and island checking ensures the best print sucess rate possible.",
    imageUrl: supportedSoldier,
    video: "/videos/reliability.mp4",
  },
  {
    title: "Easy support removal",
    description:
      "Despite the high reliability of our supports they are easy to remove and don't leave large marks.",
    imageUrl: supportedSoldier,
    video: "/videos/reliability.mp4",
  },
  {
    title: "Hollowing large files",
    description:
      "To make sure you don't waste resin and printer lifetime we hollow your miniatures wherever appropriate.",
    imageUrl: supportedSoldier,
    video: "/videos/reliability.mp4",
  },
];

export const links = [
  {
    name: "home",
    hash: "#home",
  },
  {
    name: "painting",
    hash: "#painting",
  },
  {
    name: "supporting",
    hash: "#supporting",
  },
  {
    name: "contact",
    hash: "#contact",
  },
] as const;
