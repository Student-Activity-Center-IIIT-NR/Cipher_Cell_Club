import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onComplete }) => {
	const [phase, setPhase] = useState("spinning"); // spinning, transforming, building, typing, complete
	const [typedText, setTypedText] = useState("");
	const [isVisible, setIsVisible] = useState(true);

	const targetText = "C1PH3RC3LL";

	useEffect(() => {
		const timeline = [
			{ delay: 500, phase: "transforming" },
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
				{/* Circle Animation */}
				<div className="circle-container">
					<div
						className={`outer-circle ${
							phase !== "spinning" ? "stop-spin" : ""
						}`}
					/>

					{/* Inner Rings */}
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

					{/* Logo C */}
					{/* <div className={`logo-c ${phase === 'building' || phase === 'typing' || phase === 'complete' ? 'visible' : ''}`}>
            C
          </div> */}
				</div>

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
					<div className={`subtitle ${phase === "typing" || phase === "complete" ? "visible" : ""}`}>
						IIIT-NR INFOSEC CLUB
					</div>
				</div>

				{/* Loading Dots */}
				<div className={`loading-dots ${phase === "typing" || phase === "complete" ? "hide" : ""}`}>
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
