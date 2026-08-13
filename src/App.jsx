import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

/*
  SUPERCHUCHES WEB v1.5
  --------------------
  Estructura congelada según el plan maestro aprobado.

  Assets nuevos esperados (puedes cambiar las rutas aquí sin tocar el layout):
  - /images/hero/hero-luna-mega.jpg
  - /images/teaser/teaser-thumb.jpg
  - /images/world/park-normal.png
  - /images/world/park-luna.png
  - /images/renders/mega-peeking.png
  - /images/renders/mega-render.png
  - /images/renders/giga-render.png
  - /images/renders/moustache-render.png
  - /images/renders/micro-render.png
  - /images/renders/sol-render.png
  - /images/renders/pencil-render.png
  - /images/renders/mandarina-render.png
  - /images/renders/chinchilla-render.png
  - /images/renders/tcho-render.png

  Loops WebM con alpha disponibles ahora:
  - /videos/characters/mega-loop.webm
  - /videos/characters/giga-loop.webm
  - /videos/characters/moustache-loop.webm
  - /videos/characters/mandarina-loop.webm
  - /videos/characters/micro-loop.webm
  - /videos/characters/pencil-loop.webm
  - /videos/characters/acuarela-loop.webm
  - /videos/characters/sol-loop.webm
  - /videos/characters/tcho-loop.webm

  Si un personaje no tiene `loopSrc`, se usa automáticamente su PNG.
*/

const images = {
  logo: "/images/superchuches-logo.png",
  heroFinal: "/images/hero/hero-luna-mega.jpg",
  heroFallback: "/images/renders/hero-cover-2-render.png",
  teaserThumb: "/images/teaser/teaser-thumb.jpg",
  megaPeeking: "/images/renders/mega-peeking.png",
  megaRoster: "/images/renders/mega-render.png",

  parkNormal: "/images/world/park-normal.png",
  parkLuna: "/images/world/park-luna.png",

  giga: "/images/renders/giga-render.png",
  micro: "/images/renders/micro-render.png",
  moustache: "/images/renders/moustache-render.png",
  sol: "/images/renders/sol-render.png",
  pencil: "/images/renders/pencil-render.png",
  mandarina: "/images/renders/mandarina-render.png",
  chinchilla: "/images/renders/chinchilla-render.png",
  tcho: "/images/renders/tcho-render.png",

  luna: "/images/renders/luna-render.png",
  hero1: "/images/hero-cover-1.jpg",
  hero2: "/images/hero-cover-2.jpg",
  characterSheet: "/images/character-sheet.jpg",

  gallery: [
    "/images/gallery/renders/gallery-bunny-render.png",
    "/images/gallery/renders/gallery-owl-render.png",
    "/images/gallery/renders/gallery-pistacho-render.png",
    "/images/gallery/renders/gallery-pilot-render.png",
    "/images/gallery/renders/gallery-snake-render.png",
    "/images/gallery/renders/gallery-vainilla-render.png",
    "/images/gallery/renders/gallery-moustache-render.png",
  ],
};

const YOUTUBE_CHANNEL = "https://www.youtube.com/@SuperChuches";
const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed/pY-mcjJnJcY";
const INSTAGRAM_AGUAVIVA = "https://www.instagram.com/aguavivaanim";
const TIKTOK_SUPERCHUCHES = "https://www.tiktok.com/@superchuchesanim";

