"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Link from "next/link";
import BezierDivider from "../components/BezierDivider";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Most projects take between 4 to 8 weeks depending on scope and complexity. I always start with a discovery phase to understand your needs, followed by design iterations and development. Rush projects can be accommodated with prior discussion.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "I specialize in modern front-end technologies including React, Next.js, Vue.js, and TypeScript. For design, I use Figma and Adobe Creative Suite. I also work with Three.js for 3D experiences, GSAP for animations, and various CMS platforms.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. I offer maintenance packages that include bug fixes, performance monitoring, content updates, and feature enhancements. I believe in long-term partnerships rather than one-off projects.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "I work on a project-based pricing model. After our initial consultation, I provide a detailed proposal with transparent pricing. For ongoing work, I also offer monthly retainer packages tailored to your needs.",
  },
  {
    question: "Can you work with my existing team?",
    answer:
      "Yes, I frequently collaborate with in-house teams, product managers, and other developers. I'm comfortable integrating into existing workflows and tools like Jira, Slack, Notion, and Git-based workflows.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We start with a deep dive into your brand, goals, and audience. I research your industry landscape and competitors to build a strategic foundation for the project.",
    details: ["Brand audit", "User research", "Competitive analysis", "Project roadmap"],
  },
  {
    number: "02",
    title: "Design & Prototype",
    description:
      "I translate strategy into visual concepts. From wireframes to high-fidelity mockups, every pixel is intentional. You'll see interactive prototypes before any code is written.",
    details: ["Wireframing", "UI Design", "Interactive prototypes", "Design system"],
  },
  {
    number: "03",
    title: "Develop & Launch",
    description:
      "Clean, performant code brings your vision to life. I develop with scalability in mind, test rigorously, and ensure a smooth launch with post-launch support.",
    details: ["Front-end development", "Performance optimization", "Testing & QA", "Deployment"],
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title reveal animation
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

    // Subtitle fade in
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );
    }

    // Form fields stagger animation
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".form-field");
      gsap.fromTo(
        fields,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 1,
        }
      );
    }

    // Info section scroll animation
    if (infoRef.current) {
      const items = infoRef.current.querySelectorAll(".info-item");
      gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Social links animation
    if (socialRef.current) {
      const links = socialRef.current.querySelectorAll(".social-link");
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Process steps animation
    if (processRef.current) {
      const steps = processRef.current.querySelectorAll(".process-step");
      gsap.fromTo(
        steps,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // FAQ animation
    if (faqRef.current) {
      const items = faqRef.current.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Marquee animation
    if (marqueeRef.current) {
      const texts = marqueeRef.current.querySelectorAll(".marquee-text");
      gsap.to(texts, {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }
  }, []);

  const splitTitle = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{
          display: "inline-block",
          perspective: "600px",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.fromTo(
              ".success-message",
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
            );
          }, 100);
        },
      });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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

        {/* Marquee Banner */}
        <section className="contact-marquee">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">LET&apos;S COLLABORATE — </span>
            <span className="marquee-text">OPEN FOR PROJECTS — </span>
            <span className="marquee-text">LET&apos;S COLLABORATE — </span>
            <span className="marquee-text">OPEN FOR PROJECTS — </span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <div className="contact-hero-grid">
              <div className="contact-hero-left">
                <h1 ref={titleRef} className="contact-title">
                  {splitTitle("LET'S WORK")}
                  <br />
                  {splitTitle("TOGETHER.")}
                </h1>
              </div>
              <div className="contact-hero-right">
                <p ref={subtitleRef} className="contact-subtitle">
                  Have a project in mind? I&apos;d love to hear about it.
                  Whether it&apos;s a complete rebrand, a new website, or a creative
                  collaboration — I&apos;m here to bring your vision to life with
                  precision and passion. Every great project starts with a simple conversation.
                </p>
                <div className="contact-hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Projects Delivered</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <div className="process-inner">
            <div className="section-header">
              <h2 className="section-title-large text-black">HOW I WORK</h2>
              <p className="section-subtitle-text">
                A structured approach to deliver exceptional results, every time.
              </p>
            </div>

            <div ref={processRef} className="process-grid">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="process-step-number">{step.number}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                  <ul className="process-step-details">
                    {step.details.map((detail, i) => (
                      <li key={i} className="process-step-detail">
                        <span className="detail-dot"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-[80%] mx-auto">
          <BezierDivider intensity={0.8} />
        </div>

        {/* Form + Info Section */}
        <section className="contact-section">
          <div className="contact-grid pt-[6rem] pb-[6rem]">
            {/* Form */}
            <div className="contact-form-wrapper">
              <div className="section-header">
                <h2 className="section-title-large text-white">GET IN TOUCH</h2>
                <p className="section-subtitle-text">
                  Fill out the form below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {!submitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label
                        htmlFor="contact-name"
                        className={`form-label ${
                          focusedField === "name" || formData.name
                            ? "form-label-active"
                            : ""
                        }`}
                      >
                        01 — YOUR NAME
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        required
                        className="form-input"
                      />
                      <BezierDivider intensity={0.6} />
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="contact-email"
                        className={`form-label ${
                          focusedField === "email" || formData.email
                            ? "form-label-active"
                            : ""
                        }`}
                      >
                        02 — YOUR EMAIL
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        required
                        className="form-input"
                      />
                      <BezierDivider intensity={0.6} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label
                        htmlFor="contact-subject"
                        className={`form-label ${
                          focusedField === "subject" || formData.subject
                            ? "form-label-active"
                            : ""
                        }`}
                      >
                        03 — SERVICE NEEDED
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="form-input form-select"
                      >
                        <option value="">Select a service</option>
                        <option value="creative-direction">Creative Direction</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="frontend">Front-end Development</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="fullstack">Full-stack Application</option>
                        <option value="other">Other</option>
                      </select>
                      <BezierDivider intensity={0.6} />
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="contact-budget"
                        className={`form-label ${
                          focusedField === "budget" || formData.budget
                            ? "form-label-active"
                            : ""
                        }`}
                      >
                        04 — ESTIMATED BUDGET
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className="form-input form-select"
                      >
                        <option value="">Select a range</option>
                        <option value="1k-3k">€1,000 — €3,000</option>
                        <option value="3k-5k">€3,000 — €5,000</option>
                        <option value="5k-10k">€5,000 — €10,000</option>
                        <option value="10k+">€10,000+</option>
                      </select>
                      <BezierDivider intensity={0.6} />
                    </div>
                  </div>

                  <div className="form-field">
                    <label
                      htmlFor="contact-message"
                      className={`form-label ${
                        focusedField === "message" || formData.message
                          ? "form-label-active"
                          : ""
                      }`}
                    >
                      05 — YOUR MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project, your goals, your timeline..."
                      required
                      rows={6}
                      className="form-input form-textarea"
                    />
                    <BezierDivider intensity={0.6} />
                  </div>

                  <button type="submit" className="form-submit" style={{backgroundColor:"white",color:"black"}}>
                    <span className="form-submit-text">SEND MESSAGE</span>
                    <span className="form-submit-arrow">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="24" cy="24" r="23" stroke="black" strokeWidth="2" />
                      <path
                        d="M14 24L21 31L34 18"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="success-title">MESSAGE SENT</h2>
                  <p className="success-text">
                    Thank you for reaching out. I&apos;ll get back to you within 24–48 hours.
                  </p>
                </div>
              )}
            </div>

            {/* Info Side */}
            <div ref={infoRef} className="contact-info">
              <div className="info-item">
                <h3 className="info-label">EMAIL</h3>
                <a href="mailto:hello@portfolio.me" className="info-value">
                  hello@portfolio.me
                </a>
              </div>

              <BezierDivider intensity={0.5} />

              <div className="info-item">
                <h3 className="info-label">PHONE</h3>
                <a href="tel:+33612345678" className="info-value">
                  +33 6 12 34 56 78
                </a>
              </div>

              <BezierDivider intensity={0.5} />

              <div className="info-item">
                <h3 className="info-label">LOCATION</h3>
                <p className="info-value">Paris, France</p>
              </div>

              <BezierDivider intensity={0.5} />

              <div className="info-item">
                <h3 className="info-label">AVAILABILITY</h3>
                <div className="availability-badge">
                  <span className="availability-dot"></span>
                  <span className="info-value">Available for freelance</span>
                </div>
              </div>

              <BezierDivider intensity={0.5} />

              <div className="info-item">
                <h3 className="info-label">RESPONSE TIME</h3>
                <p className="info-value">Within 24 hours</p>
              </div>

              <BezierDivider intensity={0.5} />

              <div ref={socialRef} className="social-section">
                <h3 className="info-label">FOLLOW ME</h3>
                <div className="social-links">
                  {["Twitter / X", "Instagram", "LinkedIn", "Dribbble", "GitHub", "Behance"].map(
                    (name) => (
                      <a
                        key={name}
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        {name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq-inner">
            <div className="section-header">
              <h2 className="section-title-large text-black">FREQUENTLY ASKED<br />QUESTIONS</h2>
              <p className="section-subtitle-text">
                Everything you need to know before we start working together.
              </p>
            </div>

            <div ref={faqRef} className="faq-list">
              {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <span className="faq-number">({String(index + 1).padStart(2, "0")})</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className={`faq-toggle ${openFaq === index ? "faq-toggle-open" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`faq-answer ${openFaq === index ? "faq-answer-open" : ""}`}
                  >
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                  <BezierDivider intensity={0.5} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="cta-band">
          <div className="cta-band-inner">
            <h2 className="cta-band-title">READY TO START?</h2>
            <p className="cta-band-text">
              Don&apos;t hesitate — every great collaboration begins with a first step.
            </p>
            <a href="#contact-name" className="form-submit" style={{ display: "inline-flex" }}>
              <span className="form-submit-text">SCROLL TO FORM</span>
              <span className="form-submit-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </ReactLenis>
  );
}
