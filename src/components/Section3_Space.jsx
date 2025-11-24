import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section3_Space.css';

gsap.registerPlugin(ScrollTrigger);

const Section3_Space = () => {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const introTextRef = useRef(null);
  const trysilBubbleRef = useRef(null);
  const nationalBubbleRef = useRef(null);
  const trysilMarkerRef = useRef(null);
  const nationalMarkerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mapContainer = mapContainerRef.current;
    const map = mapRef.current;
    const introText = introTextRef.current;
    const trysilBubble = trysilBubbleRef.current;
    const nationalBubble = nationalBubbleRef.current;
    const trysilMarker = trysilMarkerRef.current;
    const nationalMarker = nationalMarkerRef.current;

    if (!section || !mapContainer || !map) return;

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
        scale: 3,
        transformOrigin: '75% 40%', // Center right area (Trysil region)
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
        scale: 1.5,
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

    return () => {
      if (tl && tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  const trysilPercent = realEstateData.vacation_homes.trysil_foreign_share_sales;
  const nationalPercent = realEstateData.vacation_homes.national_foreign_share_sales_2025;

  return (
    <section ref={sectionRef} className="section-space">
      <div className="map-wrapper">
        <div ref={mapContainerRef} className="map-container">
          <svg
            ref={mapRef}
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
              <circle cx="0" cy="0" r="8" fill="#ff6b6b" opacity="0.9">
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0.5;0.9"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>

            {/* National marker (center) */}
            <g ref={nationalMarkerRef} className="marker national-marker" transform="translate(200, 300)">
              <circle cx="0" cy="0" r="8" fill="#4299e1" opacity="0.9">
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0.5;0.9"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>
          </svg>

          {/* Trysil data bubble */}
          <div ref={trysilBubbleRef} className="data-bubble trysil-bubble">
            <div className="bubble-label">Trysil</div>
            <div className="bubble-value">{trysilPercent}%</div>
            <div className="bubble-description">utenlandske kjøpere</div>
          </div>

          {/* National data bubble */}
          <div ref={nationalBubbleRef} className="data-bubble national-bubble">
            <div className="bubble-label">Norge totalt</div>
            <div className="bubble-value">{nationalPercent}%</div>
            <div className="bubble-description">nasjonalt snitt</div>
          </div>
        </div>

        {/* Intro text */}
        <div ref={introTextRef} className="intro-text">
          Men i fjellet skjer det noe...
        </div>
      </div>
    </section>
  );
};

export default Section3_Space;

