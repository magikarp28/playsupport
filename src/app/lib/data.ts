import supportedSoldier from "@/../public/SupportedSoldier.svg";

export const PaintingShowcaseData = [
  {
    title: "Blood Angel image",
    level: 2,
    Image: "/images/minisReel/angel.jpg",
    colspan: 1,
  },
  {
    title: "Sons of Horus image",
    level: 1,
    Image: "/images/minisReel/horus.jpg",
    colspan: 2,
  },
];

export const SupportTabsData = [
  {
    title: "Reliability",
    description:
      "Careful manual support placement and island checking ensures the best print sucess rate possible.",
    imageUrl: supportedSoldier,
    video: "/videos/Lychee ant support clip.mp4",
  },
  {
    title: "Easy support removal",
    description:
      "Despite the high reliability of our supports they are easy to remove and don't leave large marks.",
    imageUrl: supportedSoldier,
    video: "/videos/Ant Supports ripping.mp4",
  },
  {
    title: "Hollowing large files",
    description:
      "To make sure you don't waste resin and printer lifetime we hollow your miniatures wherever appropriate.",
    imageUrl: supportedSoldier,
    video: "/videos/hollow video playsupport.mp4",
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
