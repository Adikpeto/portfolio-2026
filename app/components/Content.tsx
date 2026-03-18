import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

export default function Content() {
    return (
        <div className='bg-[#000] py-8 px-12 h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}



const Section2 = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;

    useEffect(() => {
        // @ts-ignore
        gsap.set(secondText.current, { left: secondText.current.getBoundingClientRect().width })
        requestAnimationFrame(animate);
    }, [])



    const animate = () => {
        if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, { xPercent: xPercent })
        gsap.set(secondText.current, { xPercent: xPercent })
        requestAnimationFrame(animate);
        xPercent += 0.1;

    }

    return (
        <>
           
            <div className='flex flex-col'>
                <div ref={slider} className='overflow-hidden whitespace-nowrap flex flex-row items-center gap-[3rem]'>
                    <p ref={firstText} className='whitespace-nowrap text-[14vw]' >Freelance Developer - </p>
                    <p ref={secondText} className='whitespace-nowrap text-[14vw]'>Freelance Developer - </p>
                </div>
                {/* <h1 className='text-[14vw] leading-[0.8] mt-10'>Sticky Footer</h1> */}
                <p>©copyright</p>
            </div>
        </>

    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20'>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
                <p>Home</p>
                <p>Projects</p>
                <p>Our Mission</p>
                <p>Contact Us</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
                <p>News</p>
                <p>Learn</p>
                <p>Certification</p>
                <p>Publications</p>
            </div>
        </div>
    )
}