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

export default function RootLayout({ params, children }) {
    return (
        <html lang={params.locale}>
            <body>
                <Header menuType={"dashboard"} />
                {children}
            </body>
        </html>
    );
}
