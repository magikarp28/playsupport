import SupportingTab from "./supporting-tab";
import { SupportTabsData } from "@/app/lib/data";

function Supportperks() {
  return (
    <div className="mb-10 w-full mt-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SupportTabsData.map((tab, index) => (
          <SupportingTab
            key={index}
            title={tab.title}
            description={tab.description}
            imageUrl={tab.imageUrl}
            video={tab.video}
          />
        ))}
      </div>
    </div>
  );
}

export default Supportperks;
