// components/careers/CareersForm.js
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import FileInput from "./ui/FileInput";
import EducationGroup from "./EducationGroup";
import Label from "./ui/Label";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

export default function CareersForm() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/saveToCareersSheet", {
        method: "POST",
        body: data, // multipart/form-data (keeps files)
      });

      const json = await res.json();
      if (!res.ok) {
        alert(t("careers.alerts.error"));
        console.error(json?.error || json);
      } else {
        alert(t("careers.alerts.success"));
        form.reset();
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert(t("careers.alerts.unexpected"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 md:grid-cols-12"
      encType="multipart/form-data"
    >
      {/* Job Opening */}
      <div className="md:col-span-6">
        <Label htmlFor="jobOpening" required>{t("careers.fields.jobOpening.label")}</Label>
        <Select id="jobOpening" name="jobOpening" required defaultValue="">
          <option value="" disabled>{t("careers.fields.jobOpening.placeholder")}</option>
          <option value="agent">{t("careers.fields.jobOpening.options.agent")}</option>
          <option value="csr">{t("careers.fields.jobOpening.options.csr")}</option>
          <option value="sales">{t("careers.fields.jobOpening.options.sales")}</option>
          <option value="marketing">{t("careers.fields.jobOpening.options.marketing")}</option>
        </Select>
      </div>

      {/* First & Last Name */}
      <div className="md:col-span-3">
        <Label htmlFor="firstName" required>{t("careers.fields.firstName.label")}</Label>
        <Input id="firstName" name="firstName" type="text" required />
      </div>
      <div className="md:col-span-3">
        <Label htmlFor="lastName" required>{t("careers.fields.lastName.label")}</Label>
        <Input id="lastName" name="lastName" type="text" required />
      </div>

      {/* Email */}
      <div className="md:col-span-6">
        <Label htmlFor="email" required>{t("careers.fields.email.label")}</Label>
        <Input id="email" name="email" type="email" placeholder={t("careers.fields.email.placeholder")} required />
      </div>

      {/* Phone */}
      <div className="md:col-span-6">
        <Label htmlFor="phone" required>{t("careers.fields.phone.label")}</Label>
        <Input id="phone" name="phone" type="tel" placeholder={t("careers.fields.phone.placeholder")} required />
      </div>

      {/* Address */}
      <div className="md:col-span-6">
        <Label htmlFor="address1">{t("careers.fields.address1.label")}</Label>
        <Input id="address1" name="address1" type="text" />
      </div>
      <div className="md:col-span-6">
        <Label htmlFor="address2">{t("careers.fields.address2.label")}</Label>
        <Input id="address2" name="address2" type="text" />
      </div>
      <div className="md:col-span-4">
        <Label htmlFor="city">{t("careers.fields.city.label")}</Label>
        <Input id="city" name="city" type="text" />
      </div>
      <div className="md:col-span-4">
        <Label htmlFor="state">{t("careers.fields.state.label")}</Label>
        <Select id="state" name="state" defaultValue="">
          <option value="">{t("careers.fields.state.placeholder")}</option>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div className="md:col-span-4">
        <Label htmlFor="zip">{t("careers.fields.zip.label")}</Label>
        <Input id="zip" name="zip" type="text" inputMode="numeric" />
      </div>

      {/* Compliance / IDs */}
      <div className="md:col-span-6">
        <Label htmlFor="ssn">{t("careers.fields.ssn.label")}</Label>
        <Input id="ssn" name="ssn" type="text" placeholder={t("careers.fields.ssn.placeholder")} />
      </div>
      <div className="md:col-span-3">
        <Label htmlFor="npn" required>{t("careers.fields.npn.label")}</Label>
        <Input id="npn" name="npn" type="text" required />
      </div>
      <div className="md:col-span-3">
        <Label htmlFor="dob" required>{t("careers.fields.dob.label")}</Label>
        <Input id="dob" name="dob" type="date" required />
      </div>

      {/* Photo IDs */}
      <div className="md:col-span-6">
        <FileInput id="frontPhotoId" label={t("careers.fields.frontPhotoId.label")} />
      </div>
      <div className="md:col-span-6">
        <FileInput id="backPhotoId" label={t("careers.fields.backPhotoId.label")} />
      </div>

      {/* Education */}
      <div className="md:col-span-6">
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          {t("careers.fields.education.question")}
        </p>
        <EducationGroup />
      </div>

      {/* NIPR & Resume */}
      <div className="md:col-span-6">
        <FileInput id="nipr" label={t("careers.fields.nipr.label")} />
      </div>
      <div className="md:col-span-6">
        <FileInput id="resume" label={t("careers.fields.resume.label")} />
      </div>

      {/* Languages */}
      <div className="md:col-span-6">
        <Label htmlFor="languages">{t("careers.fields.languages.label")}</Label>
        <Input id="languages" name="languages" type="text" placeholder={t("careers.fields.languages.placeholder")} />
      </div>

      {/* Employment history */}
      <div className="md:col-span-6">
        <Label htmlFor="recentEmployment">{t("careers.fields.recentEmployment.label")}</Label>
        <Textarea
          id="recentEmployment"
          name="recentEmployment"
          placeholder={t("careers.fields.recentEmployment.placeholder")}
        />
      </div>

      {/* Employment status */}
      <div className="md:col-span-6">
        <Label htmlFor="employmentStatus">{t("careers.fields.employmentStatus.label")}</Label>
        <Select id="employmentStatus" name="employmentStatus" defaultValue="student">
          <option value="full-time">{t("careers.fields.employmentStatus.options.full-time")}</option>
          <option value="part-time">{t("careers.fields.employmentStatus.options.part-time")}</option>
          <option value="unemployed">{t("careers.fields.employmentStatus.options.unemployed")}</option>
          <option value="student">{t("careers.fields.employmentStatus.options.student")}</option>
          <option value="other">{t("careers.fields.employmentStatus.options.other")}</option>
        </Select>
      </div>

      {/* Felony radio */}
      <div className="md:col-span-6">
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          {t("careers.fields.felony.question")}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input type="radio" name="felony" value="yes" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
            <span>{t("careers.fields.felony.yes")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="felony" value="no" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
            <span>{t("careers.fields.felony.no")}</span>
          </label>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {t("careers.fields.felony.note")}
        </p>
      </div>

      {/* Availability & Referral */}
      <div className="md:col-span-6">
        <Label htmlFor="availableDate">{t("careers.fields.availableDate.label")}</Label>
        <Input id="availableDate" name="availableDate" type="date" />
      </div>
      <div className="md:col-span-6">
        <Label htmlFor="referral">{t("careers.fields.referral.label")}</Label>
        <Input id="referral" name="referral" type="text" placeholder={t("careers.fields.referral.placeholder")} />
      </div>

      {/* Submit */}
      <div className="md:col-span-12 flex justify-center pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
        >
          {submitting ? t("careers.button.submitting") : t("careers.button.submit")}
        </button>
      </div>
    </form>
  );
}