const copy = {
  es: {
    nav: ["Descubrir", "Personajes", "Universo", "Serie + Film", "Industria"],
    heroOverline: "UNA IP ORIGINAL DE AGUAVIVA ANIMATION",
    heroTitle: "Hay un mundo que siempre ha estado ahí",
    heroSubtitle: "La creatividad cobra vida",
    heroPrimary: "Ver teaser",
    heroSecondary: "Descubrir",
    heroMeta: "Serie · Film · Universo transmedia",
    heroYoutube: "Disponible en YouTube",

    whisperA: "Algo está cambiando",
    whisperB: "Solo tienes que aprender a verlo",

    teaserKicker: "DESCÚBRELAS",
    teaserTitle: "La magia acaba de empezar",
    teaserMeta: "TEASER OFICIAL · 2026",
    teaserPlay: "Reproducir teaser",

    whatKicker: "EL UNIVERSO",
    whatTitle: "¿Qué son las SuperChuches?",
    whatText:
      "Las inspiraciones artísticas son criaturas mágicas que viven ocultas entre nosotros y ayudan a cada humano a descubrir su talento creativo.",
    whatText2:
      "Luna puede verlas. Para el resto del mundo, casi siempre pasan desapercibidas.",

    premise: [
      "LA CREATIVIDAD",
      "COBRA VIDA",
      "PERO TAMBIÉN EXISTE EL MIEDO",
      "Y TRATARÁ DE APAGARLA",
    ],

    charactersKicker: "CONOCE A LAS SUPERCHUCHES",
    charactersTitle: "Cada inspiración tiene su propia forma",
    characterInspirationLabel: "Inspiración",
    characterTraitsLabel: "Personalidad",

    worldKicker: "EL MUNDO SUPERCHUCHES",
    worldTitle: "Un universo escondido a simple vista",
    worldText:
      "La escena no cambia. Lo que cambia es quién puede ver lo que siempre estuvo allí.",
    lunaButton: "Ver como Luna",
    normalButton: "Volver al mundo normal",
    compareHint: "Mueve el cursor para ver como Luna",

    seriesFilmKicker: "AHORA / MAÑANA",
    seriesFilmTitle: "La serie abre la puerta. El largometraje expande el mundo",
    now: "AHORA",
    series: "LA SERIE",
    world: "EL MUNDO",
    tomorrow: "MAÑANA",
    film: "EL LARGOMETRAJE",
    seriesText:
      "El formato short-form permite construir audiencia, validar tono y desarrollar la relación con los personajes.",
    filmText:
      "El largometraje lleva el mismo universo a una escala emocional y cinematográfica mayor.",
    seriesMeta: ["Short-form", "YouTube", "ES / EN"],
    filmMeta: ["Largometraje", "Worldbuilding", "Expansión"],
    seriesVisualLabel: "Descubrir a los personajes",
    filmVisualLabel: "El universo crece",

    galleryKicker: "GALERÍA",
    galleryTitle: "Un mundo lleno de pequeños detalles",

    industryKicker: "INFORMACIÓN PARA INDUSTRIA",
    industryTitle: "Información para profesionales",
    industryIntro:
      "Formato, estrategia, expansión y vías de colaboración para productores, distribuidores, plataformas y posibles partners.",
    industrySections: [
      {
        title: "Formato y audiencia",
        body: "90 episodios planteados · 20 segundos · target 4–7 · ventana inicial en YouTube · audio ES/EN.",
      },
      {
        title: "Estrategia de crecimiento",
        body: "Serie short-form como punto de entrada, construcción de comunidad, validación de personajes y tono, y expansión posterior de la IP.",
      },
      {
        title: "Serie → Largometraje",
        body: "La serie desarrolla audiencia y universo; el largometraje amplía el worldbuilding, la emoción y el posicionamiento de la propiedad.",
      },
      {
        title: "Licensing, merchandising y dossier",
        body: "SuperChuches está concebida para crecer hacia productos, licensing y nuevas extensiones del universo. El dossier profesional está disponible bajo solicitud a Aguaviva Animation.",
      },
    ],

    footerClaim: "La creatividad cobra vida.",
    footerOriginal: "Una creación original de Aguaviva Animation",
    contact: "Contacto",
  },
  en: {
    nav: ["Discover", "Characters", "World", "Series + Film", "Industry"],
    heroOverline: "AN ORIGINAL IP BY AGUAVIVA ANIMATION",
    heroTitle: "There is a world that has always been there",
    heroSubtitle: "Creativity comes to life",
    heroPrimary: "Watch teaser",
    heroSecondary: "Discover",
    heroMeta: "Series · Film · Transmedia universe",
    heroYoutube: "Available on YouTube",

    whisperA: "Something is changing",
    whisperB: "You only have to learn how to see it",

    teaserKicker: "MEET THEM",
    teaserTitle: "The magic has only just begun",
    teaserMeta: "TEASER OFICIAL · 2026",
    teaserPlay: "Play teaser",

    whatKicker: "THE UNIVERSE",
    whatTitle: "What are the SuperChuches?",
    whatText:
      "Artistic inspirations are magical creatures hidden among us, helping each human discover their creative talent.",
    whatText2:
      "Luna can see them. For everyone else, they almost always go unnoticed.",

    premise: [
      "CREATIVITY",
      "COMES TO LIFE",
      "BUT FEAR ALSO EXISTS",
      "AND IT WILL TRY TO PUT IT OUT",
    ],

    charactersKicker: "MEET THE SUPERCHUCHES",
    charactersTitle: "Every inspiration takes a different shape",
    characterInspirationLabel: "Inspiration",
    characterTraitsLabel: "Personality",

    worldKicker: "THE SUPERCHUCHES WORLD",
    worldTitle: "A universe hidden in plain sight",
    worldText:
      "The scene does not change. What changes is who can see what has always been there.",
    lunaButton: "See as Luna",
    normalButton: "Return to normal world",
    compareHint: "Move the cursor to see as Luna",

    seriesFilmKicker: "NOW / NEXT",
    seriesFilmTitle: "The series opens the door. The feature film expands the world",
    now: "NOW",
    series: "THE SERIES",
    world: "THE WORLD",
    tomorrow: "NEXT",
    film: "THE FEATURE FILM",
    seriesText:
      "Short-form builds audience, validates tone and develops the relationship with the characters.",
    filmText:
      "The feature film takes the same universe to a larger emotional and cinematic scale.",
    seriesMeta: ["Short-form", "YouTube", "ES / EN"],
    filmMeta: ["Feature film", "Worldbuilding", "Expansion"],
    seriesVisualLabel: "Meet the characters",
    filmVisualLabel: "The universe grows",

    galleryKicker: "GALLERY",
    galleryTitle: "A world full of small details",

    industryKicker: "INDUSTRY INFORMATION",
    industryTitle: "Information for industry professionals",
    industryIntro:
      "Format, strategy, expansion and collaboration routes for producers, distributors, platforms and potential partners.",
    industrySections: [
      {
        title: "Format and audience",
        body: "90 planned episodes · 20 seconds · target 4–7 · initial YouTube window · ES/EN audio.",
      },
      {
        title: "Growth strategy",
        body: "Short-form series as the entry point, community building, character and tone validation, followed by IP expansion.",
      },
      {
        title: "Series → Feature Film",
        body: "The series develops audience and universe; the feature film expands worldbuilding, emotion and positioning.",
      },
      {
        title: "Licensing, merchandising and dossier",
        body: "SuperChuches is designed to expand into products, licensing and new extensions of the universe. The professional dossier is available upon request from Aguaviva Animation.",
      },
    ],

    footerClaim: "Creativity comes to life.",
    footerOriginal: "An original creation by Aguaviva Animation",
    contact: "Contact",
  },
};

