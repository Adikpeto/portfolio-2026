"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Link from "next/link";
import BezierDivider from "../components/BezierDivider";
import ParallaxImage from "../components/ParallaxImage";
import Footer from "../components/Footer";

const experiences = [
  {
    year: "Actuel",
    role: "DÉVELOPPEUR FULL STACK & MOBILE",
    company: "Ylomi - Cotonou",
    description:
      "Développement d'applications web et mobiles à fort impact avec Vue.js, React, Laravel et Flutter. Optimisation continue de l'expérience utilisateur et garantie d'une ergonomie irréprochable sur l'ensemble des plateformes.",
  },
  {
    year: "Précédent",
    role: "DÉVELOPPEUR MOBILE",
    company: "Cauris Dev - Cotonou",
    description:
      "Développement d'applications mobiles avancées avec React Native. Conception d'interfaces utilisateur ultra-fluides, intégration d'APIs complexes et mise en place de tests poussés pour garantir une fiabilité et une stabilité optimales en production.",
  },
  {
    year: "Précédent",
    role: "DÉVELOPPEUR FULL-STACK",
    company: "KRYPTAPAY - Cotonou",
    description:
      "Création d'une application mobile sous React Native et d'une plateforme web réactive. Conception d'une architecture backend solide et sécurisée en Node.js, validée par des tests unitaires rigoureux avec Jest.",
  },
  {
    year: "Précédent",
    role: "DÉVELOPPEUR WEB",
    company: "La Vedette Media - Cotonou",
    description:
      "Développement d’un SDK de pointe en JavaScript, TypeScript et PHP, facilitant grandement l'intégration technique et les transactions pour un agrégateur de paiement de premier plan.",
  },
  {
    year: "Précédent",
    role: "DÉVELOPPEUR WEB FULL-STACK",
    company: "TIC Agro Business Center - Cotonou",
    description:
      "Création de A à Z d'une plateforme e-commerce agricole. Architecture de l'interface dynamique sous Next.js et gestion performante des bases de données temps réel via Firebase.",
  }
];

const skills = [
  {
    category: "FRONT-END & MOBILE",
    items: ["React & JavaScript", "Angular, TypeScript", "Flutter, React Native", "Apache Cordova", "Vue.js", "Electron"],
  },
  {
    category: "BACK-END & DONNÉES",
    items: ["Node.js, Express", "Laravel, PHP", "Prisma", "SQL", "Firebase", "Jest"],
  },
  {
    category: "ATOUTS & DIPLÔMES",
    items: ["Polyvalence Full-Stack", "Résolution de problèmes", "Conception & Architecture", "Licence Professionnelle SIL (2022-2023)"],
  },
];

