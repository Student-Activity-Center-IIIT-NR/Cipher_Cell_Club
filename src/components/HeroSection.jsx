import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from './HeroBackground';
import DecryptedText from './DecryptedText';
import useMobile from '../hooks/useMobile.js';

const HeroSection = () => {
  const [shouldStartAnimations, setShouldStartAnimations] = useState(false);
  const [isPrimeMode, setIsPrimeMode] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const [visitorData, setVisitorData] = useState({
    ip: 'Detecting...',
    browser: 'Unknown',
    device: 'Analyzing...',
    os: 'Fingerprinting...',
    screen: 'Measuring...',
    timezone: 'Tracking...',
    language: 'Processing...',
    fingerprint: 'Generating...',
    connection: 'Analyzing...'
  });
  const isMobile = useMobile();

  useEffect(() => {
    // Collect visitor data for cybersecurity demonstration
    const collectVisitorData = async () => {
      try {
        // Advanced browser fingerprinting
        const advancedFingerprint = await generateFingerprint();
        const connectionInfo = getConnectionInfo();

        // Get basic browser/device info
        const browserInfo = {
          browser: getBrowserName(),
          device: getDeviceType(),
          os: getOperatingSystem(),
          screen: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language || navigator.userLanguage,
          fingerprint: advancedFingerprint,
          connection: connectionInfo
        };

        setVisitorData(prev => ({ ...prev, ...browserInfo }));

        // Try to get IP data
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const ipData = await response.json();
          
          setVisitorData(prev => ({
            ...prev,
            ip: ipData.ip || 'Hidden'
          }));
        } catch (error) {
          // Fallback if IP service fails
          setVisitorData(prev => ({
            ...prev,
            ip: 'VPN/Proxy'
          }));
        }

      } catch (error) {
        console.log('Data collection completed');
      }
    };

    // Start data collection immediately
    collectVisitorData();

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

  // Advanced fingerprinting functions
  const generateFingerprint = async () => {
    try {
      // Canvas fingerprinting
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('CipherCell fingerprint test 🔒', 2, 2);
      const canvasFingerprint = canvas.toDataURL().slice(-50);
      
      // WebGL fingerprinting
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const webglVendor = gl ? gl.getParameter(gl.VENDOR) : 'Unknown';
      const webglRenderer = gl ? gl.getParameter(gl.RENDERER) : 'Unknown';
      
      // Audio fingerprinting
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      oscillator.connect(analyser);
      analyser.connect(gainNode);
      const audioFingerprint = analyser.frequencyBinCount;
      audioContext.close();

      // Combine fingerprints
      const combinedFingerprint = `${canvasFingerprint}-${webglVendor.slice(0,10)}-${audioFingerprint}`;
      return combinedFingerprint.slice(0, 16).toUpperCase();
    } catch (error) {
      return 'FINGERPRINT_ERROR';
    }
  };

  const getConnectionInfo = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return `${connection.effectiveType || 'Unknown'} (${connection.downlink || '?'}Mbps)`;
    }
    return 'Connection Hidden';
  };


  // Enhanced helper functions for device detection
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    const version = navigator.appVersion;
    
    if (userAgent.includes('Edg/')) return `Edge ${version.match(/Edg\/(\d+)/)?.[1] || ''}`;
    if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
      const chromeVersion = version.match(/Chrome\/(\d+)/)?.[1] || '';
      return `Chrome ${chromeVersion}`;
    }
    if (userAgent.includes('Firefox/')) {
      const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || '';
      return `Firefox ${firefoxVersion}`;
    }
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
      const safariVersion = version.match(/Safari\/(\d+)/)?.[1] || '';
      return `Safari ${safariVersion}`;
    }
    if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
      return 'Opera';
    }
    return 'Unknown Browser';
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    const screenWidth = screen.width;
    
    if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return screenWidth > 500 ? 'Large Mobile' : 'Mobile';
    }
    if (/iPad|Tablet/i.test(userAgent) || (screenWidth >= 768 && screenWidth <= 1024)) {
      return 'Tablet';
    }
    if (screenWidth >= 1920) {
      return 'Large Desktop';
    }
    return 'Desktop';
  };

  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    if (userAgent.includes('Windows NT 10.0')) return 'Windows 11/10';
    if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
    if (userAgent.includes('Windows')) return 'Windows';
    
    if (platform.includes('Mac') || userAgent.includes('Mac OS X')) {
      const macVersion = userAgent.match(/Mac OS X (\d+_\d+)/)?.[1]?.replace('_', '.') || '';
      return `macOS ${macVersion}`;
    }
    
    if (userAgent.includes('Android')) {
      const androidVersion = userAgent.match(/Android (\d+\.?\d*)/)?.[1] || '';
      return `Android ${androidVersion}`;
    }
    
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      const iosVersion = userAgent.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || '';
      return `iOS ${iosVersion}`;
    }
    
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Ubuntu')) return 'Ubuntu';
    
    return `Unknown (${platform})`;
  };

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
            IIIT-NR's Info Sec Club
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
            {/* <div className="cyber-button" data-text="GET FREE THING" onClick={handleGetFreeThing}>
              <span className="btn-text">GET FREE THING</span>
              <div className="btn-overlay"></div>
            </div> */}
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
          
          {/* Visitor Data Collection Demo - Only show on desktop */}
          {!isMobile && (
            <div className="visitor-data-panel" id="visitorDataPanel">
              <div className="panel-header">
                <span className="data-collection-title">
                  DATA COLLECTED FROM YOUR VISIT
                </span>
                <div className="warning-indicator"></div>
              </div>
              
              <div className="data-grid">
                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.ip}
                        animateOn="view"
                        speed={60}
                        maxIterations={15}
                        characters="0123456789."
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.ip}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.ip}</span>
                    )}
                  </div>
                  <div className="data-label">IP Address</div>
                </div>


                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={`${visitorData.browser} / ${visitorData.os}`}
                        animateOn="view"
                        speed={70}
                        maxIterations={10}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={`${visitorData.browser}-${visitorData.os}`}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.browser} / {visitorData.os}</span>
                    )}
                  </div>
                  <div className="data-label">Browser / OS</div>
                </div>

                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.device}
                        animateOn="view"
                        speed={90}
                        maxIterations={8}
                        characters="DESKTOP1234567890"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.device}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.device}</span>
                    )}
                  </div>
                  <div className="data-label">Device Type</div>
                </div>

                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.screen}
                        animateOn="view"
                        speed={50}
                        maxIterations={12}
                        characters="0123456789x"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.screen}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.screen}</span>
                    )}
                  </div>
                  <div className="data-label">Screen Resolution</div>
                </div>

                {/* <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.timezone}
                        animateOn="view"
                        speed={75}
                        maxIterations={10}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/_"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.timezone}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.timezone}</span>
                    )}
                  </div>
                  <div className="data-label">Timezone</div>
                </div> */}

                {/* <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.language}
                        animateOn="view"
                        speed={85}
                        maxIterations={8}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ-"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.language}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.language}</span>
                    )}
                  </div>
                  <div className="data-label">Language</div>
                </div> */}

                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.fingerprint}
                        animateOn="view"
                        speed={40}
                        maxIterations={25}
                        characters="ABCDEF0123456789"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.fingerprint}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.fingerprint}</span>
                    )}
                  </div>
                  <div className="data-label">Browser Fingerprint</div>
                </div>

                <div className="data-item">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text={visitorData.connection}
                        animateOn="view"
                        speed={65}
                        maxIterations={12}
                        characters="4G5GMbps0123456789"
                        className="data-text-revealed"
                        encryptedClassName="data-text-encrypted"
                        key={visitorData.connection}
                      />
                    ) : (
                      <span className="data-text-revealed">{visitorData.connection}</span>
                    )}
                  </div>
                  <div className="data-label">Network Connection</div>
                </div>


                {/* <div className="data-item tracking-status">
                  <div className="data-value">
                    {shouldStartAnimations ? (
                      <DecryptedText
                        text="FULLY TRACKED"
                        animateOn="view"
                        speed={100}
                        maxIterations={30}
                        characters="TRACKED01234567890!@#$%^&*"
                        className="data-text-warning"
                        encryptedClassName="data-text-encrypted"
                        key="tracking-status"
                      />
                    ) : (
                      <span className="data-text-warning">FULLY TRACKED</span>
                    )}
                  </div>
                  <div className="data-label">Privacy Status</div>
                </div> */}
              </div>

              <div className="data-warning">
                <span className="warning-text">
                  ⚠️ This demonstrates how much data websites can collect. Learn to protect yourself.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;