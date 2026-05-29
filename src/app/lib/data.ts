import supportedSoldier from "@/../public/SupportedSoldier.svg";

export type PaintingStep = {
  title: string;
  description: string;
  ImgSrc: string;
  color: string;
  alt?: string;
};

export const paintingSteps: PaintingStep[] = [
  {
    title: "List your miniatures",
    description:
      "Provide a clear list of models, squads, or armies you want painted and if you need them assembled, magnetized or if they need paint removal. \nWe work with anything, from a small single miniature to a large army commision.",
    ImgSrc:
      "/images/paintingProcess/Slaves to darkness EOS army playsupport.jpg",
    color: "oklch(64.5% 0.246 16.439)",
    alt: "List of miniatures",
  },
  {
    title: "Tell us about your models",
    description:
      "Tell us if you want to send your miniatures to us, if you want us to get them for you or if you'd like us to 3d print them for you with our high quality resin 3d printers.",
    ImgSrc: "/images/paintingProcess/ManyMiniatures.jpg",
    color: "oklch(74% 0.238 322.16)",
    alt: "All kinds of miniatures",
  },
  {
    title: "Select a painting tier",
    description:
      "Choose between Army, Hero, or Art tier for each individual miniature or squad. \nArmy tier is perfect for larger squads, Hero tier is great for characters and Art tier is here for pieces that you want to truly stand out.",
    ImgSrc: "/images/paintingProcess/painting tiers examples.jpg",
    color: "oklch(64.5% 0.246 16.439)",
    alt: "Painting tier examples",
  },
  {
    title: "Choose your paint scheme and basing style",
    description:
      "Let us know what paint scheme or syle you want your miniatures painted in and your preferred base theme such as snow, desert, jungle, ruined city etc.",
    ImgSrc: "/images/paintingProcess/Painted miniatures.jpg",
    color: "oklch(74% 0.238 322.16)",
    alt: "Painted miniature scheme",
  },
];

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
      "Everything is absolutely perfect and very profesionally made. Their work is super efficient and the files work perfectly. Files well sorted and organized. Clear commincation, very friendly and helpful in many points - I am looking forward to our next project!",
    name: "MiniScape Studio",
    designation: "Epic Bases for Display Miniatures",
    src: "/images/testimonials/MiniscapeStudio.jpg",
    link: "https://miniscape-studio.com/",
  },
  {
    quote:
      "Always a pleasure working with PlaySupport! Perfect supports every time has us always coming back to get our monthly terrain packs professionally supported. Communication is always top notch!",
    name: "Eons of Battle",
    designation:
      "Youtube channel and high quality miniature terrain for 3d printing",
    src: "/images/testimonials/EOB_LOGO.jpg",
    link: "https://eonsofbattle.com/",
  },
  {
    quote:
      "Playsupport's services were impeccable, creating beautiful minis that matched exactly what I was hoping for. Not only were the minis completed with incredible quality, but also added with features, terrain and styling that made them truly come alive. All in all, if you want your minis to shine, send them to Playsupport!",
    name: "Brian",
    designation: "Multiple Art tier commissions",
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
    src: "/images/lelevImages/level1.webp",
  },
  {
    src: "/images/lelevImages/level2.webp",
  },
  {
    src: "/images/lelevImages/level3.webp",
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
