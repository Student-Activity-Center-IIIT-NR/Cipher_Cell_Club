import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen.jsx';
import HeroSection from './components/HeroSection.jsx';
import MagicBento from './components/MagicBento.jsx';
import Footer from './components/Footer.jsx';
import RoadmapPage from './components/RoadmapPage.jsx';
import useMobile from './hooks/useMobile.js';
import './style.css';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home page first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          const offset = 100;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
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
        behavior: 'smooth'
      });
    }
  };


  return (
    <>
      {/* Left Sidebar Navigation */}
      <nav className="sidebar-nav" id="navbar">
        <Link to="/" className="nav-logo">CipherCell</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')}>
              <span className="nav-icon">🏠</span>
            </a>
            <div className="nav-tooltip">Home</div>
          </li>
          <li className="nav-item">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>
              <span className="nav-icon">🔍</span>
            </a>
            <div className="nav-tooltip">About Us</div>
          </li>
          <li className="nav-item">
            <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
              <span className="nav-icon">🛡️</span>
            </a>
            <div className="nav-tooltip">Security Services</div>
          </li>
          <li className="nav-item">
            <a href="#events" onClick={(e) => handleSmoothScroll(e, '#events')}>
              <span className="nav-icon">📅</span>
            </a>
            <div className="nav-tooltip">Events Gallery</div>
          </li>
          <li className="nav-item">
            <a href="#ctf" onClick={(e) => handleSmoothScroll(e, '#ctf')}>
              <span className="nav-icon">🏆</span>
            </a>
            <div className="nav-tooltip">CTF Events</div>
          </li>
          <li className="nav-item">
            <a href="#team" onClick={(e) => handleSmoothScroll(e, '#team')}>
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
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
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
    const carousel = document.querySelector('.events-carousel');
    const slides = document.querySelectorAll('.event-slide');
    const indicators = document.querySelectorAll('.indicator');
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
        indicator.classList.toggle('active', index === currentIndex);
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
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
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


      {/* Events Section with Image Gallery */}
      <div id="events" className="events-section">
        <div className="section-background">
          <div className="cyber-grid"></div>
          <div className="gradient-overlay"></div>
        </div>

        <div className="section-inner">
          <h2 className="section-title">Events Gallery</h2>
          <p className="section-subtitle">Explore our cybersecurity events and activities through images</p>

          <div className="events-carousel-container">
            <div className="events-carousel">
              <div className="event-slide" data-event="CTF Championship 2024" data-date="March 15, 2024" data-description="Annual capture the flag competition with teams from across the region">
                <img src="https://picsum.photos/400/250?random=1" alt="CTF Championship 2024" className="event-image" />
                <div className="event-overlay">
                  <h4>CTF Championship 2024</h4>
                  <p>March 15, 2024</p>
                  <span>Annual capture the flag competition</span>
                </div>
              </div>
              <div className="event-slide" data-event="Security Workshop" data-date="February 20, 2024" data-description="Hands-on penetration testing workshop for beginners">
                <img src="https://picsum.photos/400/250?random=2" alt="Security Workshop" className="event-image" />
                <div className="event-overlay">
                  <h4>Security Workshop</h4>
                  <p>February 20, 2024</p>
                  <span>Penetration testing workshop</span>
                </div>
              </div>
              <div className="event-slide" data-event="Blockchain Security Seminar" data-date="January 10, 2024" data-description="Deep dive into smart contract vulnerabilities and DeFi security">
                <img src="https://picsum.photos/400/250?random=3" alt="Blockchain Security Seminar" className="event-image" />
                <div className="event-overlay">
                  <h4>Blockchain Security Seminar</h4>
                  <p>January 10, 2024</p>
                  <span>Smart contract security deep dive</span>
                </div>
              </div>
              <div className="event-slide" data-event="Malware Analysis Workshop" data-date="December 5, 2023" data-description="Advanced techniques for reverse engineering and malware detection">
                <img src="https://picsum.photos/400/250?random=4" alt="Malware Analysis Workshop" className="event-image" />
                <div className="event-overlay">
                  <h4>Malware Analysis Workshop</h4>
                  <p>December 5, 2023</p>
                  <span>Reverse engineering workshop</span>
                </div>
              </div>
              <div className="event-slide" data-event="Network Security Bootcamp" data-date="November 18, 2023" data-description="Comprehensive training on network protocols and security assessment">
                <img src="https://picsum.photos/400/250?random=5" alt="Network Security Bootcamp" className="event-image" />
                <div className="event-overlay">
                  <h4>Network Security Bootcamp</h4>
                  <p>November 18, 2023</p>
                  <span>Network security training</span>
                </div>
              </div>
              <div className="event-slide" data-event="Web Security Fundamentals" data-date="October 12, 2023" data-description="Learn the basics of web application security and common vulnerabilities">
                <img src="https://picsum.photos/400/250?random=6" alt="Web Security Fundamentals" className="event-image" />
                <div className="event-overlay">
                  <h4>Web Security Fundamentals</h4>
                  <p>October 12, 2023</p>
                  <span>Web application security basics</span>
                </div>
              </div>
              <div className="event-slide" data-event="Digital Forensics Lab" data-date="September 8, 2023" data-description="Hands-on digital forensics investigation techniques and tools">
                <img src="https://picsum.photos/400/250?random=7" alt="Digital Forensics Lab" className="event-image" />
                <div className="event-overlay">
                  <h4>Digital Forensics Lab</h4>
                  <p>September 8, 2023</p>
                  <span>Digital investigation techniques</span>
                </div>
              </div>
            </div>
            <div className="carousel-indicators">
              <span className="indicator active"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
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

      {/* CTF Section */}
      <div id="ctf" className="ctf-section">
        <div className="section-background">
          <div className="cyber-grid"></div>
          <div className="gradient-overlay"></div>
        </div>

        <div className="section-inner">
          <h2 className="section-title">CTF Events</h2>
          <p className="section-subtitle">Competitive cybersecurity challenges and educational workshops</p>

          <div className="ctf-events-grid">
            <div className="ctf-event-card" onClick={() => window.open('https://ctftime.org', '_blank')}>
              <div className="ctf-event-icon">⚔️</div>
              <h4>Capture The Flag</h4>
              <p className="ctf-short-desc">Intense competitive hacking challenges</p>
              <div className="ctf-detailed-desc">
                <p>Intense competitive hacking challenges covering web security, cryptography, and reverse engineering. Test your skills against the best.</p>
                <span className="ctf-link-hint">Click to visit CTFTime →</span>
              </div>
            </div>
            
            <div className="ctf-event-card" onClick={() => window.open('https://picoctf.org', '_blank')}>
              <div className="ctf-event-icon">🎓</div>
              <h4>Security Workshops</h4>
              <p className="ctf-short-desc">Hands-on learning sessions</p>
              <div className="ctf-detailed-desc">
                <p>Hands-on learning sessions covering the latest tools, techniques, and methodologies in cybersecurity. From beginner to advanced levels.</p>
                <span className="ctf-link-hint">Click to visit PicoCTF →</span>
              </div>
            </div>

            <div className="ctf-event-card" onClick={() => window.open('https://hackerone.com', '_blank')}>
              <div className="ctf-event-icon">🌐</div>
              <h4>Bug Bounty Programs</h4>
              <p className="ctf-short-desc">Vulnerability hunting programs</p>
              <div className="ctf-detailed-desc">
                <p>Collaborative vulnerability hunting programs with rewards for discovering critical security flaws. Make the internet safer while earning rewards.</p>
                <span className="ctf-link-hint">Click to visit HackerOne →</span>
              </div>
            </div>

            <div className="ctf-event-card" onClick={() => window.open('https://owasp.org', '_blank')}>
              <div className="ctf-event-icon">🤝</div>
              <h4>Industry Partnerships</h4>
              <p className="ctf-short-desc">Exclusive events with leading companies</p>
              <div className="ctf-detailed-desc">
                <p>Exclusive events with leading cybersecurity companies and government agencies. Network with industry professionals and learn from experts.</p>
                <span className="ctf-link-hint">Click to visit OWASP →</span>
              </div>
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

      {/* Team Section */}
      <div id="team" className="team-section">
        <div className="section-background">
          <div className="cyber-grid"></div>
          <div className="gradient-overlay"></div>
        </div>

        <div className="section-inner">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the cybersecurity experts driving innovation</p>

          {/* Leadership Cards */}
          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-avatar">👨‍💻</div>
              <h3>Head</h3>
              <h4>Chief Security Officer</h4>
              <p>Leading cybersecurity initiatives and strategic planning for the club's future.</p>
            </div>
            <div className="leader-card">
              <div className="leader-avatar">👩‍💻</div>
              <h3>Vice Head</h3>
              <h4>Technical Director</h4>
              <p>Overseeing technical operations and mentoring team members in advanced security practices.</p>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="team-members-grid">
            <div className="team-member-card">
              <div className="member-avatar">🔍</div>
              <h4>Security Analyst</h4>
              <p>Penetration testing specialist</p>
            </div>
            <div className="team-member-card">
              <div className="member-avatar">🛡️</div>
              <h4>Incident Responder</h4>
              <p>Threat detection expert</p>
            </div>
            <div className="team-member-card">
              <div className="member-avatar">⛓️</div>
              <h4>Blockchain Developer</h4>
              <p>Smart contract auditor</p>
            </div>
            <div className="team-member-card">
              <div className="member-avatar">🔐</div>
              <h4>Cryptography Expert</h4>
              <p>Encryption specialist</p>
            </div>
            <div className="team-member-card">
              <div className="member-avatar">🎯</div>
              <h4>Red Team Operator</h4>
              <p>Offensive security specialist</p>
            </div>
            <div className="team-member-card">
              <div className="member-avatar">🔬</div>
              <h4>Security Researcher</h4>
              <p>Vulnerability research</p>
            </div>
          </div>

          {/* Website Attribution */}
          <div className="attribution-card">
            <div className="attribution-icon">💻</div>
            <h4>Website Made By</h4>
            <p>CipherCell Development Team</p>
            <span>Crafted with security and innovation in mind</span>
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
        <div className="section-background">
          <div className="cyber-grid"></div>
          <div className="gradient-overlay"></div>
        </div>

        <div className="section-inner">
          <h2 className="section-title">Security Tools</h2>
          <p className="section-subtitle">Advanced cybersecurity tools and resources</p>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">🔍</div>
              <h4>Penetration Testing</h4>
              <p>Find vulnerabilities before attackers do.</p>
              <Link to="/roadmap" className="tool-link">📚 Learn in Roadmap →</Link>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🔬</div>
              <h4>Vulnerability Research</h4>
              <p>Discover zero-day threats and emerging risks.</p>
              <Link to="/roadmap" className="tool-link">📚 Learn in Roadmap →</Link>
            </div>
            <div className="tool-card">
              <div className="tool-icon">⚡</div>
              <h4>Incident Response</h4>
              <p>Rapid breach containment and forensic analysis.</p>
              <Link to="/roadmap" className="tool-link">📚 Learn in Roadmap →</Link>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🏗️</div>
              <h4>Security Architecture</h4>
              <p>Build robust security frameworks and systems.</p>
              <Link to="/roadmap" className="tool-link">📚 Learn in Roadmap →</Link>
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
                Cybersecurity and Blockchain expertise that shapes the future of digital security.
              </p>
              <div className="slide-in-left">
                <div style={{ height: '400px', border: '2px dashed var(--accent-green)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
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
              <h2 className="section-title slide-in-right">Events & Activities</h2>
              <p className="section-description slide-in-left">
                Workshops, competitions, and collaborative projects that build expertise and community.
              </p>
              <div className="scale-up">
                <div style={{ height: '350px', border: '2px dashed var(--accent-purple)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
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
                Meet the experts and enthusiasts driving innovation in cybersecurity and blockchain.
              </p>
              <div className="slide-in-left">
                <div style={{ height: '400px', border: '2px dashed var(--accent-blue)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
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
                Ready to secure the digital frontier? Connect with us and become part of the cybersecurity revolution.
              </p>
              <div className="scale-up">
                <div style={{ height: '300px', border: '2px dashed var(--accent-cyan)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
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
        await new Promise(resolve => setTimeout(resolve, 100));

        // Import and initialize main.js
        const mainModule = await import('./main.js');
        console.log('Website content preloaded during animation');

        // Ensure body is visible
        document.body.style.opacity = '1';

        // All components now visible by default - no fade animations needed

      } catch (error) {
        console.log('Website initialization error:', error);
        // Ensure body is visible even if there's an error
        document.body.style.opacity = '1';
      }
    };

    // Start initialization immediately
    initializeWebsite();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);

    // Ensure the main website is fully visible and cleanup
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';

      console.log('CipherCell website fully loaded and ready');
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