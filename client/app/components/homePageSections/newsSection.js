"use client";
import Slider from "react-slick";
import styles from "./newsSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function NewsSection() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "ease-out",
        autoplaySpeed: 4000,
    };
    return (
        <div className={styles.news_container}>
            <h6>Ignite Curiosity</h6>
            <h4>Create a life changing habit</h4>
            <Slider className={styles.slider_comp} {...settings}>
                <div className={styles.slide_container}>
                    <div className={styles.text_part}>
                        <p>
                            Unleash the creativity and curiosity by fostering a
                            love for the books.
                        </p>
                    </div>
                    <div className={styles.image_part}>
                        <Image
                            src="/images/general/bear_v2.png"
                            alt="A cute bear sleeping among books in a clear and tranquile night"
                            width={1456} // Adjust for your image's actual size
                            height={816}
                            quality={80}
                            loading="lazy"></Image>
                    </div>
                </div>
                <div className={styles.slide_container}>
                    <div className={styles.text_part}>
                        <p>
                            Unleash the creativity and curiosity by fostering a
                            love for the books.
                        </p>
                    </div>
                    <div className={styles.image_part}>
                        <Image
                            src="/images/general/bear_v2.png"
                            alt="A cute bear sleeping among books in a clear and tranquile night"
                            width={1456} // Adjust for your image's actual size
                            height={816}
                            quality={80}
                            loading="lazy"></Image>
                    </div>
                </div>
            </Slider>
        </div>
    );
}
