import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";
import ReverseVideo from "./ReverseVideo";
const useIsMobile = () => {
	const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

	React.useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isMobile;
};

const LoadingScreen = ({ onComplete }) => {
	const isMobile = useIsMobile();
	const [phase, setPhase] = useState("spinning"); // spinning, transforming, building, typing, complete
	const [typedText, setTypedText] = useState("");
	const [isVisible, setIsVisible] = useState(true);

	const targetText = "C1PH3RC3LL";

	const redirectList = [
		{
			path: "/join-discord",
			link: "https://discord.gg/ukRsasGK6h",
		},
	];

	useEffect(() => {
		if (
			redirectList.filter((r) => r.path === window.location.pathname).length
		) {
			window.location.href = redirectList.filter(
				(r) => r.path === window.location.pathname
			)[0].link;
		}
	}, []);

	useEffect(() => {
		const timeline = [
			{ delay: 1500, phase: "transforming" },
			// { delay: 3000, phase: "building" },

			{ delay: 1000, phase: "typing" },
			{ delay: 2500, phase: "complete" },
		];

		timeline.forEach(({ delay, phase: nextPhase }) => {
			setTimeout(() => {
				setPhase(nextPhase);
			}, delay);
		});

		// Typing animation
		let typingTimer;
		let currentIndex = 0;

		const startTyping = () => {
			typingTimer = setInterval(() => {
				if (currentIndex <= targetText.length) {
					setTypedText(targetText.slice(0, currentIndex));
					currentIndex++;
				} else {
					clearInterval(typingTimer);
				}
			}, 150);
		};

		setTimeout(startTyping, 1500);

		// Complete animation and fade out
		setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				onComplete?.();
			}, 1000);
		}, 4500);

		return () => {
			if (typingTimer) clearInterval(typingTimer);
		};
	}, [onComplete]);

	return (
		<div className={`loading-screen ${!isVisible ? "fade-out" : ""}`}>
			<div className="loading-container">
				{/* {isMobile ? (
					<ReverseVideo />
				) : ( */}
				<>
					<div className="circle-container">
						<div
							className={`outer-circle ${
								phase !== "spinning" ? "stop-spin" : ""
							}`}
						/>
						<div
							className={`inner-rings ${
								["transforming", "building", "typing", "complete"].includes(
									phase
								)
									? "visible"
									: ""
							}`}
						>
							<div className="ring ring-1" />
							<div className="ring ring-2" />
							<div className="ring ring-3" />
						</div>
					</div>

					<div
						className={`loading-dots ${
							["transforming", "typing", "complete"].includes(phase)
								? "hide"
								: ""
						}`}
					>
						<div className="dot" />
						<div className="dot" />
						<div className="dot" />
					</div>
				</>

				{/* Circle Animation */}
				{/* <div className="circle-container">
					<div
						className={`outer-circle ${
							phase !== "spinning" ? "stop-spin" : ""
						}`}
					/>

					<div
						className={`inner-rings ${
							phase === "transforming" ||
							phase === "building" ||
							phase === "typing" ||
							phase === "complete"
								? "visible"
								: ""
						}`}
					>
						<div className="ring ring-1" />
						<div className="ring ring-2" />
						<div className="ring ring-3" />
					</div>
				</div> */}

				{/* Text */}
				<div
					className={`text-container ${
						phase === "typing" || phase === "complete" ? "visible" : ""
					}`}
				>
					<div className="main-title">
						{typedText}
						<span className={`cursor ${phase === "complete" ? "hide" : ""}`}>
							|
						</span>
					</div>
					<div className={`subtitle ${phase === "complete" ? "visible" : ""}`}>
						IIIT-NR INFOSEC CLUB
					</div>
				</div>

				{/* Loading Dots */}
				<div
					className={`loading-dots ${
						phase === "transforming" ||
						phase === "typing" ||
						phase === "complete"
							? "hide"
							: ""
					}`}
				>
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
