import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import initTranslations from "../i18n";
import TranslationsProvider from "@/lib/TranslationProvider";
import ResponsiveFooter from "@/components/MobileFooter";

const i18nNamespaces = ["translation"];

async function PrivacyPolicyPage({ params: { locale } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow pt-[40px] pb-20 px-4 md:px-8 bg-gray-50 flex justify-center">
                    <div className="w-full max-w-[800px] bg-white p-8 md:p-10 rounded-lg shadow-xl border border-gray-200 h-fit">
                        <div className="mb-8 border-b pb-6">
                            <h1 className="text-3xl font-bold mb-4 text-black">
                                {t("privacy_policy.title")}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {t("privacy_policy.commitment")}
                            </p>
                        </div>

                        <div className="space-y-8 text-gray-800">
                            {/* Information We Collect Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.information_we_collect.title")}
                                </h2>
                                <div className="space-y-4 pl-5">
                                    <div>
                                        <h3 className="font-semibold mb-1 text-black">
                                            {t("privacy_policy.information_we_collect.pii.title")}
                                        </h3>
                                        <p className="text-gray-700">
                                            {t("privacy_policy.information_we_collect.pii.content")}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1 text-black">
                                            {t("privacy_policy.information_we_collect.npii.title")}
                                        </h3>
                                        <p className="text-gray-700">
                                            {t("privacy_policy.information_we_collect.npii.content")}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* How We Collect Information Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.how_we_collect_information.title")}
                                </h2>
                                <div className="space-y-4 pl-5">
                                    <div>
                                        <h3 className="font-semibold mb-1 text-black">
                                            {t("privacy_policy.how_we_collect_information.from_you.title")}
                                        </h3>
                                        <p className="text-gray-700">
                                            {t("privacy_policy.how_we_collect_information.from_you.content")}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1 text-black">
                                            {t("privacy_policy.how_we_collect_information.from_cookies.title")}
                                        </h3>
                                        <p className="text-gray-700">
                                            {t("privacy_policy.how_we_collect_information.from_cookies.content")}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* How We Use Your Information Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.how_we_use_your_information.title")}
                                </h2>
                                <ul className="list-disc list-inside space-y-2 pl-5 text-gray-700">
                                    {t("privacy_policy.how_we_use_your_information.content", { returnObjects: true })?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Information Sharing Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.information_sharing.title")}
                                </h2>
                                <div className="space-y-4 pl-5">
                                    {t("privacy_policy.information_sharing.content", { returnObjects: true })?.map((item, index) => (
                                        <div key={index}>
                                            <h3 className="font-semibold mb-1 text-black">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-700">{item.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Cookies and Tracking Technologies Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.cookies_and_tracking_technologies.title")}
                                </h2>
                                <ul className="list-disc list-inside space-y-2 pl-5 text-gray-700">
                                    {t("privacy_policy.cookies_and_tracking_technologies.content", { returnObjects: true })?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* How We Protect Your Information Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.how_we_protect_your_information.title")}
                                </h2>
                                <ul className="list-disc list-inside space-y-2 pl-5 text-gray-700">
                                    {t("privacy_policy.how_we_protect_your_information.content", { returnObjects: true })?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Your Privacy Rights Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.your_privacy_rights.title")}
                                </h2>
                                <ul className="list-disc list-inside space-y-2 pl-5 text-gray-700">
                                    {t("privacy_policy.your_privacy_rights.content", { returnObjects: true })?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Children's Privacy Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.childrens_privacy.title")}
                                </h2>
                                <p className="pl-5 text-gray-700">
                                    {t("privacy_policy.childrens_privacy.content")}
                                </p>
                            </section>

                            {/* Changes to This Policy Section */}
                            <section>
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.changes_to_this_policy.title")}
                                </h2>
                                <p className="pl-5 text-gray-700">
                                    {t("privacy_policy.changes_to_this_policy.content")}
                                </p>
                            </section>

                            {/* Contact Us Section */}
                            <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h2 className="font-bold text-xl mb-4 text-black border-l-4 border-[#3685b4] pl-4">
                                    {t("privacy_policy.contact_us.title")}
                                </h2>
                                <div className="space-y-2 pl-5 italic text-gray-700">
                                    <p>{t("privacy_policy.contact_us.content.address")}</p>
                                    <p>{t("privacy_policy.contact_us.content.email")}</p>
                                    <p className="whitespace-pre-line">{t("privacy_policy.contact_us.content.phone")}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                <ResponsiveFooter>
                    <Footer />
                </ResponsiveFooter>
            </div>
        </TranslationsProvider>
    );
}

export default PrivacyPolicyPage;
