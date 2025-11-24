# Det Åpne Landet: Hvem Eier Norge?

En interaktiv scrollytelling-artikkel som utforsker utenlandsk eierskap i det norske eiendomsmarkedet. Prosjektet kombinerer undersøkende journalistikk med avansert datavisualisering.

## 🌐 Live Demo

Besøk nettsiden her: **[https://uffiulf.github.io/hvem-eier-norge/](https://uffiulf.github.io/hvem-eier-norge/)**

## 🛠️ Installasjon og Kjøring

For å kjøre prosjektet lokalt på din maskin:

1. **Klon prosjektet (Pull):**
   ```bash
   git clone https://github.com/uffiulf/hvem-eier-norge.git
   cd hvem-eier-norge
   ```

2. **Installer avhengigheter:**
   ```bash
   npm install
   ```

3. **Start utviklingsserveren:**
   ```bash
   npm run dev
   ```
   Åpne lenken som vises i terminalen (vanligvis `http://localhost:5173`).

## 💻 Teknologier

- **Rammeverk:** React + Vite
- **Animasjon:** GSAP (ScrollTrigger)
- **Grafikk:** Recharts + SVG
- **Kart:** Custom SVG maps

## 📦 Build for Produksjon

For å bygge prosjektet for produksjon:

```bash
npm run build
```

Byggefilene vil bli lagret i `dist/`-mappen.

## 🚀 Deployment

Prosjektet er konfigurert for automatisk deployment til GitHub Pages via GitHub Actions. Hver gang kode pushes til `main`-branchen, bygges og deployes nettsiden automatisk.

## 📚 Kilder

Prosjektet er basert på åpne kilder fra:
- Statistisk sentralbyrå (SSB)
- EU Tax Observatory
- Transparency International Norge
- Prognosesenteret
- Kartverket

Se [Section 8](https://uffiulf.github.io/hvem-eier-norge/) for fullstendig kildeliste med lenker.

## 📄 Lisens

Dette prosjektet er en del av et akademisk arbeid ved Østfold University College.

