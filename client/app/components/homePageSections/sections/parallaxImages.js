"use client";
import Image from "next/image";
import styles from "./parallaxImages.module.css";
import { useState, useEffect, useRef } from "react";

export default function ParallaxImages() {
    const imageRefs = useRef([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isClient, setIsClient] = useState(false); // Hydration state

    useEffect(() => {
        setIsClient(true); // Set to true when client-side rendering is ready

        function handleScroll() {
            const viewportHeight = window.innerHeight;
            const scrollTop = Math.max(
                0,
                (window.scrollY || document.documentElement.scrollTop) -
                    viewportHeight * 0.2
            );
            const maxScroll =
                viewportHeight *
                (window.innerWidth < 900
                    ? 1.5
                    : window.innerWidth < 1249
                    ? 1.3
                    : 0.9); // Simplified breakpoint logic
            setScrollProgress(Math.min(1, scrollTop / maxScroll));
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function getConvertedValue(smScreen, mScreen, lScreen) {
        const windowWidth = isClient ? window.innerWidth : 0; // Handle server-side rendering
        return windowWidth > 1249
            ? lScreen
            : windowWidth > 900
            ? mScreen
            : smScreen;
    }

    const imageData = [
        {
            startPosX: getConvertedValue(-100, -200, -200),
            endPosX: getConvertedValue(200, 450, 600),
            startPosY: getConvertedValue(300, 500, 0),
            endPosY: getConvertedValue(-280, -240, -200),
            rotateStart: -200,
            rotateEnd: 25,
        },
        {
            startPosX: getConvertedValue(-100, 250, 200),
            endPosX: getConvertedValue(-240, -450, -600),
            startPosY: getConvertedValue(300, 400, 0),
            endPosY: getConvertedValue(-230, -290, -270),
            rotateStart: 20,
            rotateEnd: -250,
        },
        {
            startPosX: getConvertedValue(100, 250, 200),
            endPosX: getConvertedValue(-170, -300, -450),
            startPosY: getConvertedValue(-300, -400, -120),
            endPosY: getConvertedValue(120, 90, 50),
            rotateStart: 120,
            rotateEnd: -150,
        },
        {
            startPosX: getConvertedValue(-100, -250, -200),
            endPosX: getConvertedValue(190, 280, 400),
            startPosY: getConvertedValue(-300, -400, -120),
            endPosY: getConvertedValue(90, 40, 30),
            rotateStart: 0,
            rotateEnd: 310,
        },
    ];

    return (
        <>
            {imageData.map((data, index) => (
                <Image
                    className={`${styles.one} ${styles.img}`}
                    key={index}
                    ref={(el) => (imageRefs.current[index] = el)}
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquil night"
                    width={1456}
                    height={816}
                    style={
                        isClient // Conditionally apply styles only on the client side
                            ? {
                                  transform: `translate(${
                                      data.startPosX +
                                      scrollProgress *
                                          (data.endPosX - data.startPosX)
                                  }px, ${
                                      data.startPosY +
                                      scrollProgress *
                                          (data.endPosY - data.startPosY)
                                  }px) rotate(${
                                      data.rotateStart +
                                      scrollProgress *
                                          (data.rotateEnd - data.rotateStart)
                                  }deg)`,
                              }
                            : {} // Empty styles for server-side rendering
                    }
                    quality={80}
                    loading="lazy"
                />
            ))}
        </>
    );
}
