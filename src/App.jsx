import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
	useNavigate,
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen.jsx";
import HeroSection from "./components/HeroSection.jsx";
import MagicBento from "./components/MagicBento.jsx";
import Footer from "./components/Footer.jsx";
import RoadmapPage from "./components/RoadmapPage.jsx";
import BentoGridDemo from "./components/bento-grid-demo.jsx";
import useMobile from "./hooks/useMobile.js";
import data from "./data/ctfs.json";
import teamData from "./data/team.json";

import "./style.css";

// Navigation Component
const Navigation = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleSmoothScroll = (e, targetId) => {
		e.preventDefault();

		// If we're not on the home page, navigate to home page first
		if (location.pathname !== "/") {
			navigate("/");
			// Wait for navigation to complete, then scroll
			setTimeout(() => {
				const element = document.querySelector(targetId);
				if (element) {
					const offset = 100;
					const elementPosition = element.offsetTop - offset;
					window.scrollTo({
						top: elementPosition,
						behavior: "smooth",
					});
				}
			}, 100);
			return;
		}

		// If we're on the home page, scroll directly
		const element = document.querySelector(targetId);
		if (element) {
			// Calculate offset for fixed sidebar and some extra space
			const offset = 100;
			const elementPosition = element.offsetTop - offset;
			window.scrollTo({
				top: elementPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			{/* Left Sidebar Navigation */}
			<nav className="sidebar-nav" id="navbar">
				<Link to="/" className="nav-logo">
					CipherCell
				</Link>
				<ul className="nav-links">
					<li className="nav-item">
						<a href="#hero" onClick={(e) => handleSmoothScroll(e, "#hero")}>
							<span className="nav-icon">🏠</span>
						</a>
						<div className="nav-tooltip">Home</div>
					</li>
					{/* <li className="nav-item">
						<a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
							<span className="nav-icon">🔍</span>
						</a>
						<div className="nav-tooltip">About Us</div>
					</li>
					<li className="nav-item">
						<a
							href="#services"
							onClick={(e) => handleSmoothScroll(e, "#services")}
						>
							<span className="nav-icon">🛡️</span>
						</a>
						<div className="nav-tooltip">Security Services</div>
					</li> */}
					<li className="nav-item">
						<a href="#events" onClick={(e) => handleSmoothScroll(e, "#events")}>
							<span className="nav-icon">📅</span>
						</a>
						<div className="nav-tooltip">Workshops</div>
					</li>
					<li className="nav-item">
						<a href="#ctf" onClick={(e) => handleSmoothScroll(e, "#ctf")}>
							<span className="nav-icon">🏆</span>
						</a>
						<div className="nav-tooltip">CTF Events</div>
					</li>
					<li className="nav-item">
						<a href="#team" onClick={(e) => handleSmoothScroll(e, "#team")}>
							<span className="nav-icon">👥</span>
						</a>
						<div className="nav-tooltip">Our Team</div>
					</li>
					<li className="nav-item">
						<Link to="/roadmap">
							<span className="nav-icon">🗺️</span>
						</Link>
						<div className="nav-tooltip">Learning Roadmap</div>
					</li>
					<li className="nav-item">
						<a
							href="#contact"
							onClick={(e) => handleSmoothScroll(e, "#contact")}
						>
							<span className="nav-icon">📧</span>
						</a>
						<div className="nav-tooltip">Contact</div>
					</li>
				</ul>
			</nav>
		</>
	);
};

// Home Page Component
const HomePage = () => {
	const isMobile = useMobile();

	useEffect(() => {
		const carousel = document.querySelector(".events-carousel");
		const slides = document.querySelectorAll(".event-slide");
		const indicators = document.querySelectorAll(".indicator");
		let currentIndex = 0;

		if (!carousel || slides.length === 0) return;

		const updateCarousel = () => {
			// Check if mobile
			const isMobileView = window.innerWidth <= 768;

			// Update carousel position
			let offset;
			if (isMobileView) {
				// Mobile: show one slide at a time
				offset = -currentIndex * 100;
			} else {
				// Desktop: show 3 slides, move by one
				offset = -currentIndex * (100 / 3);
			}

			carousel.style.transform = `translateX(${offset}%)`;

			// Update indicators
			indicators.forEach((indicator, index) => {
				indicator.classList.toggle("active", index === currentIndex);
			});
		};

		const nextSlide = () => {
			currentIndex = (currentIndex + 1) % slides.length;
			updateCarousel();
		};

		// Initial position
		updateCarousel();

		// Start auto-scroll every 3.5 seconds
		const intervalId = setInterval(nextSlide, 3500);

		// Handle window resize
		const handleResize = () => {
			updateCarousel();
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			clearInterval(intervalId);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="page-container">
			<HeroSection />

			{/* About Section with MagicBento - Simplified for mobile */}
			{/* <div id="about" className="content-section">
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '4rem 2rem' }}>
          <div className="slide-in-left">
            <MagicBento
              textAutoHide={true}
              enableStars={!isMobile} // Disable stars on mobile
              enableSpotlight={!isMobile} // Disable spotlight on mobile
              enableBorderGlow={true}
              enableTilt={!isMobile} // Disable tilt on mobile
              enableMagnetism={!isMobile} // Disable magnetism on mobile
              clickEffect={true}
              spotlightRadius={isMobile ? 150 : 300} // Smaller radius on mobile
              particleCount={isMobile ? 6 : 12} // Fewer particles on mobile
              glowColor="132, 0, 255"
            />
          </div>
        </div>
      </div> */}

			{/* CTF Section */}
			<div id="events" className="workshop-gallery-section">
				<div className="section-background">
					<div className="cyber-grid"></div>
					<div className="gradient-overlay"></div>
				</div>

				<div className="section-inner">
					<h2 className="section-title">Workshops</h2>
					<p className="section-subtitle">
						Explore CTF Events happening across globe
					</p>

					<BentoGridDemo />
				</div>

				{!isMobile && (
					<div className="floating-elements">
						<div className="floating-dot dot-1"></div>
						<div className="floating-dot dot-2"></div>
					</div>
				)}
			</div>

			{/* Events Section with Image Gallery */}
			<div id="ctf" className="events-section">
				<div className="section-background">
					<div className="cyber-grid"></div>
					<div className="gradient-overlay"></div>
				</div>

				<div className="section-inner">
					<h2 className="section-title">CTF Events</h2>
					<p className="section-subtitle">
						Explore our cybersecurity events and activities through images
					</p>

					<div className="events-carousel-container">
						<div className="events-carousel">
							{data.events.map((event, index) => (
								<div
									className="event-slide"
									key={index}
									data-event={event.title}
									data-date={event.date}
									data-description={event.description}
								>
									<img
										src={event.image}
										alt={event.title}
										className="event-image"
									/>
									<div className="event-overlay">
										<h4>{event.title}</h4>
										<p>{event.date}</p>
										<span>{event.description}</span>
									</div>
								</div>
							))}
						</div>
						<div className="carousel-indicators">
							{data.events.map((_, index) => (
								<span
									key={index}
									className={`indicator ${index === 0 ? "active" : ""}`}
								></span>
							))}
						</div>
					</div>
				</div>

				{!isMobile && (
					<div className="floating-elements">
						<div className="floating-dot dot-1"></div>
						<div className="floating-dot dot-2"></div>
						<div className="floating-dot dot-3"></div>
					</div>
				)}
			</div>

			{/* Team Section */}
			<div id="team" className="team-section">
				<div className="section-background">
					<div className="cyber-grid"></div>
					<div className="gradient-overlay"></div>
				</div>

				<div className="section-inner">
					<h2 className="section-title">Our Team</h2>
					<p className="section-subtitle">
						Meet the cybersecurity experts driving innovation
					</p>

					{/* Leadership */}
					<div className="leadership-section">
						<h3 className="section-subtitle-small">Leadership</h3>
						<div className="leadership-cards">
							{teamData.leadership.map((leader, index) => (
								<div className="team-card leadership-card" key={index}>
									<div className="team-image-container">
										<img
											src={leader.image}
											alt={leader.name}
											className="team-image"
										/>
									</div>
									<h3 className="team-name">{leader.name}</h3>
									<div className="team-position">{leader.position}</div>
								</div>
							))}
						</div>
					</div>

					{/* Core Members */}
					<div className="core-members-section">
						<h3 className="section-subtitle-small">Core Members</h3>
						<div className="core-members-grid">
							{teamData.coreMembers.map((member, index) => (
								<div className="team-card core-card" key={index}>
									<div className="team-image-container">
										{/* <div className="placeholder-avatar">{member.avatar}</div> */}
										<div className="team-image-container">
											<img
												src={member.image}
												alt={member.name}
												className="team-image"
											/>
										</div>
									</div>
									<h3 className="team-name">{member.name}</h3>
									<div className="team-position">{member.position}</div>
								</div>
							))}
						</div>
					</div>

					{/* Website Attribution */}
					<div className="website-attribution">
						<h3 className="section-subtitle-small">Website Made By</h3>
						<div className="attribution-team-card">
							<div className="team-image-container">
								<img
									src="/webdev.png"
									alt="Web Development Team"
									className="team-image"
								/>
							</div>
							<h3 className="team-name">The Dev Club</h3>
							{/* <div className="team-position">CIPHERCELL DEVELOPERS</div> */}
							<p className="attribution-text">
								Crafted with security and innovation in mind
							</p>
						</div>
					</div>
				</div>

				{!isMobile && (
					<div className="floating-elements">
						<div className="floating-dot dot-1"></div>
						<div className="floating-dot dot-2"></div>
					</div>
				)}
			</div>

			{/* Tools Section */}
			<div id="services" className="tools-section">
				{/* <div className="section-background">
					<div className="cyber-grid"></div>
					<div className="gradient-overlay"></div>
				</div> */}

				<div className="section-inner">
					<h2 className="section-title">Security Tools</h2>
					<p className="section-subtitle">
						Advanced cybersecurity tools and resources
					</p>

					<div className="tools-grid">
						<div className="tool-card">
							<div className="tool-icon">🔍</div>
							<h4>Penetration Testing</h4>
							<p>Find vulnerabilities before attackers do.</p>
							<Link to="/roadmap" className="tool-link">
								📚 Learn in Roadmap →
							</Link>
						</div>
						<div className="tool-card">
							<div className="tool-icon">🔬</div>
							<h4>Vulnerability Research</h4>
							<p>Discover zero-day threats and emerging risks.</p>
							<Link to="/roadmap" className="tool-link">
								📚 Learn in Roadmap →
							</Link>
						</div>
						<div className="tool-card">
							<div className="tool-icon">⚡</div>
							<h4>Incident Response</h4>
							<p>Rapid breach containment and forensic analysis.</p>
							<Link to="/roadmap" className="tool-link">
								📚 Learn in Roadmap →
							</Link>
						</div>
						<div className="tool-card">
							<div className="tool-icon">🏗️</div>
							<h4>Security Architecture</h4>
							<p>Build robust security frameworks and systems.</p>
							<Link to="/roadmap" className="tool-link">
								📚 Learn in Roadmap →
							</Link>
						</div>
					</div>
				</div>

				{!isMobile && (
					<div className="floating-elements">
						<div className="floating-dot dot-1"></div>
						<div className="floating-dot dot-2"></div>
						<div className="floating-dot dot-3"></div>
					</div>
				)}
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

// About Page Component
const AboutPage = () => {
	return (
		<div className="page-container">
			<section id="about" className="section">
				<div className="container">
					<div className="section-content">
						<h2 className="section-title fade-in">About C1PH3RC3LL</h2>
						<p className="section-description fade-in">
							Elite Cybersecurity & Blockchain Club - Interactive Experience
						</p>
						<div className="slide-in-left">
							<MagicBento
								textAutoHide={true}
								enableStars={true}
								enableSpotlight={true}
								enableBorderGlow={true}
								enableTilt={true}
								enableMagnetism={true}
								clickEffect={true}
								spotlightRadius={300}
								particleCount={12}
								glowColor="132, 0, 255"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

// Services Page Component
const ServicesPage = () => {
	return (
		<div className="page-container">
			<section id="services" className="section">
				<div className="container">
					<div className="section-content">
						<div className="section-placeholder">
							<h2 className="section-title fade-in">Our Focus Areas</h2>
							<p className="section-description fade-in">
								Cybersecurity and Blockchain expertise that shapes the future of
								digital security.
							</p>
							<div className="slide-in-left">
								<div
									style={{
										height: "400px",
										border: "2px dashed var(--accent-green)",
										borderRadius: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--text-secondary)",
									}}
								>
									<p>Custom Services Design Area</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

// Events Page Component
const EventsPage = () => {
	return (
		<div className="page-container">
			<section id="events" className="section">
				<div className="container">
					<div className="section-content">
						<div className="section-placeholder">
							<h2 className="section-title slide-in-right">
								Events & Activities
							</h2>
							<p className="section-description slide-in-left">
								Workshops, competitions, and collaborative projects that build
								expertise and community.
							</p>
							<div className="scale-up">
								<div
									style={{
										height: "350px",
										border: "2px dashed var(--accent-purple)",
										borderRadius: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--text-secondary)",
									}}
								>
									<p>Custom Events Design Area</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

// Team Page Component
const TeamPage = () => {
	return (
		<div className="page-container">
			<section id="team" className="section">
				<div className="container">
					<div className="section-content">
						<div className="section-placeholder">
							<h2 className="section-title fade-in">Our Team</h2>
							<p className="section-description fade-in">
								Meet the experts and enthusiasts driving innovation in
								cybersecurity and blockchain.
							</p>
							<div className="slide-in-left">
								<div
									style={{
										height: "400px",
										border: "2px dashed var(--accent-blue)",
										borderRadius: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--text-secondary)",
									}}
								>
									<p>Custom Team Design Area</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

// Contact Page Component
const ContactPage = () => {
	return (
		<div className="page-container">
			<section id="contact" className="section">
				<div className="container">
					<div className="section-content">
						<div className="section-placeholder">
							<h2 className="section-title slide-in-right">Join CipherCell</h2>
							<p className="section-description slide-in-left">
								Ready to secure the digital frontier? Connect with us and become
								part of the cybersecurity revolution.
							</p>
							<div className="scale-up">
								<div
									style={{
										height: "300px",
										border: "2px dashed var(--accent-cyan)",
										borderRadius: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--text-secondary)",
									}}
								>
									<p>Custom Contact Design Area</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

// Main App Component
const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Initialize main website functionality in the background
		const initializeWebsite = async () => {
			try {
				// Wait a bit to ensure DOM is ready
				await new Promise((resolve) => setTimeout(resolve, 100));

				// Import and initialize main.js
				const mainModule = await import("./main.js");
				console.log("Website content preloaded during animation");

				// Ensure body is visible
				document.body.style.opacity = "1";

				// All components now visible by default - no fade animations needed
			} catch (error) {
				console.log("Website initialization error:", error);
				// Ensure body is visible even if there's an error
				document.body.style.opacity = "1";
			}
		};

		// Start initialization immediately
		initializeWebsite();
	}, []);

	const handleLoadingComplete = () => {
		setIsLoading(false);

		// Ensure the main website is fully visible and cleanup
		setTimeout(() => {
			document.body.style.transition = "opacity 0.5s ease";
			document.body.style.opacity = "1";

			console.log("CipherCell website fully loaded and ready");
		}, 100);
	};

	if (isLoading) {
		return <LoadingScreen onComplete={handleLoadingComplete} />;
	}

	return (
		<Router>
			<div className="app">
				<Navigation />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/services" element={<ServicesPage />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="/team" element={<TeamPage />} />
						<Route path="/roadmap" element={<RoadmapPage />} />
						<Route path="/contact" element={<ContactPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
