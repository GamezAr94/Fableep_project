import initTranslations from "../i18n";

export default async function Home({ params }) {
    const { t } = await initTranslations(params.locale, ["home"]);
    return <main>{t("home:test")}</main>;
}
