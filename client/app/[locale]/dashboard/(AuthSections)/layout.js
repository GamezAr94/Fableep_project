import "../../globals.css";
import Header from "../../../components/header/header";
import TranslationsProvider from "@/app/components/translationsProvider";
import initTranslations from "@/app/i18n";

export const metadata = {
    title: "Fableep",
    description: "AI Bedtime Story Generator",
    manifest: "/manifest.json",
};

export const viewport = {
    themeColor: "#D18255",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}