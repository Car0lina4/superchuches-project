import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = {
  hero1: "/images/hero-cover-1.jpg",
  hero2: "/images/hero-cover-2.jpg",
  francisCompo: "/images/hero-cover-2.png",
  comparison: "/images/comparison.png",
  merchDisplay: "/images/merch/merch-display.jpg",
  merchSoftToys: "/images/merch/merch-soft-toys.jpg",
  mega3d: "/images/merch/mega-3d-render.png",
  chachiyeti3d: "/images/merch/chachiyeti-3d-render.png",
  chuchicornio3d: "/images/merch/chuchicornio-3d-render.png",
  characterSheet: "/images/character-sheet.jpg",
  gigaBaby: "/images/giga-baby.png",
  micro: "/images/micro.png",
  moustache: "/images/moustache.png",
  chachiyeti: "/images/chachiyeti.png",
  daniel: "/images/daniel.png",
  francis: "/images/francis.png",
  concept: "/images/scene-concept.jpg",
  sketch1: "/images/sketch-1.png",
  sketch2: "/images/sketch-2.png",
  sketch3: "/images/sketch-3.png",
  sketch4: "/images/sketch-4.png",
  sketch5: "/images/sketch-5.png",
  introChuchicornio: "/images/intro-chuchicornio.png",
  choloteModelSheet: "/images/production/cholote-model-sheet.png",
  animationTest: "/images/production/superchuches-anim.mp4",
};