const loops = {
  mega: "/videos/characters/mega-loop.webm",
  giga: "/videos/characters/giga-loop.webm",
  moustache: "/videos/characters/moustache-loop.webm",
  mandarina: "/videos/characters/mandarina-loop.webm",
  micro: "/videos/characters/micro-loop.webm",
  pencil: "/videos/characters/pencil-loop.webm",
  acuarela: "/videos/characters/acuarela-loop.webm",
  sol: "/videos/characters/sol-loop.webm",
  tcho: "/videos/characters/tcho-loop.webm",
};

const characterBase = [
  {
    name: "Mega",
    image: images.megaRoster,
    loopSrc: loops.mega,
    profile: {
      es: { type: "Superchuche · Inspiración de literatura fantástica", traits: ["Curiosa", "Cariñosa", "Caótica"] },
      en: { type: "Superchuche · Fantasy literature inspiration", traits: ["Curious", "Affectionate", "Chaotic"] },
    },
  },
  {
    name: "Giga",
    image: images.giga,
    loopSrc: loops.giga,
    profile: {
      es: { type: "Superchuche · Inspiración de literatura romántica", traits: ["Entusiasta", "Comprensivo", "Hablador"] },
      en: { type: "Superchuche · Romance literature inspiration", traits: ["Enthusiastic", "Understanding", "Talkative"] },
    },
  },
  {
    name: "Moustache",
    image: images.moustache,
    loopSrc: loops.moustache,
    profile: {
      es: { type: "Chuchicornio · Inspiración de artes plásticas", traits: ["Protectora", "Empática", "Cabezota"] },
      en: { type: "Chuchicornio · Visual arts inspiration", traits: ["Protective", "Empathetic", "Stubborn"] },
    },
  },
  {
    name: "Micro",
    image: images.micro,
    loopSrc: loops.micro,
    profile: {
      es: { type: "Superchuche · Inspiración de literatura de terror", traits: ["Adorable", "Juguetón", "Temerario"] },
      en: { type: "Superchuche · Horror literature inspiration", traits: ["Adorable", "Playful", "Fearless"] },
    },
  },
  {
    name: "Sol",
    image: images.sol,
    loopSrc: loops.sol,
    profile: {
      es: { type: "Chachiyeti · Inspiración de cantantes", traits: ["Tímido", "Encantador", "Leal"] },
      en: { type: "Chachiyeti · Singers inspiration", traits: ["Shy", "Charming", "Loyal"] },
    },
  },
  {
    name: "Pencil",
    image: images.pencil,
    loopSrc: loops.pencil,
    profile: {
      es: { type: "Chuchicornio · Inspiración de artes plásticas", traits: ["Observador", "Curioso", "Ingenioso"] },
      en: { type: "Chuchicornio · Visual arts inspiration", traits: ["Observant", "Curious", "Inventive"] },
    },
  },
  {
    name: "Mandarina",
    image: images.mandarina,
    loopSrc: loops.mandarina,
    profile: {
      es: { type: "Cholote · Inspiración actoral", traits: ["Amigable", "Extrovertido", "Torpe"] },
      en: { type: "Cholote · Acting inspiration", traits: ["Friendly", "Outgoing", "Clumsy"] },
    },
  },
  {
    name: "Acuarela",
    image: images.chinchilla,
    loopSrc: loops.acuarela,
    profile: {
      es: { type: "Chuchicornio · Inspiración artesanal", traits: ["Divertida", "Enérgica", "Asustadiza"] },
      en: { type: "Chuchicornio · Craft inspiration", traits: ["Fun", "Energetic", "Easily scared"] },
    },
  },
  {
    name: "T-Cho",
    image: images.tcho,
    loopSrc: loops.tcho,
    profile: {
      es: { type: "Antiinspiración · Roba inspiraciones por medio del miedo", traits: ["Inteligente", "Malvado", "Egoísta"] },
      en: { type: "Anti-inspiration · Steals inspiration through fear", traits: ["Intelligent", "Evil", "Selfish"] },
    },
  },
];

