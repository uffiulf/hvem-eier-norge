import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section5_Concept.css';

gsap.registerPlugin(ScrollTrigger);

const Section5_Concept = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      const introText = section.querySelector('.intro-text');
      const houseNode = section.querySelector('.node-house');
      const norskAsNode = section.querySelector('.node-norsk-as');
      const holdingNode = section.querySelector('.node-holding');
      const unknownNode = section.querySelector('.node-unknown');
      const line1 = section.querySelector('.connection-line.line-1');
      const line2 = section.querySelector('.connection-line.line-2');
      const line3 = section.querySelector('.connection-line.line-3');
      const statText = section.querySelector('.stat-text');

      if (!houseNode) return;

      // Set initial states
      gsap.set(introText, { opacity: 1 });
      gsap.set(houseNode, { opacity: 1, scale: 1 });
      gsap.set(norskAsNode, { opacity: 0, scale: 0.8, y: 20 });
      gsap.set(holdingNode, { opacity: 0, scale: 0.8, y: 20 });
      gsap.set(unknownNode, { opacity: 0, scale: 0.8, y: 20 });
      gsap.set(line1, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(line2, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(line3, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(statText, { opacity: 0, y: 20 });

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

      // 1. START: Only house visible, intro text
      // (Already set)

      // 2. SCROLL 20%: Reveal 'Norsk AS' and draw line
      tl.to(
        norskAsNode,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2, // 20% of scroll
          ease: 'back.out(1.7)',
        },
        0.2
      );

      tl.to(
        line1,
        {
          scaleY: 1,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.25
      );

      // 3. SCROLL 40%: Reveal 'Utenlandsk Holding' and draw line
      tl.to(
        holdingNode,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2, // 20% of scroll (40%)
          ease: 'back.out(1.7)',
        },
        0.4
      );

      tl.to(
        line2,
        {
          scaleY: 1,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.45
      );

      // 4. SCROLL 60%: Reveal '???' with pulse/glow
      tl.to(
        unknownNode,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2, // 20% of scroll (60%)
          ease: 'back.out(1.7)',
        },
        0.6
      );

      tl.to(
        line3,
        {
          scaleY: 1,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.65
      );

      // Add pulsing animation to unknown node
      tl.to(
        unknownNode,
        {
          scale: 1.1,
          duration: 0.1,
          ease: 'power2.inOut',
          repeat: 1,
          yoyo: true,
        },
        0.7
      );

      // 5. SCROLL 80%: Show statistic text
      tl.to(
        introText,
        {
          opacity: 0,
          duration: 0.1,
          ease: 'power2.in',
        },
        0.75
      );

      tl.to(
        statText,
        {
          opacity: 1,
          y: 0,
          duration: 0.2, // 20% of scroll (80%)
          ease: 'power2.out',
        },
        0.8
      );

      // 6. SCROLL 100%: Unpin (handled by ScrollTrigger end)
    }, section);

    return () => {
      ctx.revert(); // Clean up all GSAP animations and ScrollTriggers
    };
  }, []);

  const transparencyStat = realEstateData.transparency_issues.consequence;
  const mainProblem = realEstateData.transparency_issues.main_problem;

  return (
    <section ref={sectionRef} className="section-concept">
      <div className="concept-container">
        <div className="intro-text">
          I Norge er {mainProblem.toLowerCase()}...
        </div>

        <div className="ownership-chain">
          {/* Unknown Owner (Top) */}
          <div className="node node-unknown">
            <div className="node-icon">❓</div>
            <div className="node-label">???</div>
            <div className="node-subtitle">Ukjent eier</div>
          </div>
          <svg className="connection-line line-3" viewBox="0 0 4 100" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="100" stroke="#e53e3e" strokeWidth="2" strokeDasharray="4,4" />
          </svg>

          {/* Utenlandsk Holding */}
          <div className="node node-holding">
            <div className="node-icon">🏢</div>
            <div className="node-label">Utenlandsk Holding</div>
            <div className="node-subtitle">Luxembourg / Cayman</div>
          </div>
          <svg className="connection-line line-2" viewBox="0 0 4 100" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="100" stroke="#718096" strokeWidth="2" strokeDasharray="4,4" />
          </svg>

          {/* Norsk AS */}
          <div className="node node-norsk-as">
            <div className="node-icon">📄</div>
            <div className="node-label">Norsk AS</div>
            <div className="node-subtitle">Shell-selskap</div>
          </div>
          <svg className="connection-line line-1" viewBox="0 0 4 100" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="100" stroke="#718096" strokeWidth="2" strokeDasharray="4,4" />
          </svg>

          {/* Norsk Eiendom (Bottom) */}
          <div className="node node-house">
            <div className="node-icon">🏠</div>
            <div className="node-label">Norsk Eiendom</div>
            <div className="node-subtitle">Oslo</div>
          </div>
        </div>

        <div className="stat-text">
          {transparencyStat}
        </div>
      </div>
    </section>
  );
};

export default Section5_Concept;

