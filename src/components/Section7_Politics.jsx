import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Section7_Politics.css';

gsap.registerPlugin(ScrollTrigger);

const Section7_Politics = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector('.section-title');
      const proposals = section.querySelectorAll('.proposal-item');
      const obstacles = section.querySelectorAll('.obstacle-item');

      if (!title) return;

      // Set initial states
      gsap.set(title, { opacity: 1 });
      gsap.set(proposals, { opacity: 0, x: -50 });
      gsap.set(obstacles, { opacity: 0, x: 50 });

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

      // Scroll 10-40%: Reveal proposals one by one (staggered)
      tl.to(
        proposals,
        {
          opacity: 1,
          x: 0,
          duration: 0.3, // 30% of scroll (10-40%)
          ease: 'power2.out',
          stagger: 0.1, // 0.1s delay between each proposal
        },
        0.1 // Start at 10% of scroll
      );

      // Scroll 50-80%: Reveal obstacles (fade in with warning icons)
      tl.to(
        obstacles,
        {
          opacity: 1,
          x: 0,
          duration: 0.3, // 30% of scroll (50-80%)
          ease: 'power2.out',
          stagger: 0.15, // 0.15s delay between each obstacle
        },
        0.5 // Start at 50% of scroll
      );

      // Scroll 100%: Unpin (handled by ScrollTrigger end)
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-politics">
      <div className="politics-container">
        <h2 className="section-title">POLITIKKEN: HVORFOR SKJER INGENTING?</h2>

        <div className="content-wrapper">
          <div className="proposals-section">
            <h3 className="section-subtitle">FORSELAGENE</h3>
            <div className="proposals-list">
              <div className="proposal-item proposal-left">
                <div className="proposal-icon">🔴</div>
                <div className="proposal-content">
                  <div className="proposal-party">SV / Rødt</div>
                  <div className="proposal-position">Restriksjoner på utenlandsk eierskap</div>
                </div>
              </div>

              <div className="proposal-item proposal-right">
                <div className="proposal-icon">🔵</div>
                <div className="proposal-content">
                  <div className="proposal-party">Høyre / FrP</div>
                  <div className="proposal-position">Markedsfrihet, ingen restriksjoner</div>
                </div>
              </div>

              <div className="proposal-item proposal-center">
                <div className="proposal-icon">🔴</div>
                <div className="proposal-content">
                  <div className="proposal-party">Arbeiderpartiet</div>
                  <div className="proposal-position">Tvetydig / EU-hensyn</div>
                </div>
              </div>
            </div>
          </div>

          <div className="obstacles-section">
            <h3 className="section-subtitle">HINDRE</h3>
            <div className="obstacles-list">
              <div className="obstacle-item">
                <div className="obstacle-icon">⚠️</div>
                <div className="obstacle-content">
                  <div className="obstacle-title">EØS-avtalen</div>
                  <div className="obstacle-description">Juridisk barrierer mot restriksjoner</div>
                </div>
              </div>

              <div className="obstacle-item">
                <div className="obstacle-icon">⚠️</div>
                <div className="obstacle-content">
                  <div className="obstacle-title">Lobbyisme</div>
                  <div className="obstacle-description">Industriens press mot regulering</div>
                </div>
              </div>

              <div className="obstacle-item">
                <div className="obstacle-icon">⚠️</div>
                <div className="obstacle-content">
                  <div className="obstacle-title">Kapitalbehov</div>
                  <div className="obstacle-description">Økonomisk avhengighet av utenlandsk kapital</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section7_Politics;

