const BackgroundColors = ["#c9885e", "#a5bcc7", "#e2c78c"];
const pricing = [
  {
    category: "Small infantry",
    army: "8–14€",
    hero: "12–22€",
    art: "25–60€",
  },
  { category: "Infantry", army: "10–20€", hero: "22–36€", art: "50–150€" },
  {
    category: "Large infantry",
    army: "15–35€",
    hero: "25–50€",
    art: "80–240€",
  },
  {
    category: "Small Walker/Rider/Monster",
    army: "25–60€",
    hero: "40–100€",
    art: "120–300€",
  },
  {
    category: "Walker/Monster/Vehicle",
    army: "60–140€",
    hero: "100–200€",
    art: "200–400€",
  },
  {
    category: "Large Walker/Monster/Vehicle",
    army: "100–200€",
    hero: "150–300€",
    art: "300–600€",
  },
  { category: "Huge Model", army: "180+€", hero: "250+€", art: "500+€" },
];

function PricingTable() {
  return (
    <section className="text-slate-100 w-full flex justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mt-2 mb-3">Our Pricing chart</h2>

        {/* Desktop table-like grid */}
        <div className="hidden md:block border rounded-lg overflow-hidden shadow-sm bg-slate-900/40">
          <div className="grid grid-cols-4 text-sm font-medium">
            <div className="px-4 py-3 border-r bg-slate-800/30 text-slate-100">
              Category
            </div>
            <div
              className="px-4 py-3 border-r text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
              style={{
                borderTopColor: BackgroundColors[0],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Army Tier
            </div>
            <div
              className="px-4 py-3 border-r text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
              style={{
                borderTopColor: BackgroundColors[1],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Hero Tier
            </div>
            <div
              className="px-4 py-3 text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
              style={{
                borderTopColor: BackgroundColors[2],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Art Tier
            </div>
          </div>

          <div className="divide-y">
            {pricing.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 text-md bg-transparent hover:bg-white/[0.02] transition-colors duration-200"
              >
                <div className="px-4 py-3 border-r bg-slate-800/10 hover:bg-slate-800/20 transition-colors duration-200">
                  {row.category}
                </div>
                <div
                  className="px-4 py-3 border-r text-center text-white border-l-4 relative overflow-hidden group"
                  style={{
                    borderLeftColor: BackgroundColors[0],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <span className="relative z-10">{row.army}</span>
                </div>
                <div
                  className="px-4 py-3 border-r text-center text-white border-l-4 relative overflow-hidden group"
                  style={{
                    borderLeftColor: BackgroundColors[1],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <span className="relative z-10">{row.hero}</span>
                </div>
                <div
                  className="px-4 py-3 text-center text-white border-l-4 relative overflow-hidden group"
                  style={{
                    borderLeftColor: BackgroundColors[2],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <span className="relative z-10">{row.art}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {pricing.map((row, idx) => (
            <div
              key={idx}
              className="rounded-lg p-0 overflow-hidden border bg-slate-900/30 hover:bg-slate-900/40 transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="px-4 py-3 bg-slate-800/10 text-slate-100 font-medium hover:bg-slate-800/20 transition-colors duration-200">
                {row.category}
              </div>
              <div className="grid grid-cols-3 gap-0 text-xs">
                <div
                  className="p-3 text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
                  style={{
                    borderTopColor: BackgroundColors[0],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Army</div>
                  <div className="mt-1">{row.army}</div>
                </div>
                <div
                  className="p-3 text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
                  style={{
                    borderTopColor: BackgroundColors[1],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Hero</div>
                  <div className="mt-1">{row.hero}</div>
                </div>
                <div
                  className="p-3 text-center text-white border-t-4 hover:bg-white/[0.05] transition-colors duration-200"
                  style={{
                    borderTopColor: BackgroundColors[2],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Art</div>
                  <div className="mt-1">{row.art}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingTable;