function SafeImage({ src, fallback, alt = "", className = "", ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback && currentSrc !== fallback) setCurrentSrc(fallback);
      }}
      {...props}
    />
  );
}

function CharacterMedia({ character }) {
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [character.name, character.loopSrc]);

  if (character.loopSrc && !videoFailed) {
    return (
      <video
        key={character.loopSrc}
        className="character-media character-loop"
        src={character.loopSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label={`${character.name} animation loop`}
        onLoadedData={(event) => event.currentTarget.play().catch(() => {})}
        onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return <SafeImage className="character-media" src={character.image} alt={character.name} />;
}

function CharacterCarousel({ t, lang }) {
  const [active, setActive] = useState(0);
  const character = characterBase[active];

  const move = (dir) => {
    setActive((prev) => (prev + dir + characterBase.length) % characterBase.length);
  };

  return (
    <section id="personajes" className="character-section section-pad">
      <div className="section-shell character-shell">
        <div className="section-heading character-heading">
          <div>
            <div className="section-kicker">{t.charactersKicker}</div>
            <h2>{t.charactersTitle}</h2>
          </div>
          <div className="character-count">
            {String(active + 1).padStart(2, "0")} / {String(characterBase.length).padStart(2, "0")}
          </div>
        </div>

        <div className="character-editorial">
          <div className="character-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={character.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                <div className="character-name">{character.name}</div>

                <div className="character-profile">
                  <div className="character-profile-row">
                    <span className="character-profile-label">{t.characterInspirationLabel}</span>
                    <p className="character-type">{character.profile[lang].type}</p>
                  </div>

                  <div className="character-profile-row">
                    <span className="character-profile-label">{t.characterTraitsLabel}</span>
                    <div className="character-traits" aria-label={t.characterTraitsLabel}>
                      {character.profile[lang].traits.map((trait) => (
                        <span key={trait}>{trait}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="character-nav">
              <button type="button" onClick={() => move(-1)} aria-label="Anterior">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Siguiente">→</button>
            </div>
          </div>

          <div className={`character-art character-art-${active % 5}`}>
            <div className="character-blob" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={character.name}
                className="character-media-wrap"
                initial={{ opacity: 0, x: 22, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -18, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CharacterMedia character={character} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldReveal({ t }) {
  const frameRef = useRef(null);
  const [revealing, setRevealing] = useState(false);

  const updateReveal = (event) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));

    frame.style.setProperty("--reveal-x", `${x}%`);
    frame.style.setProperty("--reveal-y", `${y}%`);
    setRevealing(true);
  };

  const hideReveal = (event) => {
    if (!event || event.pointerType !== "touch") setRevealing(false);
  };

  return (
    <section id="universo" className="world-section section-pad">
      <div className="section-shell">
        <div className="world-heading">
          <div className="section-kicker light">{t.worldKicker}</div>
          <h2>{t.worldTitle}</h2>
          <p>{t.worldText}</p>
        </div>

        <div
          ref={frameRef}
          className={`world-frame world-hover-reveal ${revealing ? "is-revealing" : ""}`}
          onPointerEnter={updateReveal}
          onPointerMove={updateReveal}
          onPointerLeave={hideReveal}
          onPointerDown={updateReveal}
          onPointerUp={(event) => {
            if (event.pointerType === "touch") setRevealing(false);
          }}
        >
          <SafeImage
            src={images.parkNormal}
            fallback="/images/comparison.png"
            alt="Parque del Molino"
            className="world-image world-normal"
          />

          <div className="world-magic-reveal" aria-hidden={!revealing}>
            <SafeImage
              src={images.parkLuna}
              fallback="/images/comparison.png"
              alt="Parque del Molino visto por Luna"
              className="world-image world-magic"
            />
          </div>

          <div className="world-reveal-ring" aria-hidden="true" />
          <div className="world-reveal-hint">
            <span>✦</span> {t.compareHint}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeaserSection({ t }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="teaser" className="teaser-section section-pad">
      <div className="teaser-ambient" aria-hidden="true">
        <SafeImage src={images.teaserThumb} fallback={images.heroFallback} alt="" />
      </div>

      <div className="section-shell teaser-shell">
        <div className="teaser-copy">
          <div className="section-kicker light">{t.teaserKicker}</div>
          <h2>{t.teaserTitle}</h2>
        </div>

        <div className="teaser-card">
          {playing ? (
            <iframe
              src={`${YOUTUBE_EMBED}?autoplay=1&rel=0`}
              title="SuperChuches Official Teaser"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button type="button" className="teaser-poster" onClick={() => setPlaying(true)}>
              <SafeImage src={images.teaserThumb} fallback={images.heroFallback} alt="SuperChuches teaser" />
              <span className="teaser-play" aria-hidden="true">▶</span>
              <span className="sr-only">{t.teaserPlay}</span>
            </button>
          )}
        </div>

        <div className="teaser-meta-row">
          <span>{t.teaserMeta}</span>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">YouTube ↗</a>
        </div>
      </div>
    </section>
  );
}

function Gallery({ t }) {
  return (
    <section id="galeria" className="gallery-editorial section-pad">
      <div className="section-shell">
        <div className="section-heading">
          <div className="section-kicker">{t.galleryKicker}</div>
          <h2>{t.galleryTitle}</h2>
        </div>

        <div className="masonry-gallery">
          {images.gallery.map((src, index) => (
            <a className={`masonry-item item-${index % 5}`} href={src} target="_blank" rel="noreferrer" key={src}>
              <SafeImage src={src} alt={`SuperChuches ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustrySection({ t }) {
  return (
    <section id="industria" className="industry-section section-pad">
      <div className="section-shell industry-shell">
        <div className="industry-intro">
          <div className="section-kicker">{t.industryKicker}</div>
          <h2>{t.industryTitle}</h2>
          <p>{t.industryIntro}</p>
        </div>

        <div className="industry-accordion">
          {t.industrySections.map((item, index) => (
            <details key={item.title} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </summary>
              <p>{item.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [showIntro, setShowIntro] = useState(true);
  const [headerSolid, setHeaderSolid] = useState(false);
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const timeout = window.setTimeout(() => setShowIntro(false), reduced ? 150 : 950);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sc-site">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="brand-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
            transition={{ duration: 0.45 }}
          >
            <div className="intro-spark">✦</div>
            <SafeImage src={images.logo} alt="SuperChuches" className="intro-logo" />
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`site-header ${headerSolid ? "solid" : ""}`}>
        <a className="brand-link" href="#top" aria-label="SuperChuches">
          <SafeImage src={images.logo} alt="SuperChuches" className="brand-logo" />
        </a>

        <nav className="site-nav" aria-label="Principal">
          <a href="#descubrir">{t.nav[0]}</a>
          <a href="#personajes">{t.nav[1]}</a>
          <a href="#universo">{t.nav[2]}</a>
          <a href="#serie-film">{t.nav[3]}</a>
          <a href="#industria">{t.nav[4]}</a>
        </nav>

        <div className="lang-switch">
          <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-v15">
          <div className="hero-image-wrap">
            <SafeImage
              src={images.heroFinal}
              fallback={images.heroFallback}
              alt="Luna y Mega"
              className="hero-main-image"
            />
            <div className="hero-shade" />
          </div>

          <div className="hero-content section-shell">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <div className="hero-overline">{t.heroOverline}</div>
              <SafeImage src={images.logo} alt="" aria-hidden="true" className="hero-logo" />
              <h1>{t.heroTitle}</h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>

              <div className="hero-actions">
                <a href="#teaser" className="button button-primary">▶ {t.heroPrimary}</a>
                <a href="#descubrir" className="button button-ghost">{t.heroSecondary} ↓</a>
              </div>

              <div className="hero-meta">
                <span>{t.heroMeta}</span>
                <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">{t.heroYoutube} ↗</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="descubrir" className="magic-whisper section-pad">
          <div className="section-shell whisper-inner">
            <span className="magic-dot dot-1" aria-hidden="true">✦</span>
            <span className="magic-dot dot-2" aria-hidden="true">·</span>
            <span className="magic-dot dot-3" aria-hidden="true">✦</span>
            <p>{t.whisperA}</p>
            <h2>{t.whisperB}</h2>
          </div>
        </section>

        <TeaserSection t={t} />

        <section className="what-section section-pad">
          <div className="section-shell what-grid">
            <div className="what-copy">
              <div className="section-kicker">{t.whatKicker}</div>
              <h2>{t.whatTitle}</h2>
              <p>{t.whatText}</p>
              <p>{t.whatText2}</p>
            </div>

            <div className="mega-breakout">
              <div className="mega-glow" />
              <SafeImage src={images.megaPeeking} fallback={images.megaRoster} alt="Mega" />
            </div>
          </div>
        </section>

        <section className="premise-editorial">
          {t.premise.map((line, index) => (
            <div className={`premise-step premise-${index}`} key={line}>
              <motion.div
                className="section-shell"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.65 }}
              >
                <span>{line}</span>
              </motion.div>
            </div>
          ))}
        </section>

        <CharacterCarousel t={t} lang={lang} />
        <WorldReveal t={t} />

        <section id="serie-film" className="series-film section-pad">
          <div className="section-shell">
            <div className="series-film-heading">
              <div className="section-kicker">{t.seriesFilmKicker}</div>
              <h2>{t.seriesFilmTitle}</h2>
            </div>

            <div className="growth-timeline">
              <article className="timeline-card series-card">
                <div className="timeline-card-copy">
                  <span className="timeline-time">{t.now}</span>
                  <h3>{t.series}</h3>
                  <p>{t.seriesText}</p>
                  <div className="timeline-meta">
                    {t.seriesMeta.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>

                <div className="series-visual" aria-label={t.seriesVisualLabel}>
                  <div className="series-orbit" aria-hidden="true" />
                  <SafeImage src={images.luna} alt="Luna" className="series-person series-luna" />
                  <SafeImage src={images.giga} alt="Giga" className="series-person series-giga" />
                  <span className="timeline-visual-label">{t.seriesVisualLabel}</span>
                </div>
              </article>

              <div className="timeline-spine" aria-hidden="true">
                <i />
                <span>{t.world}</span>
                <i />
              </div>

              <article className="timeline-card film-card">
                <div className="timeline-card-copy">
                  <span className="timeline-time">{t.tomorrow}</span>
                  <h3>{t.film}</h3>
                  <p>{t.filmText}</p>
                  <div className="timeline-meta timeline-meta-dark">
                    {t.filmMeta.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>

                <div className="film-image">
                  <SafeImage src={images.parkLuna} fallback={images.hero1} alt="Mundo SuperChuches" />
                  <div className="film-image-shade" aria-hidden="true" />
                  <span className="timeline-visual-label film-visual-label">{t.filmVisualLabel}</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <Gallery t={t} />
        <IndustrySection t={t} />
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div>
            <SafeImage src={images.logo} alt="SuperChuches" className="footer-logo" />
            <p className="footer-claim">{t.footerClaim}</p>
          </div>

          <div className="footer-links">
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">YouTube · SuperChuches ↗</a>
            <a href={TIKTOK_SUPERCHUCHES} target="_blank" rel="noreferrer">TikTok · SuperChuches ↗</a>
            <a href={INSTAGRAM_AGUAVIVA} target="_blank" rel="noreferrer">Instagram · Aguaviva ↗</a>
            <a href="https://aguavivaanimation.com" target="_blank" rel="noreferrer">Aguaviva Animation ↗</a>
            <div className="footer-contact">
              <span>{t.contact}</span>
              <a href="mailto:info@aguavivaanimation.com">info@aguavivaanimation.com</a>
            </div>
          </div>

          <div className="footer-original">{t.footerOriginal}</div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}
