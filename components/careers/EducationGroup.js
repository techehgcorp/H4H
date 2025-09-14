// components/careers/EducationGroup.js
"use client";

import { useTranslation } from "react-i18next";

export default function EducationGroup() {
  const { t } = useTranslation();

  const options = [
    ["hs", t("careers.fields.education.options.hs")],
    ["some", t("careers.fields.education.options.some")],
    ["cert", t("careers.fields.education.options.cert")],
    ["assoc", t("careers.fields.education.options.assoc")],
    ["bach", t("careers.fields.education.options.bach")],
    ["mast", t("careers.fields.education.options.mast")],
  ];

  return (
    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
      {options.map(([val, label]) => (
        <label key={val} className="flex items-center gap-2">
          <input
            type="checkbox"
            name="education"
            value={val}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
