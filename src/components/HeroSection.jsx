import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from './HeroBackground';
import DecryptedText from './DecryptedText';
import useMobile from '../hooks/useMobile.js';

const HeroSection = () => {
  const [shouldStartAnimations, setShouldStartAnimations] = useState(false);
  const [isPrimeMode, setIsPrimeMode] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // Wait for website to be fully loaded before starting animations
    const handleWebsiteReady = () => {
      setTimeout(() => {
        setShouldStartAnimations(true);
        // Dispatch hero ready event after loading is complete
        const heroReadyEvent = new CustomEvent('heroSectionReady');
        document.dispatchEvent(heroReadyEvent);
      }, 10); // Small delay to ensure everything is ready
    };

    // Check if website is already ready
    if (document.body.style.opacity === '1') {
      handleWebsiteReady();
    } else {
      // Listen for website ready event
      document.addEventListener('websiteReady', handleWebsiteReady);
    }

    return () => {
      document.removeEventListener('websiteReady', handleWebsiteReady);
    };
  }, []);

  const handleGetFreeThing = () => {
    // Console hacking messages
    const hackingMessages = [
      '🔴 SECURITY BREACH DETECTED...',
      '⚠️  FIREWALL BYPASSED',
      '💀 INJECTING MALICIOUS PAYLOAD...',
      '🚫 ACCESS DENIED → OVERRIDING...',
      '⚡ ROOT ACCESS GRANTED',
      '🔓 SYSTEM COMPROMISED',
      '💉 SQL INJECTION SUCCESSFUL',
      '🎯 TARGET ACQUIRED',
      '⚠️  WARNING: INSECURE CONNECTION',
      '🔥 BUFFER OVERFLOW EXPLOITED',
      '💻 ADMIN PRIVILEGES ESCALATED',
      '🎭 IDENTITY SPOOFED',
      '🔐 ENCRYPTION CRACKED',
      '⚠️  DATA BREACH IN PROGRESS...',
      '🌐 NETWORK INFILTRATED'
    ];

    // Display hacking messages in console
    hackingMessages.forEach((message, index) => {
      setTimeout(() => {
        console.log(`%c${message}`, 'color: #ff1744; font-weight: bold; font-size: 12px;');
      }, index * 200);
    });

    // Console ASCII art after messages
    setTimeout(() => {
      console.log(`%c
    ⚠️  SYSTEM HACKED ⚠️
    ╔══════════════════╗
    ║   UNAUTHORIZED   ║
    ║     ACCESS       ║
    ║    DETECTED      ║
    ╚══════════════════╝
      `, 'color: #ff1744; font-family: monospace; font-size: 10px;');
    }, hackingMessages.length * 200 + 500);

    // Activate prime mode and hacked state instantly
    setIsPrimeMode(true);
    setIsHacked(true);
    
    // Just show the hacking effect without auto-scrolling
    // Users can now scroll naturally to see the about section
  };

  return (
    <section id="hero" className={`section hero-section ${isPrimeMode ? 'prime-mode' : ''}`}>
      {/* LetterGlitch Background */}
      <HeroBackground isPrimeMode={isPrimeMode} />
      
      <div className="hero-container">
        <div className="hero-content" id="heroContent">
          <div className="hero-badge" id="heroBadge">
            Elite Cybersecurity Club
          </div>
          
          <h1 className="hero-title" id="heroTitle">
            <span className="title-main">C1PH3R</span><span className="title-accent">C3LL</span>
          </h1>
          
          <div className="hero-subtitle" id="heroSubtitle">
            {isMobile ? (
              <span className="subtitle-revealed">
                Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence.
              </span>
            ) : (
              shouldStartAnimations ? (
                <DecryptedText
                  text="Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence."
                  animateOn="view"
                  speed={25}
                  maxIterations={30}
                  sequential={true}
                  revealDirection="start"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|:;',.?/"
                  className="subtitle-revealed"
                  encryptedClassName="subtitle-encrypted"
                />
              ) : (
                <span className="subtitle-revealed">
                  Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence.
                </span>
              )
            )}
          </div>
          
          <div className="hero-features" id="heroFeatures">
            
            {!isMobile && (
              <div className="access-panel">
                <div className="panel-header">
                  <span className={`access-status ${isHacked ? 'hacked' : ''}`}>
                    {isHacked ? "SYSTEM HACKED" : "ACCESS GRANTED"}
                  </span>
                  <div className={`status-indicator ${isHacked ? 'hacked' : ''}`}></div>
                </div>
                <div className="panel-content">
                  {shouldStartAnimations ? (
                    <DecryptedText
                      text={isHacked ? "MALWARE INJECTED SUCCESSFULLY..." : "INITIATING SECURE CONNECTION..."}
                      animateOn="view"
                      speed={40}
                      maxIterations={20}
                      characters="0123456789ABCDEF!@#$%^&*"
                      className={isHacked ? "access-text-hacked" : "access-text-revealed"}
                      encryptedClassName="access-text-encrypted"
                      key={isHacked ? "hacked-connection" : "normal-connection"}
                    />
                  ) : (
                    <span className={isHacked ? "access-text-hacked" : "access-text-revealed"}>
                      {isHacked ? "MALWARE INJECTED SUCCESSFULLY..." : "INITIATING SECURE CONNECTION..."}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="hero-actions" id="heroActions">
            <Link to="/roadmap" className="cyber-button roadmap-cta" data-text="START LEARNING">
              <span className="btn-text">START LEARNING</span>
              <div className="btn-overlay"></div>
            </Link>
            <div className="cyber-button" data-text="GET FREE THING" onClick={handleGetFreeThing}>
              <span className="btn-text">GET FREE THING</span>
              <div className="btn-overlay"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual" id="heroVisual">
          <div className="hero-terminal" id="heroTerminal">
              <div className="terminal-header">
                <div className="terminal-dot dot-red"></div>
                <div className="terminal-dot dot-yellow"></div>
                <div className="terminal-dot dot-green"></div>
                <div className="terminal-title">root@ciphercell-hq:~#</div>
              </div>
              
              <div className="terminal-content">
                <div className="terminal-line">
                  <span className="terminal-prompt">root@ciphercell-hq:~#</span>
                  <span className="terminal-command">nmap -sS -O target.domain.com</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-output">Starting Nmap scan...</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-output">ssh     open   filtered</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-output">http    open   Apache/2.4.41</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-output">https   open   Apache/2.4.41</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-prompt">root@ciphercell-hq:~#</span>
                  <span className="terminal-command">vulnerability detected</span>
                  <span className="typing-cursor"></span>
                </div>
              </div>
            </div>
          
          {/* Security stats - Only show on desktop */}
          {!isMobile && (
            <div className="security-stats" id="securityStats">
              <div className="stat-card">
                <div className="stat-text">
                  {shouldStartAnimations ? (
                    <DecryptedText
                      text={isHacked ? "INSECURE" : "SECURE"}
                      animateOn="view"
                      speed={80}
                      maxIterations={15}
                      characters="01ABCDEF!@#$%^&*"
                      className={isHacked ? "stat-hacked" : "stat-revealed"}
                      encryptedClassName="stat-encrypted"
                      key={isHacked ? "hacked-secure" : "normal-secure"}
                    />
                  ) : (
                    <span className={isHacked ? "stat-hacked" : "stat-revealed"}>
                      {isHacked ? "INSECURE" : "SECURE"}
                    </span>
                  )}
                </div>
                <div className="stat-label">Network Status</div>
              </div>
              <div className="stat-card">
                <div className="stat-text">
                  {shouldStartAnimations ? (
                    <DecryptedText
                      text={isHacked ? "NOOB" : "ELITE"}
                      animateOn="view"
                      speed={90}
                      maxIterations={18}
                      characters="HACKER01234567!?"
                      className={isHacked ? "stat-hacked" : "stat-revealed"}
                      encryptedClassName="stat-encrypted"
                      key={isHacked ? "hacked-elite" : "normal-elite"}
                    />
                  ) : (
                    <span className={isHacked ? "stat-hacked" : "stat-revealed"}>
                      {isHacked ? "NOOB" : "ELITE"}
                    </span>
                  )}
                </div>
                <div className="stat-label">Skill Level</div>
              </div>
              <div className="stat-card">
                <div className="stat-text">
                  {shouldStartAnimations ? (
                    <DecryptedText
                      text={isHacked ? "PWNED" : "ACTIVE"}
                      animateOn="view"
                      speed={70}
                      maxIterations={12}
                      characters="CYBER0123456789"
                      className={isHacked ? "stat-hacked" : "stat-revealed"}
                      encryptedClassName="stat-encrypted"
                      key={isHacked ? "hacked-active" : "normal-active"}
                    />
                  ) : (
                    <span className={isHacked ? "stat-hacked" : "stat-revealed"}>
                      {isHacked ? "PWNED" : "ACTIVE"}
                    </span>
                  )}
                </div>
                <div className="stat-label">Threat Detection</div>
              </div>
              <div className="stat-card">
                <div className="stat-text">
                  {shouldStartAnimations ? (
                    <DecryptedText
                      text={isHacked ? "OFFLINE" : "ONLINE"}
                      animateOn="view"
                      speed={60}
                      maxIterations={20}
                      characters="BLOCKCHAIN01!@#"
                      className={isHacked ? "stat-hacked" : "stat-revealed"}
                      encryptedClassName="stat-encrypted"
                      key={isHacked ? "hacked-online" : "normal-online"}
                    />
                  ) : (
                    <span className={isHacked ? "stat-hacked" : "stat-revealed"}>
                      {isHacked ? "OFFLINE" : "ONLINE"}
                    </span>
                  )}
                </div>
                <div className="stat-label">System Status</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;