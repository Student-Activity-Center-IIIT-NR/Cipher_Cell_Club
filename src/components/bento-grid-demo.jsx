import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import items from "../data/events.json"; // Import your items array from items.js
import "./bento-grid.css";

export default function BentoGridDemo() {
  const Skeleton = () => <div className="bento-skeleton"></div>;

  return (
    <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          date={item.date}
          // If you want to use icons, you can render them as text or emoji
          // icon={<span className="h-4 w-4 text-neutral-500">{item.icon}</span>}
          className={`${i === 3 || i === 6 ? "col-span-2" : ""}`}
          backgroundImage={item.backgroundImage}
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}
    </BentoGrid>
  );
}
