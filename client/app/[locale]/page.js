import initTranslations from "../i18n";

import styles from "./page.module.css";

export default async function Home({ params }) {
    const { t } = await initTranslations(params.locale, ["home"]);
    return <main>{t("home:test")}</main>;
}