const copy = {
  es: {
    introTitle: "Keep calm",
    introSubtitle: "y haz clic para descubrir la magia",
    introButton: "Entrar",

    nav: ["Proyecto", "Serie", "Largometraje", "Galería", "Contacto"],

    heroEyebrow: "Presentación visual · IP de animación",
    heroTitle: "Superchuches",
    heroSubtitle:
      "Una IP de animación infantil con un universo visual único, diseñada para crecer desde serie short-form hasta largometraje.",
    heroSupporting:
      "La serie es el punto de entrada: permite construir audiencia, validar el tono y desarrollar el universo. La película amplía el mundo y multiplica el valor de la marca.",

    ctaPrimary: "Ver serie",
    ctaSecondary: "Ver universo",

    floatingTagA: "Basado en novelas",
    floatingTagB: "Bilingüe ES/EN",

    metrics: [
      { value: "90", label: "episodios planteados" },
      { value: "20 seg", label: "duración por episodio" },
      { value: "4–7", label: "target principal" },
      { value: "YouTube", label: "ventana inicial" },
    ],

    sectionKickers: {
      project: "Proyecto",
      universe: "Universo",
      gallery: "Galería",
      highlights: "Claves",
      contact: "Contacto",
    },

    projectTitle: "Una IP con una estrategia clara de crecimiento",
    projectText:
      "Superchuches combina un universo sólido, personajes altamente reconocibles y una dirección visual con una identidad fuerte y diferencial.",
    projectText2:
      "La estrategia parte de una serie short-form como punto de entrada: un formato ágil que permite construir audiencia, validar el tono y generar conexión emocional con el público desde el primer momento.",
    projectText3:
      "A partir de esa base, el proyecto está diseñado para escalar hacia un largometraje ambientado en el mismo universo, ampliando el alcance narrativo y el valor de la IP.",
    projectText4:
      "En paralelo, Superchuches nace con una clara vocación transmedia y comercial: su diseño de personajes y mundo permite desarrollar líneas de merchandising con alto potencial, desde productos actuales hasta futuras expansiones como peluches, libros de colorear, juguetes y otros formatos dirigidos al público infantil.",
    projectGrowthLabel: "Serie · Película · Merchandising",
    projectGrowthTitle: "De contenido digital a universo de productos",

    growthKicker: "Proyección",
    growthTitle: "Escenario de crecimiento de la IP",
    growthViews: "visualizaciones",
    growthPhases: [
      {
        phase: "Fase 1",
        title: "Validación",
        metricType: "range",
        start: 1,
        end: 5,
        progress: "30%",
        text: "Lanzamiento de serie short-form para construir audiencia y validar personajes y tono.",
        time: "0–6 meses",
        art: images.micro,
      },
      {
        phase: "Fase 2",
        title: "Escalado",
        metricType: "range",
        start: 10,
        end: 50,
        progress: "65%",
        text: "Producción continua, crecimiento de comunidad y primeras pruebas de merchandising.",
        time: "6–18 meses",
        art: images.sketch4,
      },
      {
        phase: "Fase 3",
        title: "Expansión",
        metricType: "text",
        metric: "IP + Licensing",
        progress: "100%",
        text: "Desarrollo de largometraje y expansión a productos: peluches, libros de colorear y juguetes.",
        time: "18–36 meses",
        art: images.sketch2,
      },
    ],

    synopsisKicker: "Sinopsis",
    synopsisTitle: "La creatividad como aventura mágica",
    synopsisHighlight:
      "Las inspiraciones artísticas son criaturas mágicas que viven ocultas entre nosotros para ayudar a cada humano a descubrir su talento creativo.",
    synopsisText:
      "Entre ellas está Mega, una Superchuche verde especialista en novelas de fantasía, que acompaña a su humana Francis —a quien llama con cariño “la Esbirra”. Cada episodio presenta nuevas aventuras en las que Mega, Giga y otros seres como los Chuchicornios o los Chachiyetis resuelven retos inesperados.",
    synopsisText2:
      "Todo ello mientras lidian con una amenaza constante: el miedo, que intenta frenar la creatividad y apagar la imaginación. Con humor, ternura y fantasía, la serie anima a niños y niñas a confiar en su creatividad.",
    synopsisHighlights: [
      "Creatividad",
      "Humor",
      "Ternura",
      "Fantasía",
    ],

    seriesKicker: "Proyecto principal",
    seriesTitle: "Serie animada infantil para YouTube",
    seriesLead:
      "La serie es la mejor puerta de entrada: formato ágil, producción optimizada y alto potencial de memorabilidad visual.",
    seriesLead2:
      "Su planteamiento permite construir comunidad, testar personajes y tono, y convertir el universo en una propuesta con recorrido real desde una primera fase de desarrollo.",

    seriesBullets: [
      "90 episodios de 20 segundos con salida semanal.",
      "Público objetivo de 4 a 7 años.",
      "Formato diseñado para YouTube y plataformas digitales.",
      "Audio en español e inglés.",
      "Tono divertido, optimista, imaginativo y muy visual.",
      "Pipeline pensado para producción eficiente y escalable.",
    ],

    filmKicker: "Expansión de IP",
    filmTitle: "Largometraje en el mismo universo",
    filmLead:
      "La película amplía el universo, profundiza en lo emocional y eleva el posicionamiento de la IP manteniendo coherencia visual y narrativa.",

    filmBullets: [
      "Misma identidad visual y mismo universo narrativo.",
      "Mayor profundidad emocional y worldbuilding.",
      "Escala más ambiciosa en personajes y conflicto.",
      "Refuerzo estratégico del valor de la IP.",
    ],

    universeTitle: "Un universo con recorrido",
    universeText:
      "Las Superchuches nacen de la imaginación y se vinculan a distintas disciplinas creativas. Un sistema de familias, colores y funciones que construye una IP reconocible, flexible y expandible.",
    universeText2:
      "Ese planteamiento permite desarrollar nuevas criaturas, nuevas relaciones y nuevas historias sin perder identidad, abriendo la puerta a serie, largometraje y futuras extensiones del universo.",
    
    productionKicker: "Producción",
    productionTitle: "Desarrollo visual y pruebas de animación",
    productionText:
      "El proyecto cuenta con material preparado para explorar diseño de personajes, vistas de producción, materiales, paletas de color y primeras pruebas de movimiento.",

    galleryTitle: "Universo visual",
    galleryLabels: {
      storyMoment: "Momento narrativo",
      emotionalCore: "Núcleo emocional",
      characterUniverse: "Universo de personajes",
      visualIdentity: "Identidad visual",
      mainCharacter: "Personaje principal",
      supportingCharacter: "Personaje secundario",
      development: "Desarrollo",
    },

    strengthsTitle: "Claves del proyecto",
    strengths: [
      {
        title: "IP diferenciada",
        text: "Un universo propio con reglas claras y criaturas muy reconocibles.",
      },
      {
        title: "Modelo escalable",
        text: "La serie permite empezar de forma realista y crecer con recorrido.",
      },
      {
        title: "Impacto visual",
        text: "Diseño de personajes y dirección de arte con alto potencial de marca.",
      },
      {
        title: "Vocación internacional",
        text: "Proyecto bilingüe desde el inicio para facilitar pitch y partners.",
      },
    ],

    contactTitle: "Contacto",
    contactText:
      "Para solicitar dossier, hablar del desarrollo o explorar posibles colaboraciones, puedes escribir directamente aquí:",
    contactCta: "Escribir a Jorge Cáceres Hernández",
  },
  en: {
    introTitle: "Keep calm",
    introSubtitle: "and click to discover the magic",
    introButton: "Enter",

    nav: ["Project", "Series", "Film", "Gallery", "Contact"],

    heroEyebrow: "Visual presentation · animation IP",
    heroTitle: "Superchuches",
    heroSubtitle:
      "A kids animation IP with a unique visual universe, designed to grow from a short-form series into a feature film.",
    heroSupporting:
      "The series is the entry point: it builds audience, validates tone and develops the universe. The film expands the world and increases the IP’s value.",

    ctaPrimary: "View series",
    ctaSecondary: "View universe",

    floatingTagA: "Based on novels",
    floatingTagB: "Bilingual ES/EN",

    metrics: [
      { value: "90", label: "planned episodes" },
      { value: "20 sec", label: "episode length" },
      { value: "4–7", label: "core target" },
      { value: "YouTube", label: "initial window" },
    ],

    sectionKickers: {
      project: "Project",
      universe: "Universe",
      gallery: "Gallery",
      highlights: "Highlights",
      contact: "Contact",
    },

    projectTitle: "One IP with a clear growth strategy",
    projectText:
      "Superchuches combines a solid universe, highly recognizable characters and a strong, distinctive visual identity.",
    projectText2:
      "The strategy starts with a short-form series as the entry point: an agile format designed to build audience, validate tone and create emotional connection from the very beginning.",
    projectText3:
      "From that foundation, the project is designed to scale into a feature film set in the same universe, expanding both the narrative scope and the value of the IP.",
    projectText4:
      "At the same time, Superchuches has a clear transmedia and commercial direction: its character and world design can support high-potential merchandising lines, from current products to future expansions such as plush toys, coloring books, toys and other child-focused formats.",
    projectGrowthLabel: "Series · Film · Merchandising",
    projectGrowthTitle: "From digital content to product universe",

    growthKicker: "Projection",
    growthTitle: "IP growth scenario",
    growthViews: "views",
    growthPhases: [
      {
        phase: "Phase 1",
        title: "Validation",
        metricType: "range",
        start: 1,
        end: 5,
        progress: "30%",
        text: "Short-form series launch to build audience and validate characters and tone.",
        time: "0–6 months",
        art: images.micro,
      },
      {
        phase: "Phase 2",
        title: "Scale-up",
        metricType: "range",
        start: 10,
        end: 50,
        progress: "65%",
        text: "Continuous production, community growth and first merchandising tests.",
        time: "6–18 months",
        art: images.sketch4,
      },
      {
        phase: "Phase 3",
        title: "Expansion",
        metricType: "text",
        metric: "IP + Licensing",
        progress: "100%",
        text: "Feature film development and expansion into products: plush toys, coloring books and toys.",
        time: "18–36 months",
        art: images.sketch2,
      },
    ],
    
    synopsisKicker: "Synopsis",
    synopsisTitle: "Creativity as a magical adventure",
    synopsisHighlight:
      "Artistic inspirations are magical creatures hidden among us, helping each human discover their creative talent.",
    synopsisText:
      "One of them is Mega, a green Superchuche specialized in fantasy novels, who accompanies her human Francis —affectionately known as “la Esbirra”. Each episode follows new adventures where Mega, Giga and other beings such as Chuchicornios or Chachiyetis solve unexpected challenges.",
    synopsisText2:
      "All while facing a constant threat: fear, which tries to stop creativity and dim imagination. With humor, tenderness and fantasy, the series encourages children to trust their own creativity.",
    synopsisHighlights: [
      "Creativity",
      "Humor",
      "Tenderness",
      "Fantasy",
    ],

    seriesKicker: "Primary project",
    seriesTitle: "Animated kids series for YouTube",
    seriesLead:
      "The series is the strongest entry point: agile format, efficient production and strong visual memorability.",
    seriesLead2:
      "Its structure makes it possible to build community, test characters and tone, and turn the universe into a property with real long-term potential from an early stage.",

    seriesBullets: [
      "90 episodes of 20 seconds released weekly.",
      "Target audience: children aged 4 to 7.",
      "Format designed for YouTube and digital platforms.",
      "Spanish and English audio.",
      "Fun, optimistic, imaginative and highly visual tone.",
      "Production pipeline designed for efficiency and scalability.",
    ],

    filmKicker: "IP expansion",
    filmTitle: "Feature film in the same universe",
    filmLead:
      "The film expands the universe, deepens the emotional layer and elevates the IP positioning while maintaining visual and narrative coherence.",

    filmBullets: [
      "Same visual identity and narrative universe.",
      "Greater emotional depth and worldbuilding.",
      "More ambitious scale in characters and conflict.",
      "Stronger strategic value for the IP.",
    ],

    universeTitle: "A world with long-term potential",
    universeText:
      "Superchuches are born from imagination and linked to different creative disciplines. A system of families, colors and roles that creates a recognizable, flexible and expandable IP.",
    universeText2:
      "This approach makes it possible to introduce new creatures, new relationships and new stories without losing identity, opening the door to series, feature film and future universe expansion.",

    productionKicker: "Production",
    productionTitle: "Visual development and animation tests",
    productionText:
      "The project includes material to explore character design, production views, materials, color palettes and early motion tests.",

    galleryTitle: "Visual universe",
    galleryLabels: {
      storyMoment: "Story moment",
      emotionalCore: "Emotional core",
      characterUniverse: "Character universe",
      visualIdentity: "Visual identity",
      mainCharacter: "Main character",
      supportingCharacter: "Supporting character",
      development: "Development",
    },

    strengthsTitle: "Project strengths",
    strengths: [
      {
        title: "Distinctive IP",
        text: "An original universe with clear rules and highly recognizable creatures.",
      },
      {
        title: "Scalable model",
        text: "The series enables a realistic start and meaningful growth.",
      },
      {
        title: "Visual impact",
        text: "Character design and art direction with strong brand potential.",
      },
      {
        title: "International outlook",
        text: "Bilingual from the start to support pitching and partnerships.",
      },
    ],

    contactTitle: "Contact",
    contactText:
      "To request the dossier, discuss development or explore collaboration opportunities, feel free to reach out:",
    contactCta: "Email Jorge Cáceres Hernández",
  },
};

