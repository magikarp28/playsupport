import Link from "next/link";

function PlaysuppButton({ text, href }: { text?: string; href?: string }) {
  return (
    <div className="p-[3px] relative mt-7 w-fit">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
      <Link
        href={href ? href : ""}
        className="px-8 py-2 flex bg-slate-950 rounded-full relative group transition duration-200 text-white hover:bg-transparent"
      >
        {text}
      </Link>
    </div>
  );
}

export default PlaysuppButton;
