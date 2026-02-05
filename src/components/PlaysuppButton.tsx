import Link from "next/link";
import { IconType } from "react-icons/lib";

function PlaysuppButton({
  text,
  href,
  icon: Icon,
}: {
  text?: string;
  href?: string;
  icon?: IconType;
}) {
  return (
    <div className="p-[3px] relative mt-7 w-fit">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
      <Link
        href={href ? href : ""}
        className="px-8 py-2 flex items-center gap-2 bg-slate-950 rounded-full relative group transition duration-200 text-white hover:bg-transparent"
      >
        {text}
        {Icon && <Icon className="text-2xl ml-2" />}
      </Link>
    </div>
  );
}

export default PlaysuppButton;