const galleryItems = [  
  {
    src: "/images/gallery/hero-cover-2.png",
    alt: "Francis y las Superchuches",
    contain: true,
    labelKey: "emotionalCore",
  },
  {
    src: "/images/gallery/visual-identity-comparison.png",
    alt: "Comparativa visual del proyecto",
    contain: true,
    labelKey: "visualIdentity",
  },
  {
    src: "/images/gallery/main-character-giga.jpg",
    alt: "Giga",
    contain: true,
    labelKey: "mainCharacter",
  },
  {
    src: "/images/gallery/supporting-character-micro.png",
    alt: "Micro",
    contain: true,
    labelKey: "supportingCharacter",
  },
  {
    src: "/images/gallery/supporting-character-moustache.png",
    alt: "Moustache",
    contain: true,
    labelKey: "supportingCharacter",
  },
  {
    src: "/images/gallery/development-sketch.png",
    alt: "Sketch de desarrollo",
    contain: true,
    labelKey: "development",
  },
  {
    src: "/images/gallery/character-universe-sheet.png",
    alt: "Carta de personajes",
    contain: false,
    labelKey: "characterUniverse",
  },
  {
    src: "/images/gallery/scene-story-moment.png",
    alt: "Escena narrativa del universo Superchuches",
    contain: false,
    labelKey: "storyMoment",
    featured: true,
  },
];

