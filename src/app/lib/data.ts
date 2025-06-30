import supportedSoldier from "@/../public/SupportedSoldier.svg";
import { title } from "process";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link?: string;
};

export const testemonialsData: Testimonial[] = [
  {
    quote:
      "Always a pleasure working with PlaySupport! Perfect supports every time has us always coming back to get our monthly terrain packs professionally supported. Communication is always top notch!",
    name: "Eons of Battle",
    designation:
      "Youtube channel and high quality miniature terrain for 3d printing",
    src: "/images/testimonials/EOB_LOGO.png",
    link: "https://eonsofbattle.com/",
  },
  {
    quote:
      "I have an excellent experience with PlaySupport, their communication is top-notch and makes the entire process smooth. The quality of their work is impressively clean.",
    name: "Deathpunk Studio",
    designation: "High quality miniaturs for 3d printing",
    src: "/images/testimonials/deathpunk.avif",
    link: "https://www.myminifactory.com/users/deathpunk-studio?show=store#/",
  },
];

export const LevelImages = [
  {
    src: "/images/lelevImages/level1.jpg",
    title: "Army Tier",
    text: "Clean transitions and highlights for an awsome army.",
  },
  {
    src: "/images/lelevImages/level2.jpg",
    title: "Hero Tier",
    text: "More attention given to every detail with more advanced techniques.",
  },
  {
    src: "/images/lelevImages/level3.jpg",
    title: "Art Tier",
    text: "Every surface has its own texture, every miniature a unique story.",
  },
];

export const PaintingShowcaseData = [
  {
    title: "Ork Warboss",
    level: 3,
    Image: "/images/minisReel/ork.jpg",
    colspan: 1,
  },
  {
    title: "Blood Angel image",
    level: 2,
    Image: "/images/minisReel/angel.jpg",
    colspan: 1,
  },
  {
    title: "Arabaxia",
    level: 3,
    Image: "/images/minisReel/lizard2.jpg",
    colspan: 1,
  },
  {
    title: "Sons of Horus image",
    level: 1,
    Image: "/images/minisReel/horus.jpg",
    colspan: 2,
  },
  {
    title: "Night lord terminators",
    level: 3,
    Image: "/images/minisReel/nightLords.jpg",
    colspan: 1,
  },
  {
    title: "Sisters of battle image",
    level: 2,
    Image: "/images/minisReel/sisters.jpg",
    colspan: 2,
  },
  {
    title: "Blue marine image",
    level: 3,
    Image: "/images/minisReel/blue marine.jpg",
    colspan: 1,
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
    name: "testimonials",
    hash: "#testimonials",
  },
  {
    name: "contact",
    hash: "#contact",
  },
] as const;
