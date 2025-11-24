import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import realEstateData from '../data/real_estate_data.json';
import './Section4_Comparative.css';

gsap.registerPlugin(ScrollTrigger);

const Section4_Comparative = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      const headline = section.querySelector('.headline');
      const introText = section.querySelector('.intro-text');
      const cards = section.querySelectorAll('.country-card');
      const norwayCard = section.querySelector('.country-card.norge');
      const otherCards = section.querySelectorAll('.country-card:not(.norge)');

      if (!headline || !cards.length) return;

      // Set initial states
      gsap.set(headline, { opacity: 1 });
      gsap.set(introText, { opacity: 0 });
      gsap.set(norwayCard, { opacity: 1, scale: 1, filter: 'blur(0px)' });
      gsap.set(otherCards, {
        opacity: 0.3,
        scale: 0.9,
        filter: 'blur(4px)',
        x: 0,
      });

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

      // 1. SCROLL 0-20%: Intro text fades in
      tl.to(
        introText,
        {
          opacity: 1,
          duration: 0.2, // 20% of scroll
          ease: 'power2.out',
        },
        0
      );

      // 2. SCROLL 20-80%: Reveal other 3 cards one by one (staggered)
      // Each card takes ~20% of the scroll (20-40%, 40-60%, 60-80%)
      otherCards.forEach((card, index) => {
        const startPosition = 0.2 + index * 0.2; // 0.2, 0.4, 0.6
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.2, // 20% of scroll per card
            ease: 'back.out(1.7)',
          },
          startPosition
        );
      });

      // 3. SCROLL 80-100%: Emphasize contrast - scale up Norway card slightly
      tl.to(
        norwayCard,
        {
          scale: 1.05,
          duration: 0.2, // 20% of scroll (80-100%)
          ease: 'power2.out',
        },
        0.8
      );

      // Fade out intro text as cards appear
      tl.to(
        introText,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0.2
      );
    }, section);

    return () => {
      ctx.revert(); // Clean up all GSAP animations and ScrollTriggers
    };
  }, []);

  const countries = realEstateData.comparison_countries;

  const getStatusClass = (status) => {
    if (status === 'Åpent') return 'status-open';
    if (status === 'Stengt') return 'status-closed';
    if (status === 'Restriktivt' || status === 'Veldig restriktivt')
      return 'status-restrictive';
    return '';
  };

  const getStatusIcon = (status) => {
    if (status === 'Åpent') return '🔓';
    if (status === 'Stengt') return '🔒';
    return '🔒';
  };

  return (
    <section ref={sectionRef} className="section-comparative">
      <div className="comparative-container">
        <h1 className="headline">ANNERLEDESLANDET</h1>

        <div className="intro-text">
          Mens naboland stenger døren...
        </div>

        <div className="cards-grid">
          {countries.map((country, index) => (
            <div
              key={country.country}
              className={`country-card ${country.country.toLowerCase().replace(' ', '-')} ${
                country.country === 'Norge' ? 'norge' : ''
              }`}
            >
              <div className="card-header">
                <div className="country-name">{country.country}</div>
                <div className={`status-badge ${getStatusClass(country.status)}`}>
                  <span className="status-icon">{getStatusIcon(country.status)}</span>
                  <span className="status-text">{country.status}</span>
                </div>
              </div>
              <div className="card-rule">{country.rule}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4_Comparative;

