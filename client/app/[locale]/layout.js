import "./globals.css";
import Header from '../components/header/header';

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
                <Header />
                {children}
            </body>
        </html>
    );
}