function ImageCard({ src, alt, className = "", contain = false, transparent = false }) {
  return (
    <div className={`image-card ${transparent ? "transparent-card" : ""} ${className}`}>
      <img src={src} alt={alt} className={contain ? "contain" : ""} />
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function GallerySlider({ items, t }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.8;
    trackRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="gallery-shell">
      <div className="gallery-controls">
        <button className="gallery-btn" onClick={() => scrollByAmount(-1)}>
          ←
        </button>
        <button className="gallery-btn" onClick={() => scrollByAmount(1)}>
          →
        </button>
      </div>

      <div className="gallery-track" ref={trackRef}>
        {items.map((item, index) => (
          <article
            className={`gallery-slide ${item.featured ? "featured-slide" : ""}`}
            key={`${item.src}-${index}`}
          >
            <div className="gallery-label">
              {t.galleryLabels[item.labelKey]}
            </div>

            <ImageCard
              src={item.src}
              alt={item.alt}
              contain={item.contain}
              transparent={item.contain}
              className="gallery-image"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function SynopsisPitch({ t }) {
  return (
    <section className="synopsis-pitch">
      <div className="synopsis-copy">
        <div className="section-kicker pink-text">{t.synopsisKicker}</div>
        <h2>{t.synopsisTitle}</h2>

        <p className="synopsis-highlight">{t.synopsisHighlight}</p>
        <p>{t.synopsisText}</p>
        <p>{t.synopsisText2}</p>

        <div className="synopsis-tags">
          {t.synopsisHighlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="synopsis-visual">
        <img src={images.concept} alt={t.synopsisTitle} />
      </div>
    </section>
  );
}

function ProjectGrowthVisual({ t }) {
  return (
    <div className="growth-visual">
      <div className="growth-main-photo">
        <img src={images.merchDisplay} alt="Merchandising Superchuches" />
      </div>

      <div className="growth-render growth-render-a">
        <img src={images.chuchicornio3d} alt="Chuchicornio 3D" />
      </div>

      <div className="growth-render growth-render-mega">
        <img src={images.mega3d} alt="Mega 3D" />
      </div>

      <div className="growth-render growth-render-b">
        <img src={images.chachiyeti3d} alt="Chachiyeti 3D" />
      </div>

      <div className="growth-inset-photo">
        <img src={images.merchSoftToys} alt="Peluches y merchandising" />
      </div>

      <div className="growth-caption">
        <span>{t.projectGrowthLabel}</span>
        <strong>{t.projectGrowthTitle}</strong>
      </div>
    </div>
  );
}

function AnimatedCounter({ end, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(start + (end - start) * eased);

      setValue(nextValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const t = useMemo(() => copy[lang], [lang]);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="page-shell">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(18px)",
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            
            <div className="lang-switch intro-lang-switch">
              <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>
                ES
              </button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
                EN
              </button>
            </div>

            <motion.div
              className="intro-cover-content"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >

              <img src={images.introChuchicornio} alt="Chuchicornio" />

              <div className="intro-cover-text">
                <span>{t.introTitle}</span>
                <h1>{t.introSubtitle}</h1>
                <button type="button" onClick={() => setShowIntro(false)}>
                  {t.introButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />

      <header className="site-header">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <div className="brand-title">Superchuches</div>
            <div className="brand-subtitle">Visual pitch website</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#proyecto">{t.nav[0]}</a>
          <a href="#serie">{t.nav[1]}</a>
          <a href="#peli">{t.nav[2]}</a>
          <a href="#galeria">{t.nav[3]}</a>
          <a href="#contacto">{t.nav[4]}</a>
        </nav>

        <div className="lang-switch">
          <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>
            ES
          </button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero-premium">

          <div className="hero-copy premium-copy">
            <div className="badges">
              <span className="badge">{t.heroEyebrow}</span>
              <span className="badge pink">{t.floatingTagA}</span>
              <span className="badge green">{t.floatingTagB}</span>
            </div>

            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroSubtitle}</p>
            <p className="sublead">{t.heroSupporting}</p>

            <div className="cta-row">
              <a className="button primary" href="#serie">
                {t.ctaPrimary}
              </a>
              <a className="button secondary" href="#proyecto">
                {t.ctaSecondary}
              </a>
            </div>

            <div className="metrics">
              {t.metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
            
            <div className="hero-top-concepts">
              {[images.sketch3, images.sketch1, images.sketch4].map(
                (src, i) => (
                  <motion.div
                    className={`top-concept top-concept-${i + 1}`}
                    key={src}
                    initial={{ opacity: 0, y: 18, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: [4, -2, 4],
                      scale: 1,
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: 0.1 * i },
                      scale: { duration: 0.6, delay: 0.1 * i },
                      y: {
                        duration: 4 + i * 0.35,
                        delay: 0.1 * i,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <img src={src} alt={`Concept ${i + 1}`} />
                  </motion.div>
                )
              )}
            </div>
          </div>

          <motion.div
            className="hero-stage"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="hero-characters">
              <div className="floating-card left-card">
                <img src={images.micro} alt="Micro" className="transparent-hero-img" />
              </div>

              <div className="floating-card center-card">
                <img src={images.gigaBaby} alt="Giga" className="transparent-hero-img giga-main" />
              </div>

              <div className="floating-card right-card">
                <img src={images.moustache} alt="Moustache" className="transparent-hero-img" />
              </div>
            </div>

            <div className="covers-row single-cover-row">
              <ImageCard
                src={images.francisCompo}
                alt="Francis, Mega and Giga"
                className="cover-card cover-card-large"
                contain
                transparent
              />
            </div>
          </motion.div>
        </section>

        <section id="proyecto" className="editorial-intro">
          <div className="intro-panel">
            <div className="section-kicker">
              {lang === "es" ? "Proyecto" : "Project"}
            </div>

            <h2>{t.projectTitle}</h2>

            <div className="project-strategy-text">
              <p>{t.projectText}</p>
              <p>{t.projectText2}</p>
              <p>{t.projectText3}</p>
              <p className="project-commercial-highlight">{t.projectText4}</p>
            </div>
          </div>

          <div className="intro-visual growth-visual-wrap">
            <ProjectGrowthVisual t={t} />
          </div>
        </section>

        <section className="growth-stats">
          <div className="section-kicker">{t.growthKicker}</div>
          <h2>{t.growthTitle}</h2>

          <div className="growth-stats-grid">
            {t.growthPhases.map((phase) => (
              <div className="growth-phase" key={phase.title}>
                <img src={phase.art} alt="" className="phase-bg-art" />

                <span className="phase-tag">{phase.phase}</span>
                <h3>{phase.title}</h3>

                <div className="phase-metric">
                  {phase.metricType === "range" ? (
                    <>
                      <AnimatedCounter end={phase.start} suffix="M" /> –{" "}
                      <AnimatedCounter end={phase.end} suffix="M" />
                      <span>{t.growthViews}</span>
                    </>
                  ) : (
                    phase.metric
                  )}
                </div>

                <div className="phase-progress">
                  <div
                    className="phase-progress-bar"
                    style={{ "--progress": phase.progress }}
                  />
                </div>

                <p className="phase-desc">{phase.text}</p>
                <span className="phase-time">{phase.time}</span>
              </div>
            ))}
          </div>
        </section>

        <SynopsisPitch t={t} />

        <section id="serie" className="project-block project-series premium-section">
          <div className="project-grid">
            <div className="project-copy">
              <div className="section-kicker green-text">{t.seriesKicker}</div>
              <h2>{t.seriesTitle}</h2>
              <p className="project-lead">{t.seriesLead}</p>
              <p className="project-lead secondary-lead">{t.seriesLead2}</p>
              <BulletList items={t.seriesBullets} />
            </div>

            <div className="project-visuals premium-visuals">
              <ImageCard src={images.francis} alt="Francis" contain transparent />
              <ImageCard src={images.chachiyeti} alt="Chachiyeti" contain transparent />
              <ImageCard src={images.gigaBaby} alt="Giga bebé" contain transparent />
              <ImageCard src={images.micro} alt="Micro" contain transparent />
            </div>
          </div>
        </section>

        <section id="peli" className="project-block project-film premium-section">
          <div className="project-grid reverse-grid">
            <div className="project-visuals movie-visuals">
              <ImageCard src={images.hero1} alt="Novela 1" />
              <ImageCard src={images.hero2} alt="Novela 2" />
            </div>

            <div className="project-copy">
              <div className="section-kicker pink-text">{t.filmKicker}</div>
              <h2>{t.filmTitle}</h2>
              <p className="project-lead">{t.filmLead}</p>
              <BulletList items={t.filmBullets} />
            </div>
          </div>
        </section>

        <section className="split-section universe-premium">
          <div className="panel dark big-panel">
            <div className="section-kicker">{t.sectionKickers.universe}</div>
            <h2>{t.universeTitle}</h2>
            <p>{t.universeText}</p>
            <p>{t.universeText2}</p>
          </div>

          <ImageCard src={images.characterSheet} alt="Character sheet" className="sheet-card" />
        </section>

        <section className="production-section">
          <div className="section-heading">
            <div className="section-kicker">{t.productionKicker}</div>
            <h2>{t.productionTitle}</h2>
            <p>{t.productionText}</p>
          </div>

          <div className="production-grid">
            <div className="production-card production-card-sheet">
              <img src={images.choloteModelSheet} alt="Cholote model sheet" />
            </div>

            <div className="production-card production-card-video">
              <video
                src={images.animationTest}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        <section id="galeria" className="gallery-section">
          <div className="section-heading with-copy">
            <div>
              <div className="section-kicker">{t.sectionKickers.gallery}</div>
              <h2>{t.galleryTitle}</h2>
            </div>
          </div>

          <GallerySlider items={galleryItems} t={t} />
        </section>

        <section className="strengths-section">
          <div className="section-heading">
            <div className="section-kicker">{t.sectionKickers.highlights}</div>
            <h2>{t.strengthsTitle}</h2>
          </div>

          <div className="pillar-grid">
            {t.strengths.map((pillar) => (
              <div className="pillar-card" key={pillar.title}>
                <div className="pillar-icon">✦</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <div className="contact-card">
            <div>
              <div className="section-kicker">{t.sectionKickers.contact}</div>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
            </div>

            <a className="contact-link" href="mailto:cacereshernandez.jorge@gmail.com">
              {t.contactCta}
              <span>cacereshernandez.jorge@gmail.com</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}