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
					// icon={item.icon}
					className={i === 3 || i === 6 ? "col-span-2" : ""}
					style={{
						backgroundImage: item.backgroundImage, // e.g. "url('/images/cybersecurity.jpg')"
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			))}
		</BentoGrid>
	);
}

const Skeleton = () => <div className="bento-skeleton"></div>;

const items = [
	{
		title: "Cybersecurity Fundamentals",
		description:
			"Learn the core principles of cybersecurity and digital protection.",
		header: <Skeleton />,
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		icon: <span className="h-4 w-4 text-neutral-500">📋</span>,
	},
	{
		title: "Network Security Workshop",
		description:
			"Hands-on experience with network security protocols and tools.",
		header: <Skeleton />,
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		icon: <span className="h-4 w-4 text-neutral-500">🔒</span>,
	},
	{
		title: "Ethical Hacking Basics",
		description:
			"Introduction to ethical hacking methodologies and penetration testing.",
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		header: <Skeleton />,
		icon: <span className="h-4 w-4 text-neutral-500">⚡</span>,
	},
	{
		title: "CTF Strategy & Problem Solving",
		description:
			"Master the art of capture the flag competitions and cybersecurity challenges.",
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		header: <Skeleton />,
		icon: <span className="h-4 w-4 text-neutral-500">🏆</span>,
	},
	{
		title: "Cryptography & Encryption",
		description:
			"Explore modern encryption methods and cryptographic algorithms.",
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		header: <Skeleton />,
		icon: <span className="h-4 w-4 text-neutral-500">🔐</span>,
	},
	{
		title: "Digital Forensics",
		description:
			"Learn to investigate and analyze digital evidence and cyber crimes.",
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		header: <Skeleton />,
		icon: <span className="h-4 w-4 text-neutral-500">🔍</span>,
	},
	{
		title: "Advanced Threat Detection",
		description:
			"Understand advanced persistent threats and detection mechanisms.",
		backgroundImage:
			"url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
		header: <Skeleton />,
		icon: <span className="h-4 w-4 text-neutral-500">🛡️</span>,
	},
];
