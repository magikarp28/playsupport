import React from "react";

function Footer() {
  return (
    <footer className="bg-black flex flex-col items-center justify-center text-slate-200 py-10">
      <p>
        Playsupport, obrt za usluge i proizvodnju, vl. Filip Knezović, Zagreb,
        Gradišće 9 C
      </p>
      <a href="/privacypolicy" className="underline">
        privacy policy
      </a>
    </footer>
  );
}

export default Footer;
