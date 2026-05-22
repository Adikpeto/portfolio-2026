"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import ParallaxImage from "../components/ParallaxImage";
import BezierDivider from "../components/BezierDivider";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ProjectDetail() {
  const container = useRef(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title reveal animation
    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }

    // Hero meta fade in
    if (heroMetaRef.current) {
      gsap.fromTo(
        heroMetaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
    }

    // Challenge section scroll animation
    if (challengeRef.current) {
      gsap.fromTo(
        challengeRef.current.querySelectorAll(".reveal-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: challengeRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Solution section scroll animation
    if (solutionRef.current) {
      gsap.fromTo(
        solutionRef.current.querySelectorAll(".reveal-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: solutionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Gallery images scale in
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.querySelectorAll(".gallery-item"),
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Info section reveal
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current.querySelectorAll(".info-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Next project section
    if (nextProjectRef.current) {
      gsap.fromTo(
        nextProjectRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextProjectRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <ReactLenis root>
      <div className="main" ref={container}>
        {/* ─── NAVBAR ─── */}
        <div className="container">
          <div className="nav-bar">
            <Link href="/" className="nav-bar-logo text-black font-bold">Portfolio Me</Link>
            <div className="flex flex-col">
              <div className="text-black text-sm">Work</div>
              <div className="text-black text-sm">Portfolio</div>
              <div className="text-black text-sm">Contact</div>
            </div>
            <div className="text-black text-sm">À Propos</div>
            <a href="#footer"> <div className="text-black text-sm">Contact</div> </a>
            <div className="text-black text-sm">Why Me</div>
          </div>
        </div>

        <div className="spoolight" style={{ marginTop: "10rem" }}>

          {/* ─── HERO ─── */}
          <div className="header w-full">
            <div className="header-container flex flex-col">
              <div ref={heroTitleRef} className="header-title uppercase" style={{ fontSize: "6rem", lineHeight: "5.5rem" }}>
                SHOP-COMMERCE. <br /> PROJECT DETAIL
              </div>
              <div ref={heroMetaRef} className="body mt-10">
                <p className="text-2xl text-gray-500">
                  Brand Identity, Creative Direction, Digital Design, Web Development. 
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro
                  sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto
                  exercitationem?
                </p>
              </div>
            </div>
          </div>

          {/* ─── PROJECT INFO STRIP ─── */}
          <div ref={infoRef} className="w-[80%] flex flex-row justify-between items-start py-10 mt-10">
            <div className="info-item flex flex-col gap-1">
              <div className="text-xs uppercase tracking-widest text-gray-400">Client</div>
              <div className="text-lg text-black font-medium">Shop-Commerce Inc.</div>
            </div>
            <div className="info-item flex flex-col gap-1">
              <div className="text-xs uppercase tracking-widest text-gray-400">Service</div>
              <div className="text-lg text-black font-medium">Brand Identity & Web</div>
            </div>
            <div className="info-item flex flex-col gap-1">
              <div className="text-xs uppercase tracking-widest text-gray-400">Year</div>
              <div className="text-lg text-black font-medium">2026</div>
            </div>
            <div className="info-item flex flex-col gap-1">
              <div className="text-xs uppercase tracking-widest text-gray-400">Role</div>
              <div className="text-lg text-black font-medium">Lead Designer & Developer</div>
            </div>
          </div>

          {/* ─── HERO IMAGE ─── */}
          <ParallaxImage src="/cap13.png" alt="Shop-Commerce Hero" strength={0.35} height={"80vh"} width={"90vw"} />

          {/* ─── THE CHALLENGE ─── */}
          <section ref={challengeRef} className="w-[80%] section margin-top border-bottom-black border-2">
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-row justify-between items-start gap-10">
                <div className="reveal-item text-[3rem] text-black font-bold w-1/2">The Challenge</div>
                <div className="reveal-item text-lg text-[gray] w-1/2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro
                  sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto
                  exercitationem?
                  <br /><br />
                  English is a West Germanic language that emerged in early medieval England and has since become a global
                  lingua franca. It is the most widely spoken language in the world, with more native speakers than any
                  other language.
                </div>
              </div>
            </div>
          </section>

          {/* ─── FULL WIDTH IMAGE ─── */}
          <div className="w-[90vw] my-10">
            <ParallaxImage src="/cap10.png" alt="Process" strength={0.25} height={"70vh"} width={"90vw"} />
          </div>

          {/* ─── THE SOLUTION ─── */}
          <section ref={solutionRef} className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-row justify-between items-start gap-10">
                <div className="reveal-item text-[3rem] text-black font-bold w-1/2">The Solution</div>
                <div className="reveal-item text-lg text-[gray] w-1/2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro
                  sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto
                  exercitationem?
                  <br /><br />
                  We crafted a comprehensive brand identity that reflects modernity and trust, paired with a seamless
                  e-commerce experience built on cutting-edge web technologies.
                </div>
              </div>
            </div>
          </section>

          {/* ─── IMAGE GALLERY GRID ─── */}
          <section ref={galleryRef} className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-col gap-8">
              {/* Row 1 - Two images side by side */}
              <div className="w-full flex flex-row gap-5 justify-center items-center">
                <div className="gallery-item relative min-w-[40vw] min-h-[50vh] max-w-[40vw] max-h-[50vh] overflow-hidden">
                  <ParallaxImage src="/cap2.png" alt="Detail 1" strength={0.35} height={"60vh"} width={"50vw"} />
                </div>
                <div className="gallery-item relative min-w-[40vw] min-h-[50vh] max-w-[40vw] max-h-[50vh] overflow-hidden">
                  <ParallaxImage src="/cap9.png" alt="Detail 2" strength={0.35} height={"60vh"} width={"50vw"} />
                </div>
              </div>

              {/* Row 2 - Full width */}
              <div className="gallery-item w-full">
                <ParallaxImage src="/cap1.png" alt="Detail 3" strength={0.2} height={"60vh"} width={"82vw"} />
              </div>

              {/* Row 3 - Two images side by side */}
              <div className="w-full flex flex-row gap-5 justify-center items-center">
                <div className="gallery-item relative min-w-[40vw] min-h-[50vh] max-w-[40vw] max-h-[50vh] overflow-hidden">
                  <ParallaxImage src="/cap12.png" alt="Detail 4" strength={0.35} height={"60vh"} width={"50vw"} />
                </div>
                <div className="gallery-item relative min-w-[40vw] min-h-[50vh] max-w-[40vw] max-h-[50vh] overflow-hidden">
                  <ParallaxImage src="/cap1.png" alt="Detail 5" strength={0.35} height={"60vh"} width={"50vw"} />
                </div>
              </div>
            </div>
          </section>

          {/* ─── SERVICES / DELIVERABLES ─── */}
          <section className="w-[80%] section border-bottom-black border-2">
            <div style={{ marginLeft: 0 }} className="header-title mb-10">
              DELIVERABLES
            </div>

            <div className="competence-container flex flex-row">
              <div className="competence-title">Brand Identity</div>
              <div className="competence-text text-sm text-[gray]">
                Complete visual identity system including logo, color palette, typography guidelines and brand book
                documentation for consistent application.
              </div>
              <div className="text-sm max-w-[10px] text-black">(1)</div>
            </div>

            <BezierDivider intensity={0.8} />

            <div className="competence-container flex flex-row">
              <div className="competence-title">Web Design</div>
              <div className="competence-text text-sm text-[gray]">
                Responsive e-commerce design with intuitive navigation, optimized checkout flow, and premium aesthetic
                aligned with the brand identity.
              </div>
              <div className="text-sm max-w-[10px] text-black">(2)</div>
            </div>

            <BezierDivider intensity={0.8} />

            <div className="competence-container flex flex-row">
              <div className="competence-title">Development</div>
              <div className="competence-text text-sm text-[gray]">
                Full-stack development using Next.js with headless CMS integration, payment processing, and performance
                optimization for sub-second load times.
              </div>
              <div className="text-sm max-w-[10px] text-black">(3)</div>
            </div>

            <BezierDivider intensity={0.8} />

            <div className="competence-container flex flex-row">
              <div className="competence-title">Creative Direction</div>
              <div className="competence-text text-sm text-[gray]">
                Art direction for product photography, marketing materials and social media content strategy to ensure
                cohesive brand storytelling across all touchpoints.
              </div>
              <div className="text-sm max-w-[10px] text-black">(4)</div>
            </div>
          </section>

          {/* ─── TESTIMONIAL / QUOTE ─── */}
          <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-col items-center text-center py-10">
              <div className="text-[3.5rem] text-black font-bold leading-tight max-w-[70%]">
                &ldquo;Working with this team transformed our brand vision into a digital reality that exceeded all expectations.&rdquo;
              </div>
              <div className="mt-8 flex flex-col items-center gap-1">
                <div className="text-base text-black font-medium">— Sarah Johnson</div>
                <div className="text-sm text-gray-400">CEO, Shop-Commerce Inc.</div>
              </div>
            </div>
          </section>

          {/* ─── NEXT PROJECT ─── */}
          <section ref={nextProjectRef} className="w-[80%] section mb-10">
            <Link href="/detail" className="block group cursor-pointer">
              <div className="flex flex-row justify-between items-center mb-8">
                <div className="text-sm uppercase tracking-widest text-gray-400">Next Project</div>
                <div className="text-sm text-black group-hover:translate-x-2 transition-transform duration-300">→</div>
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-8">
                <div className="flex flex-col flex-1">
                  <div className="text-[3rem] text-black font-bold group-hover:translate-x-4 transition-transform duration-500">
                    UI/UX Design
                  </div>
                  <div className="text-sm text-[gray] mt-2">
                    Brand Identity - Creative Direction - Digital Design - Web Development
                  </div>
                  <div className="btn-plus w-fit p-[3px] mt-4 rounded-full bg-[black] group-hover:px-4 transition-all duration-300">
                    <div className="text-[0.7rem] text-[beige]">VIEW PROJECT</div>
                  </div>
                </div>
                <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                  <ParallaxImage src="/cap10.png" alt="Next Project" strength={0.35} height={"70vh"} width={"60vw"} />
                  <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                </div>
              </div>
            </Link>
          </section>

        </div>
      </div>
      <Footer />
    </ReactLenis>
  );
}
