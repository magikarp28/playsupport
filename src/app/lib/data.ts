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
      "Playsupport's services were impeccable, creating beautiful minis that matched exactly what I was hoping for. Not only were the minis completed with incredible quality, but also added with features, terrain and styling that made them truly come alive. All in all, if you want your minis to shine, send them to Playsupport!",
    name: "Brian",
    designation: "Multiple Art tier commisions",
    src: "/images/testimonials/Dred.jpg",
  },
  {
    quote:
      "I have an excellent experience with PlaySupport, their communication is top-notch and makes the entire process smooth. The quality of their work is impressively clean.",
    name: "Deathpunk Studio",
    designation: "High quality miniaturs for 3d printing",
    src: "/images/testimonials/deathpunk.avif",
    link: "https://www.myminifactory.com/users/deathpunk-studio?show=store#/",
  },
  {
    quote:
      "Playsupport did a fantastic job on the Slaves to darkness commission. They took great direction from example work and delivered well within the time table that they initially provided. It's always very smooth and professional working with them and will do so again soon in the future.",
    name: "Eric",
    src: "/images/testimonials/eric.jpg",
    designation: "Large slaves to darkness commission",
  },
  {
    quote:
      "Pleasure to work with, Great communication, fast turn around and supports on models are a joy to just pop away. Couldn't recommend enough.",
    name: "White Dragon Miniatures",
    src: "/images/testimonials/whitedragon.webp",
    designation: "3D printed army miniatures",
    link: "https://whitedragonminiatures.co.uk/",
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

export const testImageArray = [
  "/images/minisReel/belakor.jpg",
  "/images/minisReel/angel.jpg",
  "/images/minisReel/Harpies Warhammer.jpg",
];

export const PaintingShowcaseData = [
  {
    title: "Belakor",
    level: 3,
    Image: "/images/minisReel/belakor.jpg",
    colspan: 1,
  },
  {
    title: "Blood Angel image",
    level: 2,
    Image: "/images/minisReel/angel.jpg",
    colspan: 1,
  },
  {
    title: "Harpies Age of Sigmar",
    level: 1,
    Image: "/images/minisReel/Harpies Warhammer.jpg",
    colspan: 1,
  },

  {
    title: "Sons of Horus image",
    level: 1,
    Image: "/images/minisReel/tyranid guards.jpg",
    colspan: 2,
  },
  {
    title: "Night lord terminators",
    level: 3,
    Image: "/images/minisReel/nightLords.jpg",
    colspan: 1,
  },
  {
    title: "Blue marine image",
    level: 3,
    Image: "/images/minisReel/blue marine.jpg",
    colspan: 1,
  },
  {
    title: "Sisters of battle image",
    level: 2,
    Image: "/images/minisReel/sisters.jpg",
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
    name: "Home",
    link: "/",
  },
  {
    name: "Painting",
    link: "/painting",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Supporting",
    link: "/supporting",
  },
  {
    name: "Contact",
    link: "/contact",
  },
] as const;
