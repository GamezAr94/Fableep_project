"use client";
import Image from "next/image";
import styles from "./parallaxImages.module.css";
import { useState, useEffect, useRef } from "react";

export default function ParallaxImages() {
    const imageRefs = useRef([]);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // animation starting point, we will start counting after the 300 of height
            const scrollTop =
                (window.scrollY || document.documentElement.scrollTop) < 200
                    ? 0
                    : window.scrollY || document.documentElement.scrollTop;

            // animation ending point depending on the screen widht
            // the grather the number the latter it will stop
            let ending = 0.9;
            if (window.innerWidth < 1249 && window.innerWidth > 900) {
                ending = 1.3;
            } else if (window.innerWidth <= 900) {
                ending = 1.5;
            }
            const scrollHeight = window.innerHeight * ending;
            // store the value in the hook and dont keep counting just stop at 1 (100%)
            setScrollProgress(
                scrollTop / scrollHeight >= 1 ? 1 : scrollTop / scrollHeight
            );
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    function getConvertedValue(smScreen, mScreen, lScreen) {
        if (typeof window === "undefined") {
            return 0;
        }
        const windowWidth = window.innerWidth;
        if (windowWidth > 1249) {
            return lScreen;
        } else if (windowWidth > 900 && windowWidth < 1250) {
            return mScreen;
        }
        return smScreen;
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
        // Add more image data as needed
    ];

    return (
        <>
            {imageData.map((data, index) => (
                <Image
                    className={`${styles.one} ${styles.img}`}
                    key={index}
                    ref={(el) => (imageRefs.current[index] = el)}
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    style={{
                        transform: `translate(${
                            data.startPosX +
                            scrollProgress * (data.endPosX - data.startPosX)
                        }px, ${
                            data.startPosY +
                            scrollProgress * (data.endPosY - data.startPosY)
                        }px) rotate(${
                            data.rotateStart +
                            scrollProgress * (data.rotateEnd - data.rotateStart)
                        }deg)`,
                    }}
                    quality={80}
                    loading="lazy"></Image>
            ))}
        </>
    );
}
