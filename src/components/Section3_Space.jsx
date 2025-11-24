import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section3_Space.css';

gsap.registerPlugin(ScrollTrigger);

const Section3_Space = () => {
  const sectionRef = useRef(null);
  const trysilMarkerRef = useRef(null);
  const nationalMarkerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use GSAP context for proper cleanup and React Strict Mode compatibility
    const ctx = gsap.context(() => {
      const map = section.querySelector('.norway-map');
      const introText = section.querySelector('.intro-text');
      const trysilBubble = section.querySelector('.trysil-bubble');
      const nationalBubble = section.querySelector('.national-bubble');
      const trysilMarker = section.querySelector('.trysil-marker');
      const nationalMarker = section.querySelector('.national-marker');

      if (!map) return;

      // Set initial states
      gsap.set(map, { scale: 1, transformOrigin: 'center center' });
      gsap.set(introText, { opacity: 1 });
      gsap.set(trysilBubble, { opacity: 0, scale: 0.8 });
      gsap.set(nationalBubble, { opacity: 0, scale: 0.8 });
      gsap.set(trysilMarker, { scale: 1 });
      gsap.set(nationalMarker, { scale: 1 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%', // 200vh scroll distance
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. START: Full map visible, intro text
      // (Already set)

      // 2. SCROLL 0-30%: Zoom in towards Trysil (center right area)
      tl.to(
        map,
        {
          scale: 4,
          transformOrigin: '70% 60%', // Focus on Trysil area
          duration: 0.3, // 30% of scroll
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        introText,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        0.1
      );

      // 3. SCROLL 30-50%: Trysil bubble pops up
      tl.to(
        trysilMarker,
        {
          scale: 1.3,
          duration: 0.1,
          ease: 'back.out(1.7)',
        },
        0.3
      );

      tl.to(
        trysilBubble,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2, // 20% of scroll (30-50%)
          ease: 'back.out(1.7)',
        },
        0.3
      );

      // 4. SCROLL 60-80%: Pan out slightly, show national bubble
      tl.to(
        map,
        {
          scale: 1.2,
          transformOrigin: 'center center',
          duration: 0.2, // 20% of scroll (60-80%)
          ease: 'power2.inOut',
        },
        0.6
      );

      tl.to(
        nationalMarker,
        {
          scale: 1.3,
          duration: 0.1,
          ease: 'back.out(1.7)',
        },
        0.7
      );

      tl.to(
        nationalBubble,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: 'back.out(1.7)',
        },
        0.7
      );

      // 5. SCROLL 100%: Unpin (handled by ScrollTrigger end)
    }, section);

    return () => {
      ctx.revert(); // Clean up all GSAP animations and ScrollTriggers
    };
  }, []);

  const trysilPercent = realEstateData.vacation_homes.trysil_foreign_share_sales;
  const nationalPercent = realEstateData.vacation_homes.national_foreign_share_sales_2025;

  return (
    <section ref={sectionRef} className="section-space">
      <div className="map-wrapper">
        <div className="map-container">
          <svg
            className="norway-map"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Simplified Norway shape */}
            <path
              d="M 200 50 L 250 80 L 280 120 L 300 180 L 310 250 L 300 320 L 280 380 L 250 420 L 220 450 L 200 480 L 180 500 L 160 520 L 150 550 L 140 580 L 120 580 L 100 550 L 90 520 L 100 480 L 120 450 L 150 420 L 180 380 L 200 320 L 210 250 L 200 180 L 180 120 L 160 80 Z"
              fill="#2d3748"
              stroke="#4a5568"
              strokeWidth="2"
            />

            {/* Trysil marker (east, near Swedish border) */}
            <g ref={trysilMarkerRef} className="marker trysil-marker" transform="translate(280, 200)">
              <circle cx="0" cy="0" r="8" fill="#ff6b6b" opacity="0.9" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>

            {/* National marker (center) */}
            <g ref={nationalMarkerRef} className="marker national-marker" transform="translate(200, 300)">
              <circle cx="0" cy="0" r="8" fill="#4299e1" opacity="0.9" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>
          </svg>

          {/* Trysil data bubble */}
          <div className="data-bubble trysil-bubble">
            <div className="bubble-label">Trysil</div>
            <div className="bubble-value">{trysilPercent}%</div>
            <div className="bubble-description">utenlandske kjøpere</div>
          </div>

          {/* National data bubble */}
          <div className="data-bubble national-bubble">
            <div className="bubble-label">Norge totalt</div>
            <div className="bubble-value">{nationalPercent}%</div>
            <div className="bubble-description">nasjonalt snitt</div>
          </div>
        </div>

        {/* Intro text */}
        <div className="intro-text">
          Men i fjellet er historien en annen...
        </div>
      </div>
    </section>
  );
};

export default Section3_Space;

