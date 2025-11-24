import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section1_Hook.css';

gsap.registerPlugin(ScrollTrigger);

const Section1_Hook = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !map || !content) return;

    // Set initial states
    gsap.set(map, { filter: 'blur(20px)' });
    gsap.set(content, { opacity: 0, y: 50 });

    // Create timeline with ScrollTrigger
    // Total scroll: 200vh, Unpin at 90% = 180vh
    const unpinAt = '+=180%'; // 90% of 200vh

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: unpinAt, // Unpins at 90% scroll
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Map blur: 20px -> 0px (0-50% of scroll = first 100vh of 180vh timeline)
    // 100vh / 180vh = 0.556 of timeline
    tl.to(map, {
      filter: 'blur(0px)',
      duration: 0.556, // 50% of scroll distance
      ease: 'power2.out',
    });

    // Text fade in and slide up (20-60% of scroll = 40-120vh of 180vh timeline)
    // Start: 40vh / 180vh = 0.222, Duration: 80vh / 180vh = 0.444
    tl.fromTo(
      content,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.444, // 40% of scroll (20-60%)
        ease: 'power2.out',
      },
      0.222 // Start at 20% of scroll
    );

    // Scroll indicator fade out (starts fading at 50% of scroll)
    if (scrollIndicator) {
      tl.to(
        scrollIndicator,
        {
          opacity: 0,
          duration: 0.278, // Fade over remaining scroll
          ease: 'power2.in',
        },
        0.556 // Start at 50% of scroll
      );
    }

    return () => {
      // Clean up the timeline's ScrollTrigger
      if (tl && tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      // Kill the timeline itself
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  const transparencyStat = realEstateData.transparency_issues.consequence;

  return (
    <section ref={sectionRef} className="section-hook">
      <div ref={mapRef} className="background-map">
        {/* Placeholder for map - can be replaced with actual map image or Leaflet component */}
        <div className="map-placeholder">
          <svg viewBox="0 0 1200 800" className="map-svg">
            <rect width="1200" height="800" fill="#1a1a2e" />
            <text
              x="600"
              y="400"
              textAnchor="middle"
              fill="#4a5568"
              fontSize="24"
              fontFamily="sans-serif"
            >
              Norge
            </text>
          </svg>
        </div>
      </div>
      <div ref={contentRef} className="content-overlay">
        <h1 className="hook-title">DET USYNLIGE MARKEDET</h1>
        <p className="fact">{transparencyStat}</p>
        <div ref={scrollIndicatorRef} className="scroll-indicator">
          Scroll for å avsløre
        </div>
      </div>
    </section>
  );
};

export default Section1_Hook;

