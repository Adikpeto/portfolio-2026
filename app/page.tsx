"use client";

import { JSX, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ReactLenis from "lenis/react";
import ParallaxImage from "./components/ParallaxImage";
import Footer from "./components/Footer";
import BezierDivider from "./components/BezierDivider";
import WaterImage from "./components/WaterImg";

const phrase = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";


export default function Home() {
let refs = useRef([]);
const container = useRef(null);




const splitWords = (phrase: string): JSX.Element[] => {

  let body: JSX.Element[] = [];

  phrase.split(" ").forEach((word: string, i: number) => {

    const letters = splitLetters(word);

    body.push(<p key={word + "_" + i}>{letters}</p>)

  })

  return body

}



const splitLetters = (word: string): JSX.Element[] => {

  let letters: JSX.Element[] = []

  word.split("").forEach((letter: string, i: number) => {

    letters.push(
      <span
        key={letter + "_" + i}
        ref={(el: HTMLSpanElement | null) => {
          if (el) refs.current.push(el)
        }}
      >
        {letter}
      </span>
    )

  })

  return letters;

}


    const createAnimation = () => {
      gsap.to(refs.current, {
        scrollTrigger: {
            trigger: container.current,
            scrub: true,
            start: `top`,
            end: `+=${window.innerHeight / 1.5}`,
        },
        opacity: 1,
        color:"black",
        ease: "none",
        stagger: 0.1

    })

  }

   useEffect( () => {

    gsap.registerPlugin(ScrollTrigger);

    createAnimation();

  }, [])

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
    const section = document.querySelector(".spoolight")
    const cards = gsap.utils.toArray<HTMLElement>(".animate-card")
   
    if (!path || !section) return

    const driver = { progress: 0 }
    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,

    })


    gsap.to(driver, {
      progress: 1,
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
            cards.forEach((card,index) => {
              const rect = card.getBoundingClientRect()
      
             
      
              const isTouching =
              endPoint.x >= rect.left &&
              endPoint.x <= rect.right &&
              endPoint.y >= rect.top &&
              endPoint.y <= rect.bottom;
      
              // 🎯 seuil de collision (à ajuster)
              if (isTouching && !card.classList.contains("display-anime")) {
                card.classList.add("display-anime")
             
                gsap.to(
                  card,
                  { opacity:1, duration: 0.6 }
                )
               
              }
              if(!isTouching && card.classList.contains("display-anime")) {
                card.classList.remove("display-anime")
                gsap.to(
                  card,
                  { opacity:0, duration: 0.6 }
                )
              }
            })
          },
    })
  }, [])



  return (
    <ReactLenis root>
      <div className="main" ref={container}>
        {/* <div className="font-fixed">
            <div className="font-fixed-text">RECENT PROJECT I DO</div>
        </div> */}
        <div className="container">
          <div className="nav-bar">
            <div className="nav-bar-logo text-black font-bold">Portfolio Me</div>
            <div className="flex flex-col">
              <div className="text-black text-sm">Work</div>
              <div className="text-black text-sm">Portfolio</div>
              <div className="text-black text-sm">Contact</div>
            </div>
            <div className="text-black text-sm">À Propos</div>
            <a href="footer"> <div className="text-black text-sm">Contact</div> </a>
            
            <div className="text-black text-sm">Why Me</div>

          </div>
        </div>

        <div className="spoolight">
          <div className="header w-full">
            <div className="header-container flex flex-col">
              <div className="header-title uppercase">
                Where Code Meets Creativity. <br /> 2026
              </div>
              <div className="body">
                {
                  splitWords(phrase)
                }
              </div>
            </div>
          </div>





          <ParallaxImage src="/timur-shakerzianov-8pGFQlTFBWo-unsplash.jpg" alt="" strength={0.35} height={"80vh"} width={"90vw"} />
          
   
          <section className="w-[80%] section margin-top border-bottom-black border-2">
          
            <div className="w-full flex flex-row justify-center items-center">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">Creative Direction</div>


                </div>
                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>

                {/* <div className="btn-plus w-fit p-[3px] mt-4  rounded-full bg-[black]">
                  <div className="text-[0.7rem] text-[beige]">LEARN MORE</div>
                </div> */}
              </div>

              <div className="flex flex-col">
                <div className="animate-card-container relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                  <ParallaxImage src="/cap13.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />
                  <div className="animate-card absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                    <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] cursor-pointer text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                    <div className="text-white text-4xl font-bold">
                      BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                    </div>
                    
                  </div>
                </div>

              </div>


            </div>
          </section>

          <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-row gap-5 justify-center items-center">

              <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                <ParallaxImage src="/cap10.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />

                <div className="animate-card absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                   <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] cursor-pointer text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                  <div className="text-white text-4xl font-bold">
                    BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                  </div>
                  {/* <h2 className="text-[#fff] text-4xl font-bold">
                    SHOP-COMMERCE
                  </h2> */}
                </div>

              </div>


              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">UI/UX Design</div>


                </div>


                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>
              </div>



            </div>
          </section>


          <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-row justify-center items-center">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">Creative Direction</div>
                </div>


                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>
              </div>

              <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                <ParallaxImage src="/cap2.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />
                <div className="animate-card absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                  <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] cursor-pointer text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                  <div className="text-white text-4xl font-bold">
                    BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                  </div>
                  {/* <h2 className="text-[#000] text-4xl font-bold">
                    SHOP-COMMERCE
                  </h2> */}
                </div>
              </div>

            </div>
          </section>




          <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-row gap-5 justify-center items-center">
              <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                <ParallaxImage src="/cap9.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />
                 <div className="animate-card absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                   <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] cursor-pointer text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                  <div className="text-white text-4xl font-bold">
                    BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                  </div>
                  {/* <h2 className="text-[#000] text-4xl font-bold">
                    SHOP-COMMERCE
                  </h2> */}
                </div>
              </div>


              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">UI/UX Design</div>


                </div>


                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>
              </div>



            </div>
          </section>


          <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-row justify-center items-center">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">Creative Direction</div>
                </div>
                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>
              </div>

              <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                <ParallaxImage src="/cap11.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />
                <div className="animate-card absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                   <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] cursor-pointer text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                  <div className="text-white text-4xl font-bold">
                    BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                  </div>
                  {/* <h2 className="text-[#000] text-4xl font-bold">
                    SHOP-COMMERCE
                  </h2> */}
                </div>
              </div>

            </div>
          </section>



          



          {/* <section className="w-[80%] section border-bottom-black border-2">
            <div className="w-full flex flex-row gap-5 justify-center items-center">
              <div className="relative min-w-[50vw] min-h-[40vh] max-w-[50vw] max-h-[40vh] overflow-hidden">
                <ParallaxImage src="/cap9.png" alt="" strength={0.35} height={"70vh"} width={"60vw"} />
                <div className="absolute inset-0 z-10 flex flex-col p-5 bg-black/20">
                   <h2 className="text-[#fff] text-base">
                          SHOP-COMMERCE. 
                      <div className="btn-plus mb-2 w-fit p-[3px] mt-4  rounded-full bg-[black]">
                        <div className="text-[0.7rem] text-[beige]">LEARN MORE</div>
                      </div>
                    </h2>
                  <div className="text-white text-4xl font-bold">
                    BRAND IDENTITY - CREATIVE DIRECTION - DIGITAL DESIGN - WEB DEVELOPMENT
                  </div>
                 
                </div>
              </div>


              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="text-[3rem] text-black font-bold">UI/UX Design</div>


                </div>


                <div className="text-sm text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ipsam nam ullam sit mollitia porro sequi atque fuga similique molestias suscipit aut dolores corrupti dolor labore illum, dicta iusto exercitationem?</div>
              </div>



            </div>
          </section> */}




          <section className="w-[80%]">
            <div style={{ marginLeft:0 }} className="header-title">
              THIS IS <br /> WHAT I DO
            </div>

            <div className="competence-container flex flex-row">
              <div className="competence-title">
                Creative Direction
              </div>

              <div className="competence-text text-sm text-[gray]">
                English is a West Germanic language that emerged in early medieval England and has since become a global lingua franca.
              </div>

              <div className="text-sm max-w-[10px] text-black">(1)</div>
            </div>


            <BezierDivider intensity={0.8}/>

            <div className="competence-container flex flex-row">
              <div className="competence-title">
                <div>
                  Creative Direction
                </div>
                {/* <div className=""></div>
                   <div className="text-base" style={{ fontSize:'400', textTransform:"none"}}>
                       App
                   </div> */}
              </div>

              <div className="competence-text text-sm text-[gray]">
                English is a West Germanic language that emerged in early medieval England and has since become a global lingua franca.
              </div>

              <div className="text-sm max-w-[10px] text-black">(2)</div>
            </div>



            {/* <div style={{ position: "relative", width: "100%", height: "100px" }}>
            <span
              onMouseMove={onMouseMove}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{
                position: "absolute",
                inset: 0,
                width: "100vw",
                cursor: "pointer",
                zIndex: 10,
              }}
            />

            <svg
              width="100vw"
              height="100"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path
                ref={pathRef}
                fill="none"
                stroke="black"
                strokeWidth={8}
              />
            </svg>
          </div> */}
          




            <BezierDivider intensity={0.8}/>
            <div className="competence-container flex flex-row">
            
             
              <div className="competence-title">
                UI/UX Design
              </div>

              <div className="competence-text text-sm text-[gray]">
                English is a West Germanic language that emerged in early medieval England and has since become a global  in early medieval England and lingua franca.
              </div>

              <div className="text-sm max-w-[10px] text-black">(3)</div>
            </div>

            <BezierDivider intensity={0.8}/>

            <div className="competence-container flex flex-row">
              <div className="competence-title">
                Front-end Dev
              </div>

              <div className="competence-text text-sm text-[gray]">
                Early medieval England and has since become a global lingua franca.
              </div>

              <div className="text-sm max-w-[10px] text-black">(4)</div>
            </div>



           <BezierDivider intensity={0.8}/>

            <div className="competence-container flex flex-row">
              <div className="competence-title">
                Brading Mark
              </div>

              <div className="competence-text text-sm text-[gray]">
                Germanic language that emerged in early medieval England and has since become a global lingua franca.
              </div>

              <div className="text-sm max-w-[10px] text-black">(5)</div>
            </div>











          </section>















          <div className="svg-path">
            {/* <svg width="621" height="603" viewBox="0 0 621 603" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M150.009 398.823C151.406 397.988 154.027 395.938 157.872 392.673C161.778 389.479 163.741 387.749 163.76 387.483C163.813 386.752 162.909 386.319 161.047 386.184C159.247 386.121 157.589 386.403 156.073 387.029C154.762 387.602 153.277 388.732 151.618 390.417C150.035 391.974 148.675 393.68 147.539 395.537C146.331 397.455 145.681 399.045 145.59 400.309C145.542 400.974 147.015 400.478 150.009 398.823ZM159.806 397.825C155.262 401.508 151.753 403.828 149.278 404.786C146.864 405.815 144.698 405.725 142.78 404.517C140.734 403.233 139.849 401.131 140.127 398.21C140.405 395.289 141.851 391.918 144.466 388.096C148.717 381.986 153.671 379.102 159.327 379.443C163.236 379.926 165.969 380.958 167.526 382.541C167.772 382.826 168.129 382.986 168.594 383.019C170.148 381.862 171.887 381.853 173.809 382.995C176.967 384.626 177.022 387.103 173.975 390.426C171.275 393.573 169.23 396.901 167.841 400.41C166.594 403.796 166.224 406.61 166.73 408.852C167.222 411.294 168.632 412.599 170.959 412.767C172.954 412.911 175.662 411.97 179.084 409.944C182.434 407.98 185.9 405.323 189.484 401.972C193.206 398.564 196.474 394.957 199.289 391.149C200.71 389.046 201.984 388.537 203.109 389.62C204.072 390.158 204.281 390.975 203.734 392.072C203.196 393.036 201.442 395.115 198.471 398.309C190.21 407.204 183.081 412.906 177.085 415.414C173.303 416.879 169.987 416.974 167.138 415.699C164.233 414.287 162.306 411.808 161.359 408.264C160.473 404.791 160.666 400.728 161.937 396.074L159.806 397.825ZM204.735 404.677C207.231 402.517 209.842 400.132 212.571 397.522L216.77 393.514L214.649 390.954C213.358 389.391 212.344 388.616 211.608 388.63C210.938 388.648 209.812 389.436 208.229 390.993C206.437 392.668 204.538 395.372 202.531 399.103C200.59 402.84 199.55 405.673 199.411 407.601C199.358 408.332 199.681 408.489 200.38 408.072C201.007 407.716 202.459 406.584 204.735 404.677ZM226.519 429.308C220.038 425.565 219.227 415.046 224.084 397.751C225.17 393.819 225.682 391.817 225.62 391.746C225.497 391.603 223.42 393.526 219.389 397.513C213.785 402.923 209.595 406.798 206.82 409.138C203.769 411.592 201.426 413.027 199.792 413.443C198.229 413.799 196.826 413.33 195.582 412.037C193.897 410.378 193.484 407.307 194.342 402.824C195.114 398.602 196.746 394.509 199.238 390.544C201.816 386.319 204.48 383.67 207.231 382.599C209.359 381.817 211.746 382.089 214.391 383.416C216.973 384.672 218.848 386.478 220.015 388.835C220.105 389.443 220.575 389.41 221.426 388.736C222.134 388.186 224.009 386.283 227.051 383.026C228.644 381.337 229.744 379.979 230.353 378.953C231.023 377.999 232.032 376.067 233.378 373.156C235.914 367.658 239.286 361.217 243.495 353.834C247.642 346.38 250.441 341.87 251.89 340.303C252.756 339.43 254.109 339.193 255.952 339.594C257.861 339.999 259.072 340.821 259.584 342.061C260.513 344 259.33 347.892 256.034 353.736C252.734 359.647 248.081 366.23 242.077 373.483C239.805 376.26 238.329 378.192 237.649 379.279C236.969 380.367 236.06 382.306 234.923 385.098C229.584 397.947 226.634 408.262 226.073 416.042C225.742 419.694 225.919 422.347 226.601 424C227.223 425.582 228.4 426.403 230.134 426.461C233.074 426.472 237.409 424.279 243.141 419.88C249.295 415.177 255.161 409.384 260.737 402.501C263.157 399.534 264.982 397.393 266.214 396.079C267.297 394.954 268.082 394.275 268.566 394.043C268.908 393.934 269.238 393.991 269.556 394.214C269.618 394.286 269.649 394.321 269.649 394.321C270.413 394.844 270.337 395.908 269.419 397.513C268.349 399.374 265.779 402.564 261.71 407.083C257.056 412.295 252.491 416.745 248.014 420.432C243.323 424.304 239.184 427.014 235.597 428.559C231.729 430.286 228.703 430.535 226.519 429.308ZM268.756 423.232C265.09 421.23 263.072 417.709 262.7 412.669C262.257 407.691 263.53 402.101 266.517 395.9C269.134 390.207 272.137 388.418 275.527 390.535C278.684 392.166 278.739 394.643 275.692 397.966C272.926 401.108 270.881 404.436 269.558 407.95C268.244 411.331 267.839 414.176 268.34 416.485C268.904 418.865 270.316 420.136 272.577 420.299C274.572 420.443 277.313 419.505 280.801 417.484C284.084 415.515 287.516 412.889 291.095 409.604C294.821 406.13 298.091 402.489 300.906 398.682C302.328 396.579 303.634 396.072 304.826 397.16C305.79 397.698 305.965 398.512 305.351 399.604C304.88 400.573 303.157 402.688 300.181 405.949C291.924 414.777 284.798 420.446 278.802 422.954C274.83 424.272 271.481 424.364 268.756 423.232ZM279.813 383.926C278.113 383.402 276.922 382.314 276.239 380.66C275.623 379.012 275.733 377.482 276.57 376.072C277.635 374.277 279.161 373.519 281.146 373.796C282.932 374.058 284.334 374.995 285.354 376.606C286.431 378.354 286.504 380.131 285.572 381.935C285.044 382.766 284.195 383.407 283.027 383.857C281.863 384.241 280.792 384.264 279.813 383.926ZM318.147 378.771C323.338 373.531 327.914 367.545 331.875 360.813C335.836 354.08 338.156 348.332 338.834 343.569C339.182 341.522 339.193 340.453 338.865 340.363C338.537 340.272 337.444 341.062 335.586 342.733C329.34 348.699 322.746 359.953 315.805 376.497C314.263 380.262 313.475 382.378 313.442 382.843C313.423 383.109 313.482 383.214 313.62 383.157C313.757 383.1 314.183 382.763 314.896 382.146C315.333 381.643 316.417 380.518 318.147 378.771ZM300.697 401.073C300.213 400.37 299.496 399.65 298.547 398.913C296.282 396.945 295.521 395.453 296.263 394.437C297.009 393.355 298.7 393.543 301.335 395.003C301.848 395.308 302.266 395.539 302.589 395.695C307.139 382.656 311.728 371.39 316.357 361.899C320.914 352.469 325.232 345.428 329.31 340.776C333.465 335.996 337.045 334.082 340.051 335.034C343.641 336.229 345.043 339.505 344.255 344.862C343.387 350.414 340.477 356.922 335.527 364.385C333.278 367.765 330.545 371.378 327.326 375.223C324.255 378.878 321.462 381.918 318.948 384.343C316.296 386.826 314.644 387.943 313.994 387.696C312.944 387.419 312.284 387.305 312.014 387.352C311.738 387.466 311.431 388.012 311.093 388.99C310.251 391.402 309.442 393.817 308.666 396.234C309.008 396.125 309.449 396.023 309.991 395.929C315.003 395.02 319.587 393.547 323.745 391.507C327.907 389.401 330.951 387.048 332.877 384.446C333.761 383.307 334.51 382.659 335.122 382.503C335.735 382.346 336.55 382.639 337.566 383.381C339.545 384.66 339.25 386.443 336.678 388.731C333.736 391.526 329.706 394.11 324.589 396.481C319.41 398.781 314.595 400.205 310.144 400.752L307.515 401.064L309.286 405.703C311.357 411.267 313.105 414.835 314.529 416.408C316.081 418.058 318.265 418.817 321.082 418.686C324.355 418.722 328.343 417.171 333.048 414.035C337.752 410.899 342.082 406.934 346.038 402.139C347.155 400.549 348.212 399.79 349.21 399.861C351.072 399.996 351.251 401.212 349.749 403.51C348.241 405.874 345.346 408.94 341.064 412.709C336.216 416.904 331.597 419.779 327.207 421.334C322.817 422.888 319.067 422.986 315.957 421.625C311.423 419.627 307.716 415.416 304.838 408.992L304.752 408.785C304.581 409.307 304.452 409.699 304.367 409.96C304.033 410.872 302.902 414.968 300.974 422.248C298.783 430.378 297.164 436.143 296.116 439.543C294.907 443.333 293.851 445.93 292.947 447.336C292.191 448.551 291.272 449.253 290.188 449.442C289.447 449.523 288.823 449.377 288.315 449.006C285.77 447.219 285.195 445.473 286.587 443.769C287.025 443.265 287.691 441.91 288.585 439.702C289.494 437.294 291.882 429.68 295.748 416.858C297.343 411.425 298.993 406.164 300.697 401.073ZM360.613 425.448C362.124 423.953 364.309 421.003 367.167 416.597C370.02 412.258 371.292 409.91 370.983 409.554C370.86 409.411 370.024 409.885 368.475 410.977C366.854 412.13 365.4 413.295 364.112 414.472C360.523 417.889 358.314 421.64 357.485 425.724C357.246 427.177 357.329 427.885 357.733 427.847C358.07 427.805 359.03 427.005 360.613 425.448ZM343.088 432.105C336.582 450.952 332.406 464.821 330.561 473.711C329.38 478.973 329.142 482.264 329.849 483.585C330.418 484.963 330.348 485.927 329.64 486.478C329.003 486.966 328.149 486.771 327.076 485.892C325.875 484.936 325.178 483.482 324.984 481.53C324.805 479.378 325.176 476.096 326.096 471.684C327.016 467.272 328.671 461.009 331.061 452.893C333.185 445.694 336.372 435.33 340.623 421.8C344.713 408.661 347.248 400.388 348.229 396.983C349.024 394.3 349.688 392.51 350.221 391.613C350.682 390.777 351.345 390.391 352.209 390.453C353.273 390.53 354.334 391.108 355.393 392.187C356.518 393.27 357.052 394.211 356.994 395.009C356.956 395.541 355.844 398.435 353.66 403.692L352.547 406.619C356.275 401.274 360.028 396.966 363.806 393.696C367.732 390.236 371.103 388.441 373.92 388.31C376.404 388.155 378.349 388.997 379.753 390.836C381.153 392.742 381.769 395.326 381.6 398.589C381.475 400.318 381.506 401.289 381.691 401.503C381.937 401.788 382.771 401.815 384.191 401.583C386.823 401.239 389.796 401.253 393.111 401.626C396.222 402.051 398.685 402.663 400.498 403.462C402.44 404.337 402.948 405.176 402.021 405.978C401.665 406.287 401.287 406.426 400.888 406.398C400.556 406.374 399.737 406.147 398.431 405.719C393.008 403.991 387.745 403.745 382.643 404.981C381.488 405.232 380.731 405.545 380.369 405.92C380.07 406.366 379.437 407.724 378.471 409.994C375.878 416.29 373.198 421.477 370.43 425.555C367.673 429.5 365.004 432.215 362.424 433.7C359.782 435.114 357.338 435.171 355.092 433.873C352.21 432.128 351.07 429.405 351.671 425.706C352.258 422.205 354.289 418.609 357.763 414.916C361.385 411.033 365.824 407.878 371.079 405.45C372.462 404.814 373.453 404.05 374.052 403.158C374.589 402.194 375.156 400.363 375.751 397.666C376.252 395.363 376.25 393.992 375.747 393.555C375.244 393.118 373.99 393.361 371.985 394.286C367.761 396.321 363.032 400.725 357.797 407.499C352.496 414.269 347.826 422.019 343.787 430.751C343.483 431.264 343.25 431.715 343.088 432.105ZM406.538 410.916C408.234 410.57 409.795 409.781 411.22 408.547C412.641 407.379 413.393 406.23 413.474 405.1C413.542 404.169 413.005 403.729 411.865 403.781C410.725 403.832 409.324 404.266 407.661 405.082C405.926 405.959 404.41 407.053 403.113 408.363C402.11 409.293 401.565 409.889 401.48 410.15C401.389 410.478 401.672 410.732 402.327 410.913C403.562 411.403 404.965 411.404 406.538 410.916ZM455.525 373.946C457.086 370.85 458.313 368.198 459.208 365.99L460.157 363.953C465.88 350.396 469.606 340.907 471.334 335.484C472.115 333 472.729 331.44 473.176 330.804C473.689 330.173 474.478 329.895 475.542 329.972C477.071 330.082 478.396 330.713 479.516 331.863C480.632 333.08 481.139 334.386 481.038 335.783C480.957 336.913 478.361 342.775 473.252 353.368C469.642 360.794 466.364 367.776 463.419 374.315C473.854 375.134 482.958 376.794 490.732 379.293C492.498 379.822 493.667 380.307 494.236 380.749C494.811 381.125 495.169 381.719 495.311 382.531C495.405 383.073 495.301 383.6 494.996 384.112C494.697 384.559 494.388 384.67 494.07 384.447C491.121 382.697 486.715 381.242 480.849 380.084C475.179 379.006 468.848 378.282 461.856 377.911C450.405 403.22 442.393 425.334 437.82 444.254C435.638 453.186 434.183 461.303 433.456 468.603C432.719 476.036 432.858 481.526 433.872 485.075C434.241 486.439 434.407 487.386 434.368 487.918C434.33 488.45 434.068 488.833 433.584 489.065C432.671 489.668 431.586 489.422 430.328 488.329C429.07 487.235 428.2 485.401 427.718 482.827C427.306 480.19 427.19 476.238 427.37 470.971C427.776 461.642 429.545 451.009 432.679 439.07C435.823 426.998 440.723 412.346 447.381 395.114C447.3 395.309 447.11 395.629 446.81 396.076C443.096 402.158 439.342 407.401 435.549 411.806C430.638 417.801 425.189 422.923 419.201 427.169C413.284 431.354 408.165 433.759 403.842 434.383C400.807 434.765 398.085 434.502 395.678 433.593C391.927 431.852 389.734 428.887 389.101 424.697C388.539 420.445 389.658 416.048 392.459 411.504C395.488 406.576 399.186 403.033 403.553 400.875C407.71 398.836 411.429 398.703 414.71 400.477C416.951 401.842 418.028 403.59 417.941 405.723C417.925 407.794 416.701 409.945 414.267 412.175C412.394 414.045 409.936 415.238 406.891 415.754C403.912 416.274 401.632 415.909 400.052 414.659C399.354 414.141 398.827 414.036 398.47 414.344C398.047 414.648 397.436 415.707 396.637 417.52C395.295 420.365 394.738 422.998 394.964 425.421C395.19 427.843 396.118 429.347 397.746 429.932C401.721 431.356 406.17 430.841 411.092 428.389C416.152 425.88 421.97 421.22 428.543 414.409C432.574 410.422 437.062 404.73 442.007 397.333C445.987 391.271 449.837 384.697 453.556 377.613C444.266 377.611 435.822 378.372 428.226 379.896C426.939 380.138 426.129 380.246 425.797 380.222C425.531 380.203 425.175 380.044 424.728 379.744C424.03 379.226 423.62 378.428 423.497 377.349C423.308 376.266 423.522 375.613 424.14 375.391C428.054 374.871 434.472 374.398 443.392 373.972C447.482 373.8 451.526 373.791 455.525 373.946ZM466.164 430.758C467.956 430.019 469.712 428.374 471.433 425.825C473.073 423.47 474.26 420.916 474.994 418.161C475.737 415.274 475.8 413.006 475.184 411.357C474.672 410.117 474.426 409.364 474.445 409.098C474.493 408.433 473.614 408.57 471.808 409.51C470.069 410.454 468.655 411.521 467.567 412.713C465.019 415.603 463.268 419.02 462.316 422.961C461.448 426.642 461.796 429.24 463.357 430.756C463.419 430.828 463.481 430.899 463.542 430.97C463.922 431.265 464.212 431.42 464.411 431.434C464.616 431.382 465.062 431.214 465.751 430.929C465.889 430.872 466.027 430.815 466.164 430.758ZM463.924 435.409C463.663 435.324 463.14 435.152 462.357 434.895C460.457 434.357 458.96 432.879 457.864 430.46C456.764 428.108 456.265 425.299 456.367 422.031C456.56 417.5 457.649 413.534 459.632 410.135C461.539 406.864 463.975 404.6 466.939 403.343C469.971 402.091 473.07 402.215 476.237 403.713C477.533 404.275 478.395 404.838 478.822 405.404C479.249 405.969 479.519 406.858 479.632 408.069L480.164 411.817C480.452 414.311 482.127 416.103 485.19 417.193C487.996 418.13 491.1 418.187 494.502 417.363C498.108 416.487 500.802 414.81 502.585 412.332C503.707 410.675 504.693 410.445 505.542 411.643C506.026 412.346 506.147 412.99 505.904 413.574C505.595 414.153 504.763 415.029 503.409 416.201C500.414 418.792 496.858 420.374 492.74 420.946C488.555 421.513 485.021 420.923 482.139 419.178C481.052 418.498 480.309 418.144 479.91 418.115C479.511 418.086 479.288 418.404 479.24 419.069C479.144 420.399 478.254 422.541 476.57 425.494C474.953 428.452 473.389 430.678 471.877 432.173C470.722 433.36 469.32 434.261 467.672 434.878C466.085 435.565 464.836 435.742 463.924 435.409ZM273.861 492.88C249.965 491.49 226.301 492.924 202.867 497.182C193.92 508.167 186.384 518.117 180.26 527.032C173.77 536.39 169.839 543.158 168.468 547.336C167.692 549.754 166.452 550.266 164.748 548.873C163.604 548.055 163.301 546.696 163.839 544.797C164.311 542.892 165.847 539.661 168.449 535.103C174.517 524.178 182.496 512.255 192.385 499.333C182.532 501.563 173.924 504.15 166.559 507.095C158.853 510.148 152.899 513.461 148.698 517.035C144.282 520.794 142.066 524.644 142.049 528.586C142.029 530.724 141.631 532.065 140.856 532.611C140.087 533.09 139.116 532.653 137.943 531.298C135.798 528.603 135.841 525.231 138.072 521.181C140.226 517.259 144.086 513.327 149.651 509.384C155.358 505.317 161.918 501.947 169.329 499.274C177.287 496.439 186.815 494.085 197.912 492.212C210.767 476.163 224.536 460.881 239.218 446.366C253.891 431.985 266.783 420.984 277.894 413.364C289.907 405.274 297.962 402.48 302.06 404.981C304.172 406.27 305.411 408.097 305.775 410.463C306.191 413.033 305.675 416.939 304.227 422.182C302.946 426.969 300.511 434.313 296.923 444.214C289.917 463.493 284.784 478.596 281.522 489.523C294.194 490.838 304.366 492.976 312.04 495.936C314.894 497.144 316.379 498.321 316.497 499.466C316.682 500.615 315.402 500.757 312.657 499.89C303.193 496.734 292.419 494.587 280.337 493.448C278.46 499.996 276.739 506.723 275.171 513.628C273.503 520.994 272.272 528.324 271.479 535.619C270.638 542.644 270.351 548.472 270.618 553.103C270.8 557.995 271.539 560.722 272.835 561.284C273.353 561.521 273.915 562.063 274.523 562.909C275.196 563.76 275.517 564.418 275.483 564.883C275.416 565.814 274.774 566.37 273.558 566.549C272.347 566.662 271.172 566.277 270.032 565.393C267.502 563.405 265.952 558.949 265.382 552.023C264.798 545.297 265.241 536.84 266.712 526.653C268.196 516.266 270.579 505.009 273.861 492.88ZM208.251 490.652C230.981 487.814 253.248 487.215 275.053 488.855L275.325 487.872C278.144 477.515 283.297 462.146 290.783 441.765C295.2 429.652 298.006 421.332 299.201 416.806C300.397 412.281 300.363 409.972 299.099 409.881C296.905 409.723 292.755 411.662 286.648 415.7C280.756 419.553 273.855 424.87 265.947 431.652C257.762 438.547 249.637 446.015 241.571 454.056C231.133 464.398 220.026 476.597 208.251 490.652ZM316.696 506.799C320.524 500.993 324.156 496.041 327.593 491.945C331.401 487.34 334.341 484.578 336.412 483.658C338.698 482.553 340.584 482.355 342.07 483.063C343.489 483.767 345.032 485.55 346.697 488.41C348.006 490.644 349.157 492.297 350.149 493.372C351.207 494.451 352.359 495.169 353.603 495.526C357.397 496.668 360.38 496.082 362.553 493.765C363.86 492.322 365.074 492.176 366.194 493.326C367.001 494.186 366.855 495.279 365.757 496.603C364.659 497.928 363.121 498.853 361.145 499.378C357.734 500.335 354.452 499.965 351.3 498.267C348.076 496.631 345.494 493.971 343.554 490.289C342.486 488.407 341.763 487.319 341.383 487.024C340.937 486.725 340.295 486.812 339.459 487.286C336.731 488.961 333.269 492.488 329.071 497.866C324.868 503.311 320.522 509.815 316.033 517.379C313.736 521.424 312.114 523.98 311.168 525.048C310.217 526.183 309.205 526.778 308.132 526.834C307.733 526.806 307.115 526.561 306.28 526.099C305.444 525.638 304.993 524.937 304.928 523.996C304.928 523.061 305.293 521.249 306.022 518.561C308.945 508.612 312.153 499.353 315.646 490.782C317.539 486.774 320.083 486.256 323.277 489.227C324.213 490.163 324.611 491.128 324.472 492.12C324.4 493.118 323.732 494.507 322.467 496.287C320.741 498.903 318.817 502.407 316.696 506.799ZM372.501 530.978C368.836 528.975 366.817 525.454 366.446 520.414C366.003 515.436 367.275 509.847 370.262 503.646C372.879 497.953 375.882 496.164 379.272 498.28C382.429 499.912 382.485 502.389 379.438 505.711C376.671 508.854 374.626 512.182 373.303 515.696C371.99 519.077 371.584 521.922 372.086 524.23C372.649 526.61 374.061 527.882 376.322 528.045C378.317 528.189 381.058 527.251 384.546 525.23C387.83 523.261 391.261 520.634 394.84 517.35C398.566 513.876 401.837 510.235 404.651 506.428C406.073 504.325 407.38 503.817 408.571 504.906C409.535 505.443 409.71 506.258 409.097 507.35C408.626 508.319 406.902 510.433 403.927 513.694C395.67 522.523 388.543 528.192 382.547 530.7C378.575 532.018 375.227 532.11 372.501 530.978ZM383.559 491.672C381.859 491.148 380.667 490.059 379.984 488.406C379.368 486.757 379.478 485.228 380.315 483.818C381.381 482.023 382.906 481.264 384.891 481.541C386.677 481.804 388.08 482.74 389.1 484.351C390.177 486.1 390.249 487.877 389.317 489.681C388.789 490.512 387.941 491.152 386.772 491.603C385.608 491.986 384.537 492.009 383.559 491.672ZM401.095 556.602C403.912 555.535 405.998 553.948 407.353 551.84C408.642 549.727 409.426 546.743 409.704 542.886C409.901 540.16 409.841 537.281 409.525 534.251C409.214 531.154 408.825 529.588 408.36 529.555C407.961 529.526 406.559 530.427 404.154 532.259C401.754 534.024 399.941 535.531 398.715 536.779C395.178 540.401 392.867 544.178 391.782 548.11C390.644 551.837 391.048 554.574 392.994 556.318C393.753 556.908 394.967 557.229 396.634 557.283C398.301 557.336 399.788 557.109 401.095 556.602ZM447.521 474.53C452.01 474.386 456.456 474.373 460.859 474.49C461.087 474.105 461.365 473.491 461.694 472.645C462.969 469.796 463.882 467.79 464.434 466.627L465.383 464.59C471.107 451.033 474.833 441.544 476.561 436.121C477.342 433.637 477.956 432.077 478.402 431.441C478.916 430.81 479.705 430.532 480.768 430.609C482.298 430.719 483.623 431.35 484.743 432.5C485.858 433.717 486.365 435.023 486.265 436.42C486.183 437.55 483.588 443.412 478.479 454.005C474.868 461.431 471.591 468.413 468.646 474.952C478.677 475.809 487.415 477.442 494.861 479.851C496.628 480.38 497.796 480.865 498.366 481.307C498.94 481.683 499.298 482.277 499.44 483.089C499.535 483.63 499.43 484.158 499.125 484.67C498.826 485.117 498.517 485.228 498.199 485.005C495.379 483.331 491.103 481.919 485.37 480.77C479.838 479.636 473.742 478.895 467.083 478.549C455.632 503.857 447.62 525.971 443.046 544.891C440.864 553.823 439.41 561.94 438.682 569.24C437.946 576.673 438.084 582.164 439.098 585.712C439.468 587.076 439.633 588.024 439.595 588.556C439.556 589.087 439.295 589.47 438.81 589.702C437.898 590.305 436.813 590.059 435.555 588.966C434.297 587.872 433.427 586.038 432.944 583.464C432.533 580.827 432.417 576.875 432.596 571.608C432.964 562.812 434.55 552.867 437.356 541.773C440.237 530.551 444.615 517.132 450.487 501.514C449.964 502.278 448.807 503.498 447.015 505.173C445.513 506.535 444.087 507.769 442.737 508.875C438.199 512.491 430.256 517.432 418.909 523.699C416.609 525.003 415.041 525.893 414.204 526.367C414.047 526.69 414.224 528.407 414.735 531.519C416.13 540.91 415.362 548.307 412.432 553.71C410.278 557.632 407.112 560.278 402.936 561.648C398.964 562.965 395.177 562.658 391.573 560.727C387.594 558.435 385.492 555.142 385.268 550.848C385.028 546.753 386.506 542.482 389.701 538.034C393.11 533.4 397.77 529.492 403.681 526.31C406.185 524.953 407.388 524.037 407.288 523.562C406.412 519.956 405.8 515.935 405.452 511.499C405.208 507.471 405.678 503.728 406.863 500.271C408.11 496.885 409.806 494.234 411.949 492.316C414.23 490.342 416.701 489.451 419.361 489.643C420.558 489.729 421.533 490.1 422.288 490.756C422.976 491.408 423.263 492.063 423.149 492.723C423.096 493.455 422.531 493.882 421.452 494.005C419.281 494.45 417.278 496.277 415.442 499.486C413.606 502.696 412.545 506.295 412.257 510.285C412.118 512.213 412.149 514.555 412.351 517.31C412.554 520.065 412.788 521.452 413.054 521.471C413.32 521.491 415.189 520.59 418.663 518.768C422.274 516.89 425.303 515.203 427.751 513.709C428.169 513.472 428.798 513.083 429.639 512.542C434.182 509.795 437.623 507.503 439.961 505.667C443.925 502.611 447.069 499.329 449.394 495.82C452.756 490.916 456.021 485.036 459.189 478.179C448.901 478.106 439.957 478.864 432.356 480.454C431.068 480.696 430.258 480.804 429.926 480.78C429.66 480.761 429.304 480.602 428.858 480.302C428.16 479.784 427.749 478.986 427.627 477.907C427.438 476.824 427.652 476.171 428.269 475.948C432.184 475.429 438.601 474.956 447.521 474.53ZM468.443 537.9C464.778 535.898 462.759 532.377 462.388 527.337C461.945 522.359 463.217 516.769 466.204 510.568C468.821 504.875 471.824 503.087 475.214 505.203C478.371 506.834 478.427 509.311 475.38 512.634C472.613 515.776 470.568 519.104 469.245 522.618C467.932 525.999 467.526 528.844 468.028 531.153C468.591 533.533 470.003 534.805 472.264 534.968C474.259 535.112 477 534.173 480.488 532.152C483.772 530.183 487.203 527.557 490.782 524.273C494.508 520.798 497.779 517.158 500.593 513.35C502.015 511.247 503.322 510.74 504.513 511.829C505.477 512.366 505.652 513.181 505.039 514.273C504.568 515.241 502.844 517.356 499.869 520.617C491.612 529.446 484.485 535.114 478.489 537.623C474.517 538.94 471.169 539.033 468.443 537.9ZM479.501 498.594C477.801 498.07 476.609 496.982 475.926 495.328C475.31 493.68 475.42 492.15 476.257 490.74C477.323 488.946 478.848 488.187 480.833 488.464C482.619 488.726 484.022 489.663 485.042 491.274C486.119 493.023 486.191 494.799 485.259 496.603C484.731 497.434 483.883 498.075 482.714 498.525C481.55 498.909 480.479 498.932 479.501 498.594ZM506.112 526.682C508.607 524.523 511.218 522.138 513.947 519.527L518.146 515.519L516.025 512.96C514.734 511.396 513.72 510.621 512.984 510.635C512.314 510.654 511.188 511.441 509.605 512.998C507.813 514.673 505.914 517.377 503.907 521.109C501.966 524.846 500.926 527.678 500.787 529.607C500.734 530.338 501.057 530.495 501.756 530.077C502.383 529.722 503.835 528.59 506.112 526.682ZM527.895 551.314C521.415 547.571 520.603 537.052 525.46 519.757C526.546 515.825 527.058 513.823 526.996 513.752C526.873 513.609 524.796 515.531 520.765 519.518C515.161 524.929 510.971 528.804 508.196 531.144C505.145 533.597 502.802 535.032 501.168 535.449C499.605 535.804 498.202 535.335 496.958 534.042C495.273 532.384 494.86 529.312 495.718 524.829C496.49 520.607 498.123 516.514 500.614 512.55C503.192 508.324 505.856 505.676 508.607 504.604C510.735 503.822 513.122 504.095 515.767 505.422C518.35 506.678 520.224 508.484 521.391 510.841C521.481 511.449 521.951 511.416 522.802 510.742C523.51 510.191 525.385 508.288 528.427 505.032C530.02 503.342 531.12 501.985 531.729 500.959C532.4 500.005 533.408 498.072 534.754 495.162C537.29 489.663 540.662 483.223 544.871 475.84C549.018 468.385 551.817 463.875 553.267 462.309C554.132 461.435 555.486 461.199 557.328 461.599C559.237 462.004 560.448 462.827 560.96 464.067C561.89 466.006 560.706 469.897 557.411 475.742C554.11 481.653 549.457 488.235 543.453 495.489C541.181 498.266 539.705 500.198 539.025 501.285C538.345 502.372 537.436 504.312 536.299 507.104C530.96 519.953 528.01 530.267 527.449 538.047C527.119 541.7 527.295 544.352 527.978 546.006C528.599 547.588 529.776 548.408 531.51 548.466C534.45 548.478 538.786 546.284 544.517 541.885C550.671 537.183 556.537 531.39 562.113 524.507C564.533 521.54 566.359 519.399 567.59 518.084C568.673 516.959 569.458 516.281 569.942 516.048C570.284 515.939 570.614 515.996 570.933 516.22C570.994 516.291 571.025 516.327 571.025 516.327C571.789 516.85 571.713 517.914 570.795 519.519C569.725 521.38 567.155 524.57 563.086 529.089C558.432 534.301 553.867 538.75 549.39 542.438C544.699 546.31 540.56 549.019 536.973 550.565C533.105 552.291 530.079 552.541 527.895 551.314ZM575.919 523.397C577.615 523.052 579.176 522.262 580.601 521.028C582.022 519.861 582.774 518.712 582.855 517.582C582.922 516.651 582.386 516.211 581.246 516.262C580.106 516.314 578.705 516.747 577.042 517.563C575.307 518.441 573.791 519.534 572.494 520.844C571.491 521.775 570.946 522.37 570.861 522.631C570.77 522.959 571.053 523.213 571.708 523.394C572.943 523.884 574.346 523.886 575.919 523.397ZM565.059 546.075C561.307 544.333 559.115 541.368 558.482 537.178C557.92 532.927 559.039 528.529 561.84 523.986C564.869 519.058 568.567 515.515 572.934 513.357C577.091 511.317 580.81 511.184 584.091 512.958C586.332 514.323 587.409 516.072 587.322 518.205C587.306 520.276 586.082 522.426 583.648 524.657C581.775 526.527 579.316 527.72 576.271 528.235C573.293 528.756 571.013 528.391 569.433 527.14C568.735 526.622 568.208 526.517 567.851 526.826C567.428 527.129 566.817 528.188 566.018 530.002C564.676 532.846 564.119 535.48 564.345 537.902C564.571 540.325 565.499 541.829 567.127 542.414C570.385 543.585 574.872 542.538 580.588 539.275C586.3 536.077 592.611 531.052 599.522 524.198C602.26 521.455 604.085 519.782 604.998 519.179C605.839 518.638 606.539 518.655 607.099 519.231C607.47 519.658 607.533 520.164 607.291 520.748C607.048 521.332 606.373 522.353 605.265 523.81C602.465 527.418 599.069 530.95 595.076 534.405C591.222 537.803 587.344 540.598 583.443 542.789C579.465 545.109 576.059 546.467 573.223 546.864C570.188 547.247 567.466 546.984 565.059 546.075Z" fill="#6855E6" />
              <path d="M142.406 404C142.406 404 113.153 412.062 93.9063 413.5C-68.2534 425.615 44.9063 0 44.9063 0" stroke="#6855E6" stroke="#2509d8" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <svg width="720" height="3603" viewBox="0 0 720 3603" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="main" d="M347.906 2.50049C347.906 2.50049 604.906 848.5 670.906 499C736.906 149.5 143.906 1729.5 15.906 1245.5C-112.094 761.5 718.699 1615.6 716.906 2025C715.17 2421.47 96.2366 2398.9 52.906 2793C15.4646 3133.54 396.906 3600 396.906 3600" stroke="#6855E6" strokeWidth="5" strokeLinecap="round" />
            </svg> */}

            <svg width="1372" height="8212" viewBox="0 0 1372 8212" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M425.479 556.405C428.351 554.873 433.786 551.032 441.784 544.883C449.898 538.883 453.987 535.618 454.051 535.088C454.228 533.632 452.463 532.68 448.757 532.23C445.167 531.93 441.828 532.331 438.739 533.434C436.064 534.453 432.987 536.565 429.51 539.769C426.197 542.726 423.315 546.003 420.864 549.601C418.265 553.315 416.813 556.429 416.508 558.944C416.348 560.268 419.338 559.422 425.479 556.405ZM445.147 555.364C435.713 562.279 428.477 566.573 423.439 568.246C418.518 570.067 414.2 569.678 410.486 567.079C406.523 564.315 404.96 560.029 405.799 554.221C406.637 548.413 409.854 541.819 415.449 534.439C424.534 522.646 434.71 517.366 445.977 518.597C453.738 519.941 459.097 522.269 462.053 525.582C462.519 526.176 463.215 526.529 464.141 526.641C467.358 524.479 470.831 524.631 474.562 527.098C480.711 530.664 480.58 535.617 474.171 541.959C468.471 547.984 464.063 554.433 460.947 561.308C458.127 567.951 457.114 573.536 457.908 578.065C458.655 582.99 461.344 585.734 465.977 586.295C469.948 586.776 475.449 585.16 482.48 581.446C489.363 577.848 496.547 572.876 504.031 566.53C511.797 560.085 518.676 553.195 524.668 545.863C527.712 541.8 530.305 540.906 532.447 543.18C534.321 544.347 534.657 546 533.458 548.137C532.291 550.011 528.585 553.994 522.34 560.086C504.972 577.053 490.177 587.751 477.956 592.179C470.259 594.738 463.626 594.606 458.059 591.782C452.391 588.678 448.783 583.54 447.235 576.368C445.803 569.345 446.583 561.246 449.575 552.073L445.147 555.364ZM534.235 573.415C539.429 569.343 544.878 564.833 550.582 559.883L559.36 552.284L555.371 546.965C552.944 543.717 550.995 542.07 549.523 542.026C548.183 541.998 545.857 543.462 542.544 546.418C538.801 549.591 534.744 554.807 530.372 562.067C526.133 569.343 523.78 574.901 523.315 578.739C523.138 580.195 523.768 580.54 525.204 579.774C526.492 579.124 529.502 577.004 534.235 573.415ZM575.359 624.735C562.776 616.629 562.176 595.537 573.559 561.459C576.11 553.71 577.327 549.761 577.211 549.613C576.978 549.316 572.642 552.954 564.203 560.527C552.483 570.791 543.737 578.125 537.965 582.53C531.632 587.134 526.813 589.774 523.508 590.448C520.351 591.005 517.593 589.932 515.235 587.229C512.03 583.751 511.502 577.576 513.652 568.704C515.605 560.345 519.263 552.327 524.626 544.649C530.185 536.459 535.765 531.427 541.364 529.554C545.692 528.198 550.433 528.974 555.587 531.882C560.625 534.642 564.195 538.432 566.297 543.253C566.417 544.477 567.36 544.456 569.125 543.193C570.593 542.162 574.524 538.542 580.917 532.333C584.262 529.112 586.593 526.507 587.908 524.517C589.34 522.676 591.542 518.914 594.514 513.23C600.114 502.493 607.476 489.954 616.601 475.614C625.609 461.126 631.638 452.388 634.686 449.4C636.499 447.739 639.227 447.399 642.869 448.377C646.643 449.372 648.982 451.133 649.884 453.66C651.553 457.623 648.811 465.282 641.66 476.637C634.492 488.125 624.559 500.822 611.86 514.728C607.051 520.055 603.914 523.771 602.45 525.877C600.986 527.983 598.983 531.769 596.44 537.236C584.527 562.386 577.633 582.704 575.756 598.19C574.741 605.454 574.835 610.771 576.038 614.14C577.125 617.361 579.398 619.114 582.855 619.399C588.727 619.707 597.602 615.746 609.478 607.516C622.229 598.719 634.509 587.717 646.318 574.508C651.44 568.817 655.294 564.717 657.881 562.21C660.156 560.069 661.788 558.789 662.779 558.372C663.473 558.187 664.126 558.334 664.74 558.811C664.856 558.959 664.915 559.034 664.915 559.034C666.391 560.153 666.134 562.271 664.145 565.387C661.826 569.001 656.383 575.124 647.816 583.756C638.013 593.715 628.461 602.161 619.159 609.092C609.412 616.372 600.881 621.382 593.565 624.122C585.671 627.194 579.602 627.399 575.359 624.735ZM660.322 616.7C653.195 612.344 649.505 605.114 649.252 595.01C648.851 585.023 651.935 573.981 658.505 561.883C664.285 550.764 670.458 547.483 677.024 552.04C683.173 555.606 683.042 560.559 676.633 566.901C670.801 572.909 666.393 579.359 663.409 586.25C660.457 592.876 659.37 598.52 660.148 603.181C661.042 607.99 663.74 610.667 668.24 611.213C672.211 611.694 677.778 610.086 684.942 606.387C691.693 602.773 698.802 597.86 706.271 591.647C714.052 585.068 720.939 578.113 726.931 570.781C729.976 566.718 732.635 565.831 734.909 568.122C736.783 569.289 737.053 570.933 735.722 573.055C734.687 574.944 731.039 579.002 724.778 585.227C707.426 602.061 692.639 612.693 680.418 617.121C672.356 619.367 665.657 619.227 660.322 616.7ZM686.229 539.255C682.884 538.043 680.61 535.753 679.406 532.384C678.335 529.03 678.704 525.986 680.513 523.251C682.815 519.769 685.936 518.401 689.875 519.147C693.417 519.845 696.128 521.853 698.009 525.17C699.991 528.768 699.963 532.323 697.925 535.837C696.79 537.445 695.033 538.643 692.655 539.429C690.292 540.083 688.15 540.025 686.229 539.255ZM763.307 532.681C774.184 522.717 783.907 511.204 792.475 498.14C801.042 485.075 806.234 473.818 808.051 464.368C808.946 460.313 809.07 458.179 808.424 457.967C807.778 457.754 805.518 459.226 801.643 462.383C788.588 473.694 774.323 495.537 758.848 527.91C755.403 535.282 753.624 539.432 753.512 540.358C753.447 540.888 753.556 541.102 753.837 541.002C754.117 540.902 755 540.27 756.484 539.107C757.406 538.144 759.681 536.002 763.307 532.681ZM726.281 575.537C725.382 574.085 724.021 572.577 722.196 571.013C717.864 566.861 716.488 563.807 718.068 561.85C719.665 559.76 723.024 560.301 728.146 563.474C729.141 564.132 729.953 564.633 730.583 564.978C740.939 539.372 751.201 517.313 761.369 498.802C771.388 480.407 780.698 466.761 789.297 457.865C798.061 448.719 805.4 445.244 811.312 447.438C818.367 450.173 820.848 456.854 818.755 467.479C816.48 478.485 810.037 491.202 799.424 505.63C794.603 512.164 788.791 519.115 781.988 526.484C775.498 533.487 769.624 539.289 764.366 543.89C758.826 548.591 755.419 550.663 754.143 550.105C752.074 549.451 750.766 549.158 750.221 549.227C749.659 549.427 748.993 550.488 748.223 552.409C746.306 557.146 744.455 561.892 742.67 566.645C743.364 566.46 744.256 566.3 745.347 566.163C755.447 564.836 764.749 562.337 773.252 558.666C781.772 554.864 788.081 550.458 792.18 545.448C794.057 543.258 795.616 542.036 796.855 541.784C798.094 541.531 799.693 542.195 801.65 543.775C805.481 546.523 804.717 550.056 799.358 554.376C793.209 559.675 784.908 564.444 774.456 568.684C763.887 572.775 754.13 575.152 745.185 575.814L739.903 576.181L742.989 585.621C746.587 596.936 749.732 604.234 752.423 607.515C755.363 610.961 759.653 612.689 765.293 612.701C771.827 613.09 779.945 610.381 789.648 604.573C799.35 598.765 808.385 591.264 816.752 582.07C819.139 579.002 821.325 577.588 823.31 577.829C827.016 578.278 827.257 580.725 824.032 585.169C820.791 589.746 814.711 595.59 805.79 602.701C795.698 610.611 786.192 615.906 777.272 618.585C768.351 621.265 760.851 621.094 754.77 618.074C745.905 613.642 738.91 604.87 733.784 591.758L733.633 591.337C733.24 592.364 732.946 593.134 732.749 593.647C731.995 595.436 729.338 603.508 724.777 617.864C719.611 633.892 715.817 645.251 713.394 651.942C710.611 659.394 708.248 664.48 706.307 667.2C704.678 669.554 702.773 670.868 700.591 671.141C699.103 671.229 697.87 670.878 696.891 670.088C691.981 666.269 691.001 662.726 693.949 659.457C694.871 658.494 696.333 655.851 698.335 651.527C700.384 646.806 705.893 631.827 714.862 606.589C718.576 595.891 722.382 585.541 726.281 575.537ZM843.604 630.05C846.769 627.21 851.419 621.528 857.556 613.005C863.677 604.614 866.447 600.047 865.865 599.305C865.632 599.008 863.916 599.875 860.715 601.904C857.366 604.05 854.347 606.236 851.66 608.462C844.159 614.94 839.382 622.218 837.329 630.297C836.711 633.177 836.807 634.598 837.618 634.562C838.295 634.51 840.291 633.006 843.604 630.05ZM807.95 641.644C793.121 678.662 783.433 705.961 778.885 723.542C776.013 733.939 775.219 740.491 776.502 743.198C777.505 746.006 777.272 747.925 775.804 748.956C774.485 749.87 772.796 749.397 770.738 747.536C768.432 745.511 767.181 742.538 766.984 738.62C766.836 734.304 767.894 727.784 770.161 719.06C772.427 710.336 776.341 697.984 781.905 682.004C786.846 667.828 794.22 647.434 804.027 620.821C813.473 594.97 819.341 578.691 821.631 571.984C823.48 566.702 824.98 563.19 826.131 561.449C827.134 559.825 828.496 559.117 830.216 559.325C832.334 559.582 834.398 560.839 836.408 563.098C838.549 565.372 839.524 567.303 839.332 568.891C839.203 569.95 836.702 575.624 831.829 585.912L829.32 591.652C837.286 581.336 845.202 573.095 853.067 566.93C861.246 560.4 868.155 557.141 873.794 557.153C878.772 557.085 882.575 558.956 885.202 562.766C887.813 566.709 888.792 571.931 888.138 578.433C887.721 581.875 887.687 583.818 888.036 584.263C888.501 584.857 890.164 584.991 893.024 584.666C898.314 584.233 904.253 584.55 910.839 585.617C917.012 586.768 921.871 588.23 925.417 590.003C929.211 591.94 930.144 593.665 928.215 595.177C927.473 595.759 926.704 596.001 925.91 595.905C925.248 595.825 923.634 595.293 921.067 594.311C910.402 590.332 899.913 589.329 889.6 591.303C887.27 591.692 885.726 592.243 884.968 592.957C884.326 593.82 882.93 596.471 880.78 600.911C874.988 613.237 869.13 623.339 863.206 631.217C857.314 638.83 851.718 643.994 846.42 646.71C841.005 649.277 836.118 649.155 831.758 646.343C826.17 642.577 824.156 637.027 825.717 629.695C827.229 622.76 831.635 615.773 838.935 608.733C846.548 601.329 855.721 595.456 866.455 591.116C869.278 589.981 871.332 588.551 872.615 586.827C873.783 584.953 875.092 581.351 876.544 576.021C877.767 571.468 877.898 568.731 876.935 567.808C875.973 566.886 873.444 567.251 869.348 568.903C860.713 572.557 850.837 580.896 839.723 593.92C828.476 606.928 818.394 621.958 809.478 639.009C808.82 640.004 808.311 640.882 807.95 641.644ZM936.757 605.48C940.179 604.954 943.374 603.528 946.342 601.202C949.294 599.008 950.906 596.786 951.179 594.535C951.404 592.682 950.375 591.752 948.092 591.744C945.81 591.736 942.968 592.466 939.567 593.934C936.017 595.518 932.883 597.556 930.163 600.047C928.069 601.808 926.924 602.945 926.728 603.458C926.515 604.104 927.055 604.64 928.346 605.065C930.765 606.164 933.569 606.302 936.757 605.48ZM1038.21 536.385C1041.63 530.352 1044.33 525.174 1046.34 520.85L1048.43 516.873C1061.18 490.348 1069.55 471.752 1073.52 461.087C1075.33 456.201 1076.7 453.145 1077.66 451.918C1078.74 450.706 1080.35 450.229 1082.47 450.486C1085.51 450.855 1088.09 452.242 1090.22 454.649C1092.33 457.188 1093.22 459.847 1092.88 462.627C1092.61 464.877 1086.85 476.335 1075.62 497C1067.69 511.484 1060.46 525.113 1053.94 537.889C1074.71 540.54 1092.73 544.739 1108.02 550.487C1111.5 551.714 1113.78 552.797 1114.88 553.736C1115.99 554.542 1116.65 555.763 1116.85 557.4C1116.99 558.491 1116.73 559.534 1116.07 560.528C1115.43 561.391 1114.8 561.583 1114.19 561.106C1108.47 557.324 1099.8 553.99 1088.2 551.107C1076.98 548.403 1064.4 546.342 1050.47 544.922C1025.14 594.366 1006.98 637.764 996.009 675.115C990.783 692.748 987.089 708.82 984.927 723.332C982.733 738.109 982.477 749.091 984.157 756.279C984.763 759.038 985.002 760.947 984.873 762.006C984.745 763.065 984.185 763.803 983.195 764.22C981.314 765.336 979.17 764.74 976.763 762.434C974.356 760.127 972.796 756.379 972.082 751.189C971.516 745.882 971.669 737.976 972.539 727.471C974.256 708.876 978.824 687.806 986.244 664.261C993.697 640.452 1004.91 611.658 1019.88 577.881C1019.7 578.262 1019.29 578.884 1018.65 579.746C1010.64 591.535 1002.63 601.645 994.625 610.076C984.232 621.576 972.849 631.276 960.475 639.178C948.249 646.964 937.789 651.27 929.093 652.096C922.992 652.566 917.581 651.775 912.86 649.726C905.536 645.883 901.444 639.746 900.586 631.315C899.876 622.768 902.539 614.092 908.576 605.287C915.106 595.737 922.837 589.019 931.769 585.132C940.273 581.462 947.715 581.558 954.097 585.42C958.441 588.364 960.422 591.962 960.041 596.214C959.809 600.349 957.154 604.527 952.076 608.747C948.153 612.3 943.125 614.444 936.992 615.178C930.992 615.929 926.473 614.978 923.437 612.327C922.093 611.224 921.05 610.963 920.308 611.545C919.434 612.11 918.11 614.166 916.337 617.712C913.381 623.263 912.011 628.469 912.228 633.331C912.445 638.192 914.151 641.287 917.348 642.614C925.15 645.843 934.086 645.247 944.158 640.827C954.511 636.306 966.584 627.562 980.378 614.594C988.817 607.022 998.335 596.087 1008.93 581.792C1017.47 570.067 1025.8 557.31 1033.92 543.52C1015.36 542.614 998.419 543.314 983.096 545.62C980.501 545.977 978.873 546.116 978.211 546.036C977.682 545.971 976.986 545.619 976.123 544.977C974.779 543.874 974.037 542.239 973.897 540.073C973.624 537.891 974.116 536.608 975.371 536.223C983.241 535.565 996.106 535.244 1013.97 535.26C1022.15 535.312 1030.23 535.687 1038.21 536.385ZM1053.94 650.91C1057.59 649.606 1061.26 646.492 1064.95 641.566C1068.45 637.021 1071.07 632.034 1072.8 626.603C1074.57 620.907 1074.92 616.382 1073.84 613.029C1072.94 610.502 1072.52 608.974 1072.59 608.445C1072.75 607.121 1070.98 607.31 1067.28 609.01C1063.72 610.727 1060.79 612.723 1058.5 614.997C1053.13 620.524 1049.3 627.178 1047.01 634.96C1044.92 642.228 1045.36 647.452 1048.34 650.633C1048.45 650.781 1048.57 650.93 1048.68 651.078C1049.41 651.704 1049.98 652.041 1050.37 652.089C1050.79 652.005 1051.7 651.712 1053.1 651.211C1053.38 651.11 1053.66 651.01 1053.94 650.91ZM1049.02 659.983C1048.5 659.786 1047.47 659.393 1045.93 658.804C1042.19 657.544 1039.34 654.446 1037.39 649.508C1035.42 644.703 1034.7 639.041 1035.22 632.523C1036.04 623.49 1038.6 615.675 1042.9 609.077C1047.02 602.727 1052.11 598.441 1058.15 596.219C1064.33 594.013 1070.51 594.56 1076.69 597.861C1079.23 599.109 1080.89 600.318 1081.69 601.489C1082.49 602.661 1082.94 604.462 1083.05 606.892L1083.75 614.431C1084.08 619.441 1087.25 623.183 1093.27 625.658C1098.78 627.804 1104.98 628.219 1111.85 626.903C1119.14 625.503 1124.69 622.415 1128.49 617.637C1130.89 614.437 1132.88 614.074 1134.46 616.548C1135.36 618 1135.54 619.298 1135 620.441C1134.32 621.568 1132.58 623.237 1129.76 625.447C1123.52 630.332 1116.27 633.146 1107.98 633.888C1099.57 634.614 1092.57 633.094 1086.98 629.328C1084.87 627.864 1083.42 627.084 1082.63 626.988C1081.84 626.891 1081.36 627.505 1081.2 628.829C1080.88 631.476 1078.89 635.668 1075.24 641.403C1071.72 647.155 1068.38 651.451 1065.22 654.291C1062.79 656.549 1059.91 658.214 1056.55 659.285C1053.32 660.504 1050.8 660.737 1049.02 659.983ZM663.755 756.327C616.156 751.23 568.743 751.796 521.517 758.026C502.577 779.1 486.557 798.245 473.457 815.46C459.583 833.522 451.074 846.66 447.93 854.875C446.145 859.628 443.618 860.531 440.349 857.582C438.143 855.838 437.669 853.094 438.929 849.352C440.056 845.593 443.439 839.288 449.078 830.436C462.263 809.201 479.359 786.157 500.369 761.305C480.47 764.803 463.022 769.135 448.025 774.301C432.334 779.652 420.118 785.693 411.378 792.423C402.193 799.503 397.392 806.98 396.975 814.853C396.726 819.121 395.802 821.762 394.201 822.777C392.617 823.659 390.72 822.691 388.51 819.871C384.486 814.28 384.9 807.547 389.749 799.673C394.434 792.048 402.526 784.568 414.025 777.231C425.822 769.662 439.253 763.568 454.318 758.947C470.491 754.057 489.752 750.28 512.101 747.617C539.34 716.804 568.33 687.613 599.07 660.045C629.778 632.741 656.6 612.018 679.535 597.875C704.319 582.881 720.682 578.082 728.624 583.477C732.719 586.256 735.016 590.027 735.513 594.788C736.095 599.962 734.685 607.716 731.284 618.048C728.259 627.486 722.682 641.92 714.552 661.349C698.685 699.182 686.963 728.854 679.386 750.365C704.571 754.223 724.685 759.482 739.726 766.14C745.31 768.831 748.164 771.326 748.288 773.624C748.545 775.939 745.974 776.097 740.575 774.1C721.975 766.876 700.663 761.54 676.636 758.09C672.253 770.99 668.159 784.26 664.357 797.902C660.31 812.454 657.139 826.978 654.845 841.474C652.483 855.425 651.344 867.038 651.428 876.316C651.316 886.107 652.527 891.626 655.062 892.874C656.073 893.399 657.144 894.536 658.275 896.285C659.539 898.05 660.114 899.396 660.002 900.322C659.777 902.175 658.442 903.222 655.995 903.463C653.564 903.571 651.254 902.687 649.064 900.81C644.202 896.594 641.539 887.541 641.074 873.651C640.56 860.158 642.267 843.307 646.193 823.1C650.168 802.495 656.022 780.237 663.755 756.327ZM532.907 745.505C578.588 742.043 623.129 743.009 666.529 748.404L667.166 746.466C673.804 726.05 685.591 695.849 702.525 655.862C712.524 632.093 718.938 615.746 721.765 606.821C724.593 597.897 724.749 593.282 722.234 592.977C717.866 592.448 709.387 595.919 696.797 603.392C684.651 610.516 670.35 620.467 653.893 633.247C636.874 646.227 619.917 660.356 603.023 675.634C581.167 695.28 557.795 718.571 532.907 745.505ZM747.972 788.293C756.183 777.066 763.92 767.528 771.184 759.678C779.238 750.85 785.379 745.617 789.606 743.98C794.279 741.995 798.066 741.782 800.966 743.343C803.733 744.887 806.641 748.597 809.69 754.473C812.089 759.062 814.226 762.477 816.104 764.719C818.113 766.978 820.343 768.524 822.794 769.358C830.263 772.009 836.279 771.127 840.844 766.711C843.595 763.955 846.034 763.78 848.16 766.187C849.688 767.984 849.291 770.152 846.969 772.691C844.646 775.23 841.486 776.929 837.487 777.787C830.58 779.368 824.06 778.309 817.927 774.611C811.645 771.029 806.746 765.465 803.228 757.921C801.279 754.058 799.939 751.814 799.209 751.188C798.347 750.546 797.057 750.659 795.34 751.525C789.729 754.606 782.469 761.314 773.561 771.651C764.636 782.12 755.323 794.69 745.62 809.363C740.638 817.221 737.151 822.17 735.157 824.212C733.148 826.386 731.068 827.477 728.918 827.485C728.124 827.389 726.915 826.839 725.29 825.837C723.666 824.834 722.833 823.39 722.793 821.505C722.885 819.635 723.79 816.052 725.507 810.753C732.313 791.163 739.621 772.977 747.43 756.195C751.602 748.373 756.734 747.585 762.827 753.83C764.604 755.791 765.306 757.757 764.933 759.726C764.692 761.712 763.222 764.421 760.523 767.855C756.82 772.912 752.637 779.725 747.972 788.293ZM857.103 842.014C849.975 837.658 846.285 830.428 846.032 820.324C845.631 810.337 848.715 799.294 855.285 787.197C861.065 776.078 867.238 772.797 873.804 777.354C879.953 780.92 879.823 785.873 873.413 792.215C867.581 798.223 863.173 804.673 860.189 811.564C857.237 818.19 856.15 823.834 856.928 828.495C857.823 833.304 860.52 835.981 865.021 836.527C868.991 837.008 874.559 835.4 881.722 831.701C888.473 828.087 895.583 823.174 903.051 816.961C910.832 810.382 917.719 803.427 923.712 796.095C926.756 792.032 929.415 791.145 931.69 793.436C933.563 794.603 933.834 796.247 932.502 798.369C931.467 800.258 927.819 804.316 921.558 810.541C904.206 827.375 889.42 838.007 877.198 842.435C869.136 844.681 862.438 844.541 857.103 842.014ZM883.009 764.568C879.664 763.357 877.39 761.067 876.187 757.698C875.116 754.344 875.485 751.3 877.294 748.564C879.596 745.083 882.716 743.715 886.655 744.461C890.197 745.159 892.908 747.166 894.79 750.484C896.771 754.081 896.743 757.637 894.706 761.151C893.57 762.759 891.814 763.957 889.435 764.743C887.073 765.397 884.931 765.339 883.009 764.568ZM911.733 895.979C917.465 894.122 921.787 891.154 924.699 887.075C927.478 882.979 929.333 877.093 930.264 869.416C930.922 863.989 931.082 858.233 930.745 852.148C930.424 845.931 929.8 842.767 928.874 842.654C928.08 842.558 925.192 844.223 920.21 847.648C915.244 850.941 911.476 853.775 908.905 856.15C901.489 863.041 896.505 870.361 893.954 878.11C891.319 885.446 891.86 890.952 895.579 894.626C897.039 895.877 899.431 896.637 902.756 896.906C906.081 897.175 909.074 896.866 911.733 895.979ZM1012.45 736.539C1021.43 736.688 1030.31 737.093 1039.1 737.754C1039.59 737.008 1040.21 735.807 1040.94 734.15C1043.77 728.583 1045.79 724.664 1047 722.394L1049.1 718.417C1061.85 691.892 1070.21 673.297 1074.19 662.631C1075.99 657.746 1077.37 654.689 1078.32 653.462C1079.41 652.251 1081.01 651.773 1083.13 652.03C1086.18 652.399 1088.76 653.787 1090.89 656.193C1093 658.732 1093.88 661.392 1093.55 664.171C1093.27 666.421 1087.52 677.879 1076.28 698.544C1068.35 713.028 1061.12 726.658 1054.61 739.433C1074.56 742.12 1091.86 746.231 1106.5 751.766C1109.98 752.994 1112.26 754.077 1113.36 755.015C1114.47 755.821 1115.13 757.043 1115.33 758.679C1115.47 759.77 1115.21 760.813 1114.55 761.808C1113.91 762.67 1113.28 762.863 1112.67 762.385C1107.2 758.768 1098.79 755.533 1087.45 752.681C1076.51 749.877 1064.4 747.806 1051.14 746.466C1025.8 795.911 1007.65 839.308 996.675 876.659C991.449 894.292 987.755 910.364 985.593 924.876C983.399 939.653 983.142 950.635 984.823 957.823C985.429 960.582 985.667 962.492 985.539 963.551C985.411 964.61 984.851 965.348 983.86 965.765C981.979 966.88 979.835 966.284 977.429 963.978C975.022 961.672 973.462 957.923 972.748 952.733C972.182 947.426 972.334 939.521 973.205 929.016C974.793 911.479 978.928 891.767 985.61 869.879C992.457 847.742 1002.5 821.359 1015.75 790.73C1014.63 792.207 1012.2 794.531 1008.46 797.704C1005.33 800.279 1002.36 802.605 999.556 804.683C990.138 811.466 973.791 820.565 950.515 831.981C945.794 834.363 942.575 835.988 940.859 836.854C940.514 837.484 940.7 840.931 941.418 847.197C943.292 866.093 941.04 880.795 934.662 891.304C929.977 898.929 923.397 903.907 914.922 906.237C906.86 908.484 899.323 907.503 892.312 903.296C884.586 898.33 880.708 891.547 880.675 882.948C880.595 874.745 883.962 866.356 890.777 857.78C898.037 848.856 907.725 841.501 919.843 835.717C924.977 833.25 927.468 831.538 927.315 830.579C925.915 823.291 925.083 815.199 924.818 806.302C924.722 798.232 926.025 790.802 928.729 784.011C931.548 777.368 935.192 772.236 939.661 768.614C944.41 764.892 949.432 763.352 954.726 763.993C957.109 764.282 959.022 765.118 960.466 766.502C961.778 767.87 962.287 769.208 961.994 770.515C961.818 771.971 960.647 772.77 958.481 772.91C954.101 773.588 949.921 777.043 945.942 783.277C941.963 789.51 939.493 796.597 938.53 804.539C938.065 808.378 937.9 813.059 938.037 818.582C938.173 824.105 938.506 826.899 939.036 826.963C939.565 827.027 943.388 825.409 950.503 822.107C957.899 818.706 964.115 815.632 969.148 812.884C970.007 812.451 971.302 811.735 973.035 810.736C982.377 805.69 989.472 801.446 994.322 798.005C1002.54 792.285 1009.14 786.034 1014.12 779.251C1021.31 769.781 1028.41 758.351 1035.4 744.962C1014.86 743.815 996.916 744.461 981.578 746.9C978.983 747.257 977.354 747.395 976.693 747.315C976.163 747.251 975.467 746.898 974.605 746.256C973.261 745.153 972.519 743.519 972.379 741.353C972.106 739.171 972.597 737.887 973.853 737.502C981.722 736.844 994.588 736.523 1012.45 736.539ZM1048.09 865.162C1040.96 860.806 1037.27 853.576 1037.02 843.472C1036.62 833.485 1039.7 822.442 1046.27 810.345C1052.05 799.226 1058.22 795.945 1064.79 800.502C1070.94 804.067 1070.81 809.021 1064.4 815.363C1058.57 821.371 1054.16 827.821 1051.17 834.712C1048.22 841.338 1047.14 846.982 1047.91 851.643C1048.81 856.452 1051.51 859.129 1056.01 859.675C1059.98 860.156 1065.54 858.547 1072.71 854.849C1079.46 851.235 1086.57 846.322 1094.04 840.108C1101.82 833.53 1108.7 826.575 1114.7 819.243C1117.74 815.18 1120.4 814.293 1122.67 816.583C1124.55 817.751 1124.82 819.395 1123.49 821.517C1122.45 823.406 1118.8 827.463 1112.54 833.689C1095.19 850.523 1080.4 861.155 1068.18 865.583C1060.12 867.829 1053.42 867.689 1048.09 865.162ZM1073.99 787.716C1070.65 786.505 1068.38 784.215 1067.17 780.845C1066.1 777.492 1066.47 774.448 1068.28 771.712C1070.58 768.231 1073.7 766.863 1077.64 767.609C1081.18 768.307 1083.89 770.314 1085.77 773.631C1087.76 777.229 1087.73 780.785 1085.69 784.299C1084.56 785.907 1082.8 787.105 1080.42 787.891C1078.06 788.545 1075.92 788.486 1073.99 787.716ZM1124.43 846.411C1129.62 842.339 1135.07 837.829 1140.77 832.879L1149.55 825.28L1145.56 819.962C1143.13 816.713 1141.19 815.066 1139.71 815.022C1138.37 814.994 1136.05 816.458 1132.73 819.414C1128.99 822.587 1124.93 827.803 1120.56 835.063C1116.32 842.34 1113.97 847.897 1113.51 851.735C1113.33 853.191 1113.96 853.536 1115.39 852.77C1116.68 852.12 1119.69 850.001 1124.43 846.411ZM1165.55 897.732C1152.97 889.625 1152.37 868.533 1163.75 834.455C1166.3 826.706 1167.52 822.757 1167.4 822.609C1167.17 822.312 1162.83 825.95 1154.39 833.523C1142.67 843.787 1133.93 851.122 1128.16 855.526C1121.82 860.131 1117 862.77 1113.7 863.444C1110.54 864.001 1107.78 862.928 1105.43 860.225C1102.22 856.747 1101.69 850.572 1103.84 841.7C1105.8 833.341 1109.45 825.323 1114.82 817.646C1120.38 809.455 1125.96 804.423 1131.55 802.55C1135.88 801.194 1140.62 801.97 1145.78 804.878C1150.82 807.638 1154.39 811.428 1156.49 816.249C1156.61 817.473 1157.55 817.453 1159.32 816.189C1160.78 815.158 1164.71 811.538 1171.11 805.329C1174.45 802.108 1176.78 799.503 1178.1 797.514C1179.53 795.672 1181.73 791.91 1184.7 786.226C1190.3 775.489 1197.67 762.95 1206.79 748.611C1215.8 734.123 1221.83 725.384 1224.88 722.396C1226.69 720.736 1229.42 720.395 1233.06 721.373C1236.83 722.368 1239.17 724.129 1240.07 726.656C1241.74 730.619 1239 738.278 1231.85 749.633C1224.68 761.121 1214.75 773.818 1202.05 787.724C1197.24 793.051 1194.1 796.767 1192.64 798.873C1191.18 800.979 1189.17 804.765 1186.63 810.232C1174.72 835.382 1167.82 855.7 1165.95 871.187C1164.93 878.451 1165.03 883.767 1166.23 887.136C1167.32 890.357 1169.59 892.11 1173.05 892.395C1178.92 892.704 1187.79 888.743 1199.67 880.512C1212.42 871.716 1224.7 860.713 1236.51 847.505C1241.63 841.813 1245.48 837.714 1248.07 835.207C1250.35 833.065 1251.98 831.785 1252.97 831.368C1253.66 831.184 1254.32 831.33 1254.93 831.807C1255.05 831.956 1255.1 832.03 1255.1 832.03C1256.58 833.149 1256.32 835.267 1254.33 838.383C1252.02 841.997 1246.57 848.12 1238.01 856.752C1228.2 866.712 1218.65 875.157 1209.35 882.088C1199.6 889.368 1191.07 894.378 1183.76 897.118C1175.86 900.19 1169.79 900.395 1165.55 897.732ZM1264.19 846.63C1267.62 846.104 1270.81 844.678 1273.78 842.352C1276.73 840.158 1278.34 837.935 1278.62 835.685C1278.84 833.832 1277.81 832.902 1275.53 832.894C1273.25 832.886 1270.41 833.616 1267 835.084C1263.45 836.668 1260.32 838.706 1257.6 841.197C1255.51 842.958 1254.36 844.095 1254.16 844.608C1253.95 845.254 1254.49 845.789 1255.78 846.214C1258.2 847.313 1261.01 847.452 1264.19 846.63ZM1240.3 890.876C1232.97 887.033 1228.88 880.896 1228.02 872.465C1227.31 863.917 1229.98 855.242 1236.01 846.437C1242.54 836.887 1250.27 830.168 1259.21 826.282C1267.71 822.611 1275.15 822.708 1281.53 826.57C1285.88 829.514 1287.86 833.112 1287.48 837.364C1287.25 841.499 1284.59 845.677 1279.51 849.896C1275.59 853.45 1270.56 855.594 1264.43 856.328C1258.43 857.078 1253.91 856.128 1250.87 853.477C1249.53 852.373 1248.49 852.113 1247.74 852.694C1246.87 853.26 1245.55 855.316 1243.77 858.861C1240.82 864.413 1239.45 869.619 1239.66 874.48C1239.88 879.342 1241.59 882.436 1244.78 883.764C1251.18 886.419 1260.24 884.765 1271.98 878.8C1283.7 872.968 1296.8 863.542 1311.27 850.522C1317 845.307 1320.81 842.143 1322.69 841.028C1324.43 840.029 1325.82 840.131 1326.89 841.334C1327.58 842.225 1327.66 843.242 1327.12 844.385C1326.58 845.528 1325.13 847.501 1322.78 850.305C1316.83 857.24 1309.71 863.965 1301.39 870.479C1293.36 876.893 1285.35 882.099 1277.34 886.098C1269.17 890.346 1262.23 892.729 1256.53 893.246C1250.43 893.715 1245.02 892.925 1240.3 890.876Z" fill="#000000"/>
                <path d="M464.663 1.5C464.663 1.5 -214.143 841.928 106.663 766C245.849 733.058 413.163 565.5 413.163 565.5" stroke="#000000" strokeWidth="25"/>
                <path id="main" d="M468.664 706C468.664 706 1253.71 1339.27 1175.66 1863C1094.17 2409.89 82.6638 3529.5 82.6638 2763C82.6638 1996.5 805.664 4299.5 1175.66 3716.5C1545.66 3133.5 -10.8411 4231.73 7.66378 4873.5C25.0581 5476.76 1057.5 5364.04 1100.66 5966C1145.76 6595 12.3091 6592.82 82.6638 7219.5C141.136 7740.34 993.664 8205 993.664 8205" stroke="#000000" strokeWidth="25"/>
            </svg>


          </div>
        </div>






      </div>
      <Footer />
    </ReactLenis>

  );
}