const values = [
  {
    number: "01",
    title: "Polyvalence Full-Stack",
    text: "Maîtrise de l'ensemble du cycle de développement, de la conception de l'architecture backend jusqu'à la réalisation d'interfaces fluides.",
  },
  {
    number: "02",
    title: "Résolution de problèmes",
    text: "Avide de défis techniques, j'analyse les situations complexes pour y apporter des solutions efficaces et innovantes.",
  },
  {
    number: "03",
    title: "Orientation produit",
    text: "Je mets toujours l'expérience utilisateur au centre de mes décisions, avec l'objectif de créer des produits digitaux performants et utiles.",
  },
  {
    number: "04",
    title: "Adaptabilité & Autonomie",
    text: "Je m'adapte rapidement aux nouveaux environnements et technologies pour répondre aux besoins changeants des projets.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.3,
        }
      );
    }

    // Intro animation
    if (introRef.current) {
      const elements = introRef.current.querySelectorAll(".intro-animate");
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.6,
        }
      );
    }

    // Experience timeline animation
    if (experienceRef.current) {
      const items = experienceRef.current.querySelectorAll(".experience-item");
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const cols = skillsRef.current.querySelectorAll(".skill-column");
      gsap.fromTo(
        cols,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Values animation
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll(".value-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Marquee
    if (marqueeRef.current) {
      const texts = marqueeRef.current.querySelectorAll(".marquee-text");
      gsap.to(texts, {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: "linear",
      });
    }
  }, []);

  const splitTitle = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{ display: "inline-block", perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <ReactLenis root>
      <div className="main" ref={containerRef}>
        {/* Navbar */}
        <div className="container">
          <div className="nav-bar">
            <Link href="/">
              <div className="nav-bar-logo text-black font-bold">ADIKPETO ARISTIDE</div>
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
            <Link href="/about">
              <div className="text-black text-sm">Why Me</div>
            </Link>
          </div>
        </div>

        {/* Marquee */}
        <section className="contact-marquee about-marquee">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">FULL STACK DEVELOPER — </span>
            <span className="marquee-text">MOBILE DEVELOPER — </span>
            <span className="marquee-text">PROBLEM SOLVER — </span>
            <span className="marquee-text">FULL STACK DEVELOPER — </span>
            <span className="marquee-text">MOBILE DEVELOPER — </span>
            <span className="marquee-text">PROBLEM SOLVER — </span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <div className="about-hero-grid">
              <div className="about-hero-left">
                <h1 ref={titleRef} className="contact-title about-title">
                  {splitTitle("ABOUT")}
                  <br />
                  {splitTitle("ME.")}
                </h1>
              </div>
              <div ref={introRef} className="about-hero-right">
                <p className="intro-animate about-intro-large">
                  Développeur Full Stack & Mobile passionné par la création d'expériences
                  numériques percutantes, basé à Cotonou.
                </p>
                <p className="intro-animate about-intro-text">
                  Fort d'une expertise polyvalente couvrant des technologies telles que React, Laravel,
                  Flutter, et Node.js, je conçois des applications robustes, évolutives et centrées sur
                  l'utilisateur. Orienté solutions et avide de défis techniques, je transforme vos
                  idées en produits digitaux hautement performants.
                </p>
                <p className="intro-animate about-intro-text">
                  Mon parcours m'a amené à collaborer avec diverses entreprises et startups,
                  de l'e-commerce à la fintech. Je mets un point d'honneur à allier une conception
                  d'architecture backend solide à des interfaces utilisateur ultra-fluides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Section */}
        <section className="about-photo-section">
          <div className="about-photo-wrapper">
            <ParallaxImage
              src="/lei-hwang-iuc-loTwDEs-unsplash.jpg"
              alt="About me"
              strength={0.3}
              height="60vh"
              width="80vw"
            />
          </div>
        </section>

        {/* Experience Section */}
        <section className="about-section">
          <div className="about-section-inner">
            <div className="section-header">
              <h2 className="section-title-large text-black">EXPERIENCE</h2>
              <p className="section-subtitle-text">
                A journey through roles and collaborations that shaped my expertise.
              </p>
            </div>

            <div ref={experienceRef} className="experience-timeline">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="experience-item">
                    <div className="experience-year">{exp.year}</div>
                    <div className="experience-content">
                      <h3 className="experience-role">{exp.role}</h3>
                      <p className="experience-company">{exp.company}</p>
                      <p className="experience-desc">{exp.description}</p>
                    </div>
                  </div>
                  {index < experiences.length - 1 && <BezierDivider intensity={0.6} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="about-section about-skills-section">
          <div className="about-section-inner">
            <div className="section-header">
              <h2 className="section-title-large text-black">SKILLS &<br />EXPERTISE</h2>
              <p className="section-subtitle-text">
                The tools and technologies I use daily to bring ideas to life.
              </p>
            </div>

            <div ref={skillsRef} className="skills-grid">
              {skills.map((group, index) => (
                <div key={index} className="skill-column">
                  <h3 className="skill-category">{group.category}</h3>
                  <ul className="skill-list">
                    {group.items.map((item, i) => (
                      <li key={i} className="skill-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        {/* <section className="about-section">
          <div className="about-section-inner">
            <div className="section-header">
              <h2 className="section-title-large text-black">MY PHILOSOPHY</h2>
              <p className="section-subtitle-text">
                The principles that guide every decision and every pixel.
              </p>
            </div>

            <div ref={valuesRef} className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <span className="value-number">{value.number}</span>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-text">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="cta-band">
          <div className="cta-band-inner">
            <h2 className="cta-band-title">LET&apos;S BUILD<br />SOMETHING GREAT</h2>
            <p className="cta-band-text">
              Ready to start your next project? I&apos;m just a message away.
            </p>
            <Link href="/contact" className="form-submit" style={{ display: "inline-flex", textDecoration: "none" }}>
              <span className="form-submit-text">GET IN TOUCH</span>
              <span className="form-submit-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
