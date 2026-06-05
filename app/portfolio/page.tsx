"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Link from "next/link";
import ParallaxImage from "../components/ParallaxImage";
import Footer from "../components/Footer";

const projects = [
  {
    id: 1,
    title: "SHOP-COMMERCE",
    category: "Web Development",
    tags: "BRAND IDENTITY — CREATIVE DIRECTION — DIGITAL DESIGN",
    image: "/1.webp",
    year: "2026",
    description:
      "A full e-commerce platform built with Next.js featuring headless CMS integration, seamless payment processing, and sub-second load times.",
  },
  {
    id: 2,
    title: "ARTISAN STUDIO",
    category: "UI/UX Design",
    tags: "UI/UX DESIGN — MOTION DESIGN — PROTOTYPING",
    image: "/2.webp",
    year: "2025",
    description:
      "An immersive portfolio platform for artisan craftsmen, combining elegant typography with rich micro-interactions to tell each maker's story.",
  },
  {
    id: 3,
    title: "LUMINAIRE",
    category: "Creative Direction",
    tags: "CREATIVE DIRECTION — BRAND IDENTITY — ART DIRECTION",
    image: "/7.webp",
    year: "2025",
    description:
      "Complete brand overhaul for a luxury lighting company. From logo design to a fully immersive digital showroom experience.",
  },
  {
    id: 4,
    title: "NOVA FINANCE",
    category: "Web Development",
    tags: "WEB DEVELOPMENT — UI/UX DESIGN — FINTECH",
    image: "/10.webp",
    year: "2025",
    description:
      "A fintech dashboard reimagined. Real-time data visualization, fluid transitions, and an interface that makes complex finance feel intuitive.",
  },
  {
    id: 5,
    title: "TERRACOTTA",
    category: "Branding",
    tags: "BRANDING — CREATIVE DIRECTION — PACKAGING",
    image: "/6.webp",
    year: "2024",
    description:
      "Brand identity and packaging design for an organic skincare line. Earthy tones, tactile materials, and a design language rooted in nature.",
  },
  {
    id: 6,
    title: "ZENITH APP",
    category: "UI/UX Design",
    tags: "MOBILE APP — UI/UX DESIGN — MOTION DESIGN",
    image: "/9.webp",
    year: "2024",
    description:
      "A wellness app designed around mindfulness. Calm aesthetics, thoughtful animations, and an experience that promotes digital well-being.",
  },
  {
    id: 7,
    title: "ECHO RECORDS",
    category: "Creative Direction",
    tags: "CREATIVE DIRECTION — WEB DESIGN — VISUAL IDENTITY",
    image: "/3.webp",
    year: "2024",
    description:
      "Digital presence for an independent record label. A sonic-inspired visual language with interactive audio experiences woven into the design.",
  },
  {
    id: 8,
    title: "PRISM GALLERY",
    category: "Web Development",
    tags: "WEB DEVELOPMENT — THREE.JS — CREATIVE CODING",
    image: "/5.webp",
    year: "2023",
    description:
      "An online 3D art gallery leveraging WebGL and Three.js. Visitors navigate a virtual space to discover and interact with digital artworks.",
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Creative Direction", "Branding"];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter projects
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter]);

  // Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title: letter-by-letter reveal
    if (heroTitleRef.current) {
      const chars = heroTitleRef.current.querySelectorAll(".port-char");
      gsap.fromTo(
        chars,
        { y: 140, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.035,
          delay: 0.2,
        }
      );
    }

    // Hero subtitle fade
    if (heroSubRef.current) {
      gsap.fromTo(
        heroSubRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );
    }

    // Counter
    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
      );
    }

    // Filters
    if (filtersRef.current) {
      const btns = filtersRef.current.querySelectorAll(".filter-btn");
      gsap.fromTo(
        btns,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 1.1,
        }
      );
    }

    // Marquee
    if (marqueeRef.current) {
      const texts = marqueeRef.current.querySelectorAll(".marquee-text");
      gsap.to(texts, {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: "linear",
      });
    }
  }, []);

  // Animate project cards on scroll (re-run when filter changes)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Small delay to let DOM update after filter
    const timer = setTimeout(() => {
      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll(".project-card");

        cards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 80 });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && (t.trigger as HTMLElement).classList?.contains("project-card")) {
          t.kill();
        }
      });
    };
  }, [filteredProjects]);

  const splitTitle = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="port-char"
        style={{ display: "inline-block", perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <ReactLenis root>
      <div className="main" ref={containerRef}>
        {/* ─── NAVBAR ─── */}
        <div className="container">
          <div className="nav-bar">
            <Link href="/" className="nav-bar-logo text-black font-bold">
              Portfolio Me
            </Link>
            <div className="flex flex-col">
              <Link href="/">
                <div className="text-black nav-bar-link text-sm">Work</div>
              </Link>
              <Link href="/portfolio">
                <div className="text-black nav-bar-link text-sm">Portfolio</div>
              </Link>
              <Link href="/contact">
                <div className="text-black nav-bar-link text-sm">Contact</div>
              </Link>
            </div>
            <Link href="/about">
              <div className="text-black nav-bar-link text-sm">À Propos</div>
            </Link>
            <Link href="/contact">
              <div className="text-black text-sm">Contact</div>
            </Link>
            <div className="text-black text-sm">Why Me</div>
          </div>
        </div>

        {/* ─── MARQUEE ─── */}
        <section className="contact-marquee portfolio-marquee">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">SELECTED WORKS — </span>
            <span className="marquee-text">PORTFOLIO 2023–2026 — </span>
            <span className="marquee-text">CREATIVE PROJECTS — </span>
            <span className="marquee-text">SELECTED WORKS — </span>
            <span className="marquee-text">PORTFOLIO 2023–2026 — </span>
            <span className="marquee-text">CREATIVE PROJECTS — </span>
          </div>
        </section>

        {/* ─── HERO ─── */}
        <section className="portfolio-hero">
          <div className="portfolio-hero-inner">
            <div className="portfolio-hero-content">
              <h1 ref={heroTitleRef} className="contact-title portfolio-title">
                {splitTitle("SELECTED")}
                <br />
                {splitTitle("WORKS.")}
              </h1>

              <div ref={heroSubRef} className="portfolio-hero-right">
                <p className="portfolio-intro">
                  A curated collection of projects spanning brand identity, web development,
                  UI/UX design, and creative direction. Each project represents a unique
                  challenge met with passion and precision.
                </p>
              </div>
            </div>

            <div ref={counterRef} className="portfolio-counter">
              <div className="portfolio-counter-item">
                <div className="portfolio-counter-number">{projects.length}</div>
                <div className="portfolio-counter-label">Total Projects</div>
              </div>
              <div className="portfolio-counter-item">
                <div className="portfolio-counter-number">4</div>
                <div className="portfolio-counter-label">Years Experience</div>
              </div>
              <div className="portfolio-counter-item">
                <div className="portfolio-counter-number">12+</div>
                <div className="portfolio-counter-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FILTERS ─── */}
        <section className="portfolio-filters-section">
          <div ref={filtersRef} className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "filter-btn-active" : ""}`}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
                {activeFilter === cat && (
                  <span className="filter-count">
                    {cat === "All"
                      ? projects.length
                      : projects.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ─── PROJECTS GRID ─── */}
        <section className="portfolio-grid-section">
          <div ref={projectsRef} className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <Link
                href="/detail"
                key={project.id}
                className="project-card"
                style={{ opacity: 0, transform: "translateY(80px)" }}
              >
                {/* Image wrapper */}
                <div
                  className={`project-card-image-wrapper ${
                    index % 3 === 1 ? "project-card-tall" : ""
                  }`}
                >
                  <div className="project-card-image">
                    <ParallaxImage
                      src={project.image}
                      alt={project.title}
                      strength={0.2}
                      height={index % 3 === 1 ? "65vh" : "50vh"}
                      width="100%"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="project-card-overlay">
                    <div className="project-card-overlay-content">
                      <div className="project-card-overlay-tags">{project.tags}</div>
                      <div className="project-card-overlay-cta">
                        <span>VIEW PROJECT</span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div className="project-card-info">
                  <div className="project-card-meta">
                    <span className="project-card-category">{project.category}</span>
                    <span className="project-card-year">{project.year}</span>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <section className="cta-band">
          <div className="cta-band-inner">
            <h2 className="cta-band-title">
              HAVE A PROJECT
              <br />
              IN MIND?
            </h2>
            <p className="cta-band-text">
              Let&apos;s collaborate and create something extraordinary together.
            </p>
            <Link
              href="/contact"
              className="form-submit"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <span className="form-submit-text">START A PROJECT</span>
              <span className="form-submit-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </ReactLenis>
  );
}
