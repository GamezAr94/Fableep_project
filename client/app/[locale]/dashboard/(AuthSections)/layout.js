import "../../globals.css";
import Header from "../../../components/header/header";
import TranslationsProvider from "@/app/components/translationsProvider";
import initTranslations from "@/app/i18n";
import { ToastContainer } from "react-toastify";

export const metadata = {
    title: "Fableep",
    description: "AI Bedtime Story Generator",
    manifest: "/manifest.json",
};

export const viewport = {
    themeColor: "#D18255",
};

// Languages
const i18nNamespaces = ["authenticate"];

export default async function RootLayout({ params, children }) {
    const { resources } = await initTranslations(params.locale, i18nNamespaces);
    return (
        <html lang="en">
            <body>
                <TranslationsProvider
                    resources={resources}
                    locale={params.locale}
                    namespaces={i18nNamespaces}>
                    <Header />
                    <ToastContainer />
                    {children}
                </TranslationsProvider>
            </body>
        </html>
    );
}
