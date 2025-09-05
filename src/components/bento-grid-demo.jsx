import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import "./bento-grid.css";

export default function BentoGridDemo() {
  return (
    <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="bento-skeleton"></div>
);

const items = [
  {
    title: "Cybersecurity Fundamentals",
    description: "Learn the core principles of cybersecurity and digital protection.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">📋</span>,
  },
  {
    title: "Network Security Workshop", 
    description: "Hands-on experience with network security protocols and tools.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">🔒</span>,
  },
  {
    title: "Ethical Hacking Basics",
    description: "Introduction to ethical hacking methodologies and penetration testing.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">⚡</span>,
  },
  {
    title: "CTF Strategy & Problem Solving",
    description: "Master the art of capture the flag competitions and cybersecurity challenges.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">🏆</span>,
  },
  {
    title: "Cryptography & Encryption",
    description: "Explore modern encryption methods and cryptographic algorithms.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">🔐</span>,
  },
  {
    title: "Digital Forensics",
    description: "Learn to investigate and analyze digital evidence and cyber crimes.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">🔍</span>,
  },
  {
    title: "Advanced Threat Detection",
    description: "Understand advanced persistent threats and detection mechanisms.",
    header: <Skeleton />,
    icon: <span className="h-4 w-4 text-neutral-500">🛡️</span>,
  },
];