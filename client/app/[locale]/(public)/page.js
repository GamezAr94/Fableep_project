import MainDescription from "@/app/components/homePageSections/mainDescription";
import styles from "./page.module.css";
import BannerSection from "@/app/components/homePageSections/bannerSection";
import PhoneImageSection from "@/app/components/homePageSections/phoneImageSection";
import NewsSection from "@/app/components/homePageSections/newsSection";
import MotivateSection from "@/app/components/homePageSections/sections/motivateSection";
import BooksSection from "@/app/components/homePageSections/sections/booksSection";
import BenefitsSection from "@/app/components/homePageSections/sections/benefitsSection";

export default function Home() {
    return (
        <>
            <div className={styles.main_container}>
                <MainDescription />
                <BannerSection />
                <PhoneImageSection />
                <NewsSection />
            </div>
            <MotivateSection />
            <BooksSection />
            <BenefitsSection />
        </>
    );
}
