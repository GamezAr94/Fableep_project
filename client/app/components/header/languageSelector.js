import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";

export default function LanguageSelector({ language, children }) {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChangeLang = () => {
        const days = process.env.I18N_EXPIRES_IN;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60);
        const expires = "; expires=" + date.toUTCString();
        document.cookie = `NEXT_LOCALE=${language};expires=${expires};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push("/" + language + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${language}`)
            );
        }

        router.refresh();
    };

    return <li onClick={handleChangeLang}>{children}</li>;
}
