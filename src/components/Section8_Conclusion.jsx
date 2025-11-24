import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Section8_Conclusion.css';

gsap.registerPlugin(ScrollTrigger);

const Section8_Conclusion = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const background = section.querySelector('.conclusion-background');
      const text1 = section.querySelector('.narrative-text-1');
      const text2 = section.querySelector('.narrative-text-2');
      const headline = section.querySelector('.conclusion-headline');
      const subtext = section.querySelector('.conclusion-subtext');

      if (!background) return;

      // Set initial states
      gsap.set(background, { scale: 1.2, y: 0 }); // Start zoomed in for parallax effect
      gsap.set([text1, text2, headline, subtext], { opacity: 0, y: 30 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%', // 150vh scroll distance
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect: Background moves slower than scroll
      tl.to(
        background,
        {
          scale: 1,
          y: -100,
          duration: 1,
          ease: 'none',
        },
        0
      );

      // Staggered text fade-in
      tl.to(
        text1,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.1
      );

      tl.to(
        text2,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.3
      );

      tl.to(
        headline,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.5
      );

      tl.to(
        subtext,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.7
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-conclusion">
      <div className="conclusion-background">
        <div className="background-overlay"></div>
        {/* Placeholder for aerial view - can be replaced with actual image */}
        <div className="background-image-placeholder">
          <svg viewBox="0 0 1920 1080" className="background-svg">
            <defs>
              <linearGradient id="duskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="50%" stopColor="#16213e" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#duskGradient)" />
            {/* Simplified representation of landscape/cityscape */}
            <polygon points="0,800 200,700 400,750 600,680 800,720 1000,650 1200,700 1400,680 1600,720 1800,700 1920,750 1920,1080 0,1080" fill="#0a0a0f" opacity="0.6" />
            <circle cx="960" cy="400" r="150" fill="#fbbf24" opacity="0.3" />
            <circle cx="960" cy="400" r="100" fill="#f59e0b" opacity="0.2" />
          </svg>
        </div>
      </div>

      <div className="conclusion-content">
        <div className="narrative-overlay">
          <p className="narrative-text-1">
            Vi vet hvem som eier bilen din. Vi vet hvem som eier aksjene dine.
          </p>
          <p className="narrative-text-2">
            Men Norges mest verdifulle ressurs er fortsatt en hemmelighet.
          </p>
          <h1 className="conclusion-headline">HVEM EIER NORGE?</h1>
          <p className="conclusion-subtext">
            Spørsmålet blir stående ubesvart. Inntil vi bestemmer oss for å vite.
          </p>
        </div>
      </div>

      <footer className="conclusion-footer">
        <div className="footer-content">
          <div className="footer-credit">
            <p>En scrollytelling-produksjon basert på åpne kilder.</p>
          </div>
          <div className="footer-sources">
            <p className="footer-label">Kilder og metode:</p>
            <ul className="sources-list">
              <li>
                <a
                  href="https://www.taxobservatory.eu/www-site/uploads/2022/12/EU-Tax-Observatory_WP8_ForeignOwners-NorwegianRealEstate_December2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EU Tax Observatory: Foreign Ownership of Norwegian Real Estate (2022)
                </a>
              </li>
              <li>
                <a
                  href="https://www.ssb.no/bygg-bolig-og-eiendom/artikler-og-publikasjoner/nesten-alle-hytter-pa-norske-hender"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SSB: Nesten alle hytter på norske hender (2017)
                </a>
              </li>
              <li>
                <a
                  href="https://www.transparency.no/publikasjonerverkty/beneficial-ownership-transparency-in-norway-real-estate-as-a-safe-haven-for-money-laundering"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Transparency International: Who Owns Oslo? (2021)
                </a>
              </li>
              <li>
                <a
                  href="https://www.tv2.no/nyheter/innenriks/rekordmange-utlendinger-kjoper-i-norge/17591801/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TV2: Rekordmange utlendinger kjøper i Norge (2025)
                </a>
              </li>
              <li>
                <a
                  href="https://www.regjeringen.no/no/aktuelt/kartlegging-eierskapsopplysninger/id3023024/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Regjeringen/Kartverket: Kartlegging av eierskap (2024)
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-disclaimer">
            <p className="footer-label">Fotnote:</p>
            <p>
              Tall for boligeierskap er basert på EU Tax Observatorys rapport fra 2022. Tall for
              hyttemarkedet er hentet fra Prognosesenteret (2025).
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Section8_Conclusion;

