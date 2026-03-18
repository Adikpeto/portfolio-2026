"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
export default function Home() {


  function getPathEndPointInDOM(
      path: SVGPathElement,
      drawLength: number
    ) {
    const point = path.getPointAtLength(drawLength)
    const ctm = path.getScreenCTM()

    if (!ctm) return null

    return {
      x: point.x * ctm.a + point.y * ctm.c + ctm.e,
      y: point.x * ctm.b + point.y * ctm.d + ctm.f,
    }
}


  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const path = document.querySelector("#main") as SVGPathElement
  const cards = gsap.utils.toArray<HTMLElement>(".card")
  const section = document.querySelector(".spoolight")

  if (!path || !section) return

  const length = path.getTotalLength()

  const driver = { progress: 0 }

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  gsap.to(driver, {
    progress: 1,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    onUpdate: () => {
      const drawLength = length * driver.progress

      // met à jour le path visuellement
      path.style.strokeDashoffset =
        `${length - drawLength}`

      // 🔥 position réelle du bout du path
      const endPoint = getPathEndPointInDOM(path, drawLength)
      if (!endPoint) return

      // 🔥 comparaison avec chaque card
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()

       

        const isTouching =
        endPoint.x >= rect.left &&
        endPoint.x <= rect.right &&
        endPoint.y >= rect.top &&
        endPoint.y <= rect.bottom;

        // 🎯 seuil de collision (à ajuster)
        if (isTouching && !card.classList.contains("active")) {
          card.classList.add("active")

          gsap.to(
            card,
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          )
        }
      })
    },
  })


}, [])




  // const pathRef = useRef<SVGPathElement | null>(null);
  // const rafRef = useRef<number | null>(null);

  // const progress = useRef(0);
  // const targetProgress = useRef(0);
  // const mouseX = useRef(0.5);

  // const lerp = (a: number, b: number, t: number) => {
  //   return a + (b - a) * t;
  // };

  // const setPath = () => {
  //   const width = window.innerWidth * 0.5;
  //   const height = 50;

  //   const d = `
  //     M 0 ${height}
  //     Q ${width * mouseX.current} ${height + progress.current}
  //     ${width} ${height}
  //   `;

  //   pathRef.current?.setAttribute("d", d);
  // };

  // const animate = () => {
  //   progress.current = lerp(progress.current, targetProgress.current, 0.1);
  //   setPath();

  //   rafRef.current = requestAnimationFrame(animate);
  // };

  // const onMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
  //   const bounds = e.currentTarget.getBoundingClientRect();

  //   mouseX.current = (e.clientX - bounds.left) / bounds.width;
  //   targetProgress.current += e.movementY * 0.4;
  //   targetProgress.current = Math.max(-80, Math.min(80, targetProgress.current));
  // };

  // const onMouseEnter = () => {
  //   if (!rafRef.current) animate();
  // };

  // const onMouseLeave = () => {
  //   targetProgress.current = 0;
  // };

  // useEffect(() => {
  //   setPath();
  //   window.addEventListener("resize", setPath);

  //   return () => {
  //     window.removeEventListener("resize", setPath);
  //     if (rafRef.current) cancelAnimationFrame(rafRef.current);
  //   };
  // }, []);

  
   /*useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Animation du SVG path (exemple)
    const path = document.querySelector("#second");
    const cards = gsap.utils.toArray(".card")
  

    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // gsap.to(path, {
      //   strokeDashoffset: 0,
      //   scrollTrigger: {
      //     trigger: ".svg-path",
      //     start: "top 50%",
      //     end: "bottom top",
      //     scrub: true,
      //   },
      // });

        gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: ".spoolight",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }


  cards.forEach((card, i) => {
    const progress = length - (length / cards.length) * (i + 1)

    // ✨ SVG progression
    // gsap.to(path, {
    //   strokeDashoffset: progress,
    //   scrollTrigger: {
    //     trigger: card as Element,
    //     start: "top 70%",
    //     end: "bottom 60%",
    //     scrub: true,
    //   },
    // })

    // ✨ Animation du bloc
    gsap.from(card as Element, {
      opacity: 0,
      y: 120,
      rotate: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: card as Element,
        start: "top 80%",
        scrub: true,
      },
    })
  })

    

    
    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);*/

  return (
    <div className="body flex flex-col items-center justify-center font-sans">
     <div className="flex items-center p-4 justify-between min-w-[100%]">
            <div className="text-xl font-bold">Portfolio</div>
            <nav className="flex space-x-4">
              <a href="#about" className="hover:underline">About</a>
              <a href="#projects" className="hover:underline">Projects</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </nav>
      </div>
      {/* <header className="flex items-center bg-black h-[400px] p-5 justify-between flex-row w-full">
         <div className="flex max-w-[70%] flex-col">
            <h1 className="text-7xl text-white font-bold">Bienvenue sur mon Portfolio</h1>
             <p className="mt-4 text-lg text-white">
              Découvrez mes projets et compétences en développement web.
             </p>
         </div>
      </header> */}

       <section className="spoolight bg-[trasnparent] flex flex-col items-center p-5 gap-5 justify-between w-full">
         <div className="card flex m-[10rem] h-[300px] w-[30%] self-end text-4xl bg-[blue] text-white font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>

         <div className="card flex h-[300px] w-[30%] text-4xl  bg-[darkblue] text-white font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>


         <div className="card flex h-[300px] w-[40%] bg-[green] text-4xl text-white font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>


         <div className="card flex h-[300px] self-start w-[50%] text-4xl bg-[blue] text-white font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>


         <div className="card flex h-[300px] w-[50%] text-4xl  bg-[red] text-white font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>


         <div className="card flex h-[300px] w-[30%] text-4xl self-end text-white  bg-[gray] font-bold flex-col">
            Découvrez mes projets et compétences en développement web.
         </div>

         <div className="svg-path">
             {/* <svg width="3114" height="5952" viewBox="0 0 3114 5952" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2641.2 235.065C2641.2 235.065 2824.7 -68.4352 2905.7 235.065C2986.7 538.564 3100.41 1010.8 2905.7 1438.56C2477.93 2378.33 -466.3 1918.56 261.7 1438.56C989.7 958.565 95.8571 2144.02 261.7 2541.56C659.243 3494.51 3503.7 1829.06 2905.7 2541.56C2307.7 3254.06 3156.33 3447.82 2905.7 3927.56C2422.58 4852.36 -561.8 1997.56 234.2 3891.06C1030.2 5784.56 -299.842 4830.06 234.2 4830.06C768.242 4830.06 965.701 4151.56 1601.7 4830.06C2237.7 5508.56 2135.74 5851.56 1601.7 5851.56" stroke="#523CE2" strokeWidth="200" strokeLinecap="round"/>
            </svg> */}

            {/* <svg width="2457" height="5778" viewBox="0 0 2457 5778" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2022.5 218H2417V1884H40V3189H1697V4266H433.5V5778" stroke="#523CE2" strokeWidth="80"/>
            <path d="M287 0V250H224.5V187.5H162V250H99.5V0H287ZM162 62.5V125H224.5V62.5H162ZM537 0V125H474.5V62.5H412V125H474.5V187.5H412V250H349.5V0H537ZM537 187.5V250H474.5V187.5H537ZM787 0V62.5H724.5V187.5H787V250H599.5V187.5H662V62.5H599.5V0H787ZM1037 0V62.5H974.5V125H849.5V62.5H912V0H1037ZM1037 125V187.5H974.5V125H1037ZM974.5 187.5V250H849.5V187.5H974.5ZM1287 0V62.5H1224.5V250H1162V62.5H1099.5V0H1287ZM1537 0V62.5H1474.5V187.5H1537V250H1349.5V187.5H1412V62.5H1349.5V0H1537ZM1724.5 0V62.5H1662V187.5H1724.5V250H1599.5V0H1724.5ZM1787 62.5V187.5H1724.5V62.5H1787ZM2037 0V62.5H1974.5V125H1912V187.5H2037V250H1849.5V0H2037Z" fill="#523CE2"/>
            
            </svg> */}

            {/* <svg width="2457" height="5600" viewBox="0 0 2457 5600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2022.5 40H2417V1706H40V3011H1697V4088H433.5V5600" stroke="#523CE2" stroke-width="80"/>
            </svg> */}

         <svg width="720" height="3599" viewBox="0 0 720 3599" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="main" d="M347.906 2.50049C347.906 2.50049 604.906 848.5 670.906 499C736.906 149.5 143.906 1729.5 15.906 1245.5C-112.094 761.5 718.699 1615.6 716.906 2025C715.17 2421.47 96.2366 2398.9 52.906 2793C15.4646 3133.54 396.906 3600 396.906 3600" stroke="#6855E6" strokeWidth="5" strokeLinecap="round"/>
          </svg>




         </div>
      </section>
    </div>
  );
}
