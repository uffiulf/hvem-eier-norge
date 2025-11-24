import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Section6_Consequences.css';

gsap.registerPlugin(ScrollTrigger);

const Section6_Consequences = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector('.section-title');
      const cards = section.querySelectorAll('.consequence-card');

      if (!cards.length) return;

      // Set initial states
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 50 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%', // When section top hits 60% of viewport
          end: 'top 20%',
          scrub: false, // Not scrubbed, just triggers once
          once: true, // Only animate once
          invalidateOnRefresh: true,
        },
      });

      // Animate title first
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Stagger the cards (0.2s delay between each)
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.2, // 0.2s delay between each card
        },
        '-=0.3' // Start slightly before title finishes
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-consequences">
      <div className="consequences-container">
        <h2 className="section-title">KONSEKVENSENE</h2>

        <div className="cards-grid">
          <div className="consequence-card card-housing">
            <div className="card-icon">🏠</div>
            <h3 className="card-title">BOLIGMARKEDET</h3>
            <p className="card-text">
              Høyere priser og økt konkurranse. Færre boliger til nordmenn når utenlandske kjøpere
              konkurrerer i markedet.
            </p>
          </div>

          <div className="consequence-card card-society">
            <div className="card-icon">👻</div>
            <h3 className="card-title">LOKALSAMFUNN</h3>
            <p className="card-text">
              Spøkelsesbygder oppstår når hytter står tomme 350 dager i året. Lokale samfunn mister
              liv og aktivitet.
            </p>
          </div>

          <div className="consequence-card card-economy">
            <div className="card-icon">💰</div>
            <h3 className="card-title">ØKONOMIEN</h3>
            <p className="card-text">
              Utbytte og profitt forsvinner ut av landet. Penger som kunne ha blitt investert i
              norsk økonomi flyter ut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6_Consequences;

