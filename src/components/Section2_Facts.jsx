import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section2_Facts.css';

gsap.registerPlugin(ScrollTrigger);

const Section2_Facts = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const mythTextRef = useRef(null);
  const strikeLineRef = useRef(null);
  const factTextRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const mythText = mythTextRef.current;
    const strikeLine = strikeLineRef.current;
    const factText = factTextRef.current;

    if (!section || !background || !mythText || !strikeLine || !factText) return;

    // Set initial states
    gsap.set(background, { backgroundColor: '#1a0000' }); // Dark red/black
    gsap.set(mythText, { opacity: 1 });
    gsap.set(strikeLine, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(factText, { opacity: 0 });

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

    // 1. INITIAL: Dark background, myth text visible (already set)

    // 2. SCROLL 0-30%: Strike through myth text
    tl.to(strikeLine, {
      scaleX: 1,
      duration: 0.3, // 30% of scroll
      ease: 'power2.out',
    });

    // 3. SCROLL 30-50%: Background transitions to white, myth text fades out
    tl.to(
      background,
      {
        backgroundColor: '#ffffff',
        duration: 0.2, // 20% of scroll (30-50%)
        ease: 'power2.inOut',
      },
      '-=0.1'
    );

    tl.to(
      mythText,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      '<'
    );

    // 4. SCROLL 50-80%: Fact text fades in
    tl.to(
      factText,
      {
        opacity: 1,
        duration: 0.3, // 30% of scroll (50-80%)
        ease: 'power2.out',
      },
      '-=0.1'
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

  const residentialPercent = realEstateData.residential.ownership_percent;

  return (
    <section ref={sectionRef} className="section-facts">
      <div ref={backgroundRef} className="background-transition">
        <div className="content-container">
          {/* Myth Phase */}
          <div ref={mythTextRef} className="myth-text">
            MYTE: Utlendinger eier alt
          </div>

          {/* Strike Line */}
          <svg
            ref={strikeLineRef}
            className="strike-line"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="#ff0000"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Fact Phase */}
          <div ref={factTextRef} className="fact-text">
            FAKTA: Kun {residentialPercent}% av norske boliger er utenlandsk eid
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2_Facts;

