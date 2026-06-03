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
    year: "2024 — Present",
    role: "Freelance Creative Developer",
    company: "Self-Employed",
    description:
      "Delivering end-to-end digital experiences for brands and startups. Combining creative direction with technical implementation to build memorable web experiences.",
  },
  {
    year: "2022 — 2024",
    role: "Front-end Developer",
    company: "Creative Studio",
    description:
      "Led front-end development for award-winning digital campaigns. Built interactive experiences using Three.js, GSAP, and modern JavaScript frameworks.",
  },
  {
    year: "2021 — 2022",
    role: "UI/UX Designer & Developer",
    company: "Digital Agency",
    description:
      "Designed and developed responsive web applications for clients across fashion, tech, and lifestyle sectors. Focused on user-centered design principles.",
  },
  {
    year: "2020 — 2021",
    role: "Junior Developer",
    company: "Tech Startup",
    description:
      "Built product features, collaborated on design systems, and learned the foundations of scalable front-end architecture.",
  },
];

const skills = [
  {
    category: "DESIGN",
    items: ["UI/UX Design", "Brand Identity", "Design Systems", "Motion Design", "Figma", "Adobe Suite"],
  },
  {
    category: "DEVELOPMENT",
    items: ["React / Next.js", "Vue.js / Nuxt", "TypeScript", "Three.js / WebGL", "GSAP", "Node.js"],
  },
  {
    category: "TOOLS",
    items: ["Git / GitHub", "Vercel", "Figma", "Notion", "Jira", "VS Code"],
  },
];

const values = [
  {
    number: "01",
    title: "Craft Over Speed",
    text: "I believe in taking the time to do things right. Every detail matters — from typography to micro-interactions. Quality is never negotiable.",
  },
  {
    number: "02",
    title: "Design With Purpose",
    text: "Beautiful design is meaningless if it doesn't serve the user. Every decision I make is rooted in strategy, research, and genuine empathy for the end user.",
  },
  {
    number: "03",
    title: "Continuous Growth",
    text: "The digital landscape evolves daily. I stay curious, experiment with new technologies, and constantly push the boundaries of what's possible on the web.",
  },
  {
    number: "04",
    title: "Transparent Partnership",
    text: "I treat every project as a true collaboration. Open communication, honest feedback, and mutual respect are the foundation of great work.",
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
              <div className="nav-bar-logo text-black font-bold">Portfolio Me</div>
            </Link>
            <div className="flex flex-col">
              <Link href="/">
                <div className="text-black nav-bar-link text-sm">Work</div>
              </Link>
              <div className="text-black nav-bar-link text-sm">Portfolio</div>
              <div className="text-black nav-bar-link text-sm">Contact</div>
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

        {/* Marquee */}
        <section className="contact-marquee about-marquee">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">CREATIVE DEVELOPER — </span>
            <span className="marquee-text">DESIGNER — </span>
            <span className="marquee-text">PROBLEM SOLVER — </span>
            <span className="marquee-text">CREATIVE DEVELOPER — </span>
            <span className="marquee-text">DESIGNER — </span>
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
                  I&apos;m a creative developer based in Paris, passionate about building
                  digital experiences that are both visually stunning and technically sound.
                </p>
                <p className="intro-animate about-intro-text">
                  With over 4 years of experience in the digital space, I bridge the gap
                  between design and development. I don&apos;t just build websites — I craft
                  digital experiences that tell stories, engage users, and drive results.
                  My approach combines creative thinking with technical precision, ensuring
                  every project is not only beautiful but also performant and accessible.
                </p>
                <p className="intro-animate about-intro-text">
                  I&apos;ve had the privilege of working with ambitious brands, innovative startups,
                  and forward-thinking agencies. Each collaboration has shaped my perspective
                  and refined my craft. When I&apos;m not coding, you&apos;ll find me exploring design
                  inspiration, learning new technologies, or sketching ideas for the next big thing.
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
