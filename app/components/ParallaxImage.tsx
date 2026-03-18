"use client";

import { useLenis } from "lenis/react";
import React, { useRef, useEffect } from "react";
import WaterImage from "./WaterImg";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

type ParallaxImageProps = {
  src: string;
  alt?: string;

  height?: number | string;
  width?: number | string;

  strength?: number;
};

const ParallaxImage = ({
  src,
  alt = "",
  height = 400,
  width = "100%",
  strength = 0.2,
   
}: ParallaxImageProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const bounds = useRef<{ top: number; bottom: number } | null>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const updateBounds = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      bounds.current = {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      };
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = () => {
      if (!imageRef.current) return;

      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      imageRef.current.style.transform = `
        translate3d(0, ${currentY.current}px, 0)
      `;

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;

    const center =
      (bounds.current.top + bounds.current.bottom) / 2;

    targetY.current = (scroll - center) * strength;
  });

  return (
    <div
      ref={wrapperRef}
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
       
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: "-20% 0",
          width: "100%",
          height: "140%",
          objectFit: "cover",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ParallaxImage;


// "use client";

// import { useLenis } from "lenis/react";
// import React, { useRef, useEffect } from "react";

// const lerp = (start: number, end: number, factor: number) => {
//   return start + (end - start) * factor;
// };

// type ParallaxImageProps = {
//   src: string;
//   alt?: string;
//   strength?: number;
// };

// const ParallaxImage = ({
//   src,
//   alt = "",
//   strength = 0.2,
// }: ParallaxImageProps) => {
//   const imageRef = useRef<HTMLImageElement | null>(null);
//   const bounds = useRef<{ top: number; bottom: number } | null>(null);

//   const currentY = useRef(0);
//   const targetY = useRef(0);
//   const rafId = useRef<number | null>(null);

//   useEffect(() => {
//     const updateBounds = () => {
//       if (!imageRef.current) return;

//       const rect = imageRef.current.getBoundingClientRect();
//       bounds.current = {
//         top: rect.top + window.scrollY,
//         bottom: rect.bottom + window.scrollY,
//       };
//     };

//     updateBounds();
//     window.addEventListener("resize", updateBounds);

//     const animate = () => {
//       if (!imageRef.current) return;

//       currentY.current = lerp(
//         currentY.current,
//         targetY.current,
//         0.1
//       );

//       if (Math.abs(currentY.current - targetY.current) > 0.01) {
//         imageRef.current.style.transform = `
//           translate3d(0, ${currentY.current}px, 0) scale(1.25)
//         `;
//       }

//       rafId.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener("resize", updateBounds);
//       if (rafId.current) cancelAnimationFrame(rafId.current);
//     };
//   }, []);

//   useLenis(({ scroll }) => {
//     if (!bounds.current) return;

//     const center = (bounds.current.top + bounds.current.bottom) / 2;
//     const distance = scroll - center;

//     targetY.current = distance * strength;
//   });

//   return (
//     <img
//       ref={imageRef}
//       src={src}
//       alt={alt}
//       style={{
//         willChange: "transform",
//         transform: "translate3d(0,0,0) scale(1.25)",
//       }}
//     />
//   );
// };

// export default ParallaxImage;


// "use client"
// import { useLenis } from 'lenis/react'
// import React, { useRef , useEffect, ReactElement} from 'react'

// const lerp = (start: number, end: number, factor: number) => {
//   return start + (end - factor) * factor
// }
// const ParallaxImage = ({ src, alt}) => {
//   const imageRef = useRef(null)
//   const bounds = useRef(null)
//   const currentTranslateY = useRef(0)
//   const targetTranslateY = useRef(0)
//   const rafId = useRef(null)

//   useEffect(() => {
//      const updateBounds = () => {
//         if(imageRef.current){
//             /*@ts-ignore*/
//             const rect = imageRef.current.getBoundingClientRect();
//             /*@ts-ignore*/
//             bounds.current = {
//                 top: rect.top + window.scrollY,
//                 bottom: rect.bottom + window.scrollY
//             }
//         }
//      }
//      updateBounds()
//      window.addEventListener('resize', updateBounds)
//      const animate = () => {
//         if(imageRef.current){
//             currentTranslateY.current = lerp(
//                 currentTranslateY.current,
//                 targetTranslateY.current,
//                 0.1
//             );

            
//             if(
//                 Math.abs(currentTranslateY.current - targetTranslateY.current  > 0.01)
//             ){
//                 /*@ts-ignore*/
//                 imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
//             }
           
//         }
//         /*@ts-ignore*/
//         rafId.current = requestAnimationFrame(animate)
//      };
//      animate()

//      return ()=> {
//         window.removeEventListener('resize', updateBounds)
//         if(rafId.current){
//             cancelAnimationFrame(rafId.current)
//         }
//      }
//   }, [])


//   useLenis(({scroll}) => {
//     if(!bounds.current) return;
//     /*@ts-ignore*/
//     const relativeScroll = scroll - bounds.current.top;
//     targetTranslateY.current = relativeScroll * 0.2;
//   })
//   return (
//       <img
//        ref={imageRef} 
//        src={src} 
//        alt={alt} 
//        style={{ 
//           willChange:"transform",
//           transform:"translateY(0) scale(1.25)"  
//        }}
//     />
//   )
// }

// export default ParallaxImage
