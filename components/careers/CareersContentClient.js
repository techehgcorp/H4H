// components/careers/CareersContentClient.js
"use client";

import { useTranslation } from "react-i18next";
import CareersForm from "@/components/careers/CareersForm";

export default function CareersContentClient() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-20 top-24 hidden h-[600px] w-[600px] rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-600/10 md:block" />
      <div className="pointer-events-none absolute -right-24 bottom-10 hidden h-[520px] w-[520px] rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-600/10 md:block" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {t("careers.title")}
          </h1>
        </header>

        <p className="mt-[-12px] mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {t("careers.subtitle")}
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-neutral-950/80">
          <CareersForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          {t("careers.footerNote")}
        </p>
      </div>
    </section>
  );
}
