"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t } = useTranslation();

  // Safe translation retrieval with fallbacks
  const services = t("company.services", { returnObjects: true }) || [];
  // console.log(services, "checl");
  const usefulLinks =
    t("company.useful_links_data", { returnObjects: true }) || [];

  return (
    <footer className="bg-footer text-white pt-5">
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link href='/'>
            <Image
              src="/images/H4HLogo.svg"
              width={175}
              height={150}
              alt="Health for Haitians Logo"
            />
            </Link>
          </div>

          {/* Services */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-center md:text-left">
              {t("company.title")}
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start"
                >
                  <span className="mr-2 text-white">
                    <IoIosArrowDroprightCircle />
                  </span>
                  {service === "Privacy Policy" ||
                  "Règleman Konfidansyalite" ||
                  "Política de Privacidad" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="hover:text-blue-600 cursor-pointer">
                          {service}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] sm:max-h-[700px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-semibold mb-4">
                            {t("privacy_policy.title")}
                          </DialogTitle>
                          <DialogDescription>
                            {t("privacy_policy.commitment")}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-4">
                          {/* Information We Collect Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.information_we_collect.title")}
                            </h2>
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-semibold mb-1">
                                  {t(
                                    "privacy_policy.information_we_collect.pii.title"
                                  )}
                                </h3>
                                <p>
                                  {t(
                                    "privacy_policy.information_we_collect.pii.content"
                                  )}
                                </p>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1">
                                  {t(
                                    "privacy_policy.information_we_collect.npii.title"
                                  )}
                                </h3>
                                <p>
                                  {t(
                                    "privacy_policy.information_we_collect.npii.content"
                                  )}
                                </p>
                              </div>
                            </div>
                          </section>

                          {/* How We Collect Information Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t(
                                "privacy_policy.how_we_collect_information.title"
                              )}
                            </h2>
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-semibold mb-1">
                                  {t(
                                    "privacy_policy.how_we_collect_information.from_you.title"
                                  )}
                                </h3>
                                <p>
                                  {t(
                                    "privacy_policy.how_we_collect_information.from_you.content"
                                  )}
                                </p>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1">
                                  {t(
                                    "privacy_policy.how_we_collect_information.from_cookies.title"
                                  )}
                                </h3>
                                <p>
                                  {t(
                                    "privacy_policy.how_we_collect_information.from_cookies.content"
                                  )}
                                </p>
                              </div>
                            </div>
                          </section>

                          {/* How We Use Your Information Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t(
                                "privacy_policy.how_we_use_your_information.title"
                              )}
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                              {t(
                                "privacy_policy.how_we_use_your_information.content",
                                { returnObjects: true }
                              ).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>

                          {/* Information Sharing Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.information_sharing.title")}
                            </h2>
                            <div className="space-y-3">
                              {t("privacy_policy.information_sharing.content", {
                                returnObjects: true,
                              }).map((item, index) => (
                                <div key={index}>
                                  <h3 className="font-semibold mb-1">
                                    {item.title}
                                  </h3>
                                  <p>{item.content}</p>
                                </div>
                              ))}
                            </div>
                          </section>

                          {/* Cookies and Tracking Technologies Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t(
                                "privacy_policy.cookies_and_tracking_technologies.title"
                              )}
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                              {t(
                                "privacy_policy.cookies_and_tracking_technologies.content",
                                { returnObjects: true }
                              ).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>

                          {/* How We Protect Your Information Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t(
                                "privacy_policy.how_we_protect_your_information.title"
                              )}
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                              {t(
                                "privacy_policy.how_we_protect_your_information.content",
                                { returnObjects: true }
                              ).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>

                          {/* Your Privacy Rights Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.your_privacy_rights.title")}
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                              {t("privacy_policy.your_privacy_rights.content", {
                                returnObjects: true,
                              }).map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>

                          {/* Children's Privacy Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.childrens_privacy.title")}
                            </h2>
                            <p>
                              {t("privacy_policy.childrens_privacy.content")}
                            </p>
                          </section>

                          {/* Changes to This Policy Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.changes_to_this_policy.title")}
                            </h2>
                            <p>
                              {t(
                                "privacy_policy.changes_to_this_policy.content"
                              )}
                            </p>
                          </section>

                          {/* Contact Us Section */}
                          <section>
                            <h2 className="font-bold text-xl mb-3">
                              {t("privacy_policy.contact_us.title")}
                            </h2>
                            <div className="space-y-2">
                              <p>
                                {t("privacy_policy.contact_us.content.address")}
                              </p>
                              <p>
                                {t("privacy_policy.contact_us.content.email")}
                              </p>
                              <p>
                                {t("privacy_policy.contact_us.content.phone")}
                              </p>
                            </div>
                          </section>
                        </div>

                        <DialogFooter className="mt-4">
                          <Button variant="outline" type="button">
                            {t("navigation.close")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : service === "Terms of Service" ||
                    "Tèm Sèvis" ||
                    "Términos de Servicio" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="hover:text-blue-600 cursor-pointer">
                          {service}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] sm:max-h-[700px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-semibold mb-4">
                            {t("terms_and_conditions.title")}
                          </DialogTitle>
                          <DialogDescription className="mb-4">
                            {t("terms_and_conditions.welcome")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[60vh] space-y-4">
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.acceptance_of_terms.title"
                            )}
                          </h2>
                          {t(
                            "terms_and_conditions.acceptance_of_terms.content",
                            {
                              returnObjects: true,
                            }
                          ).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                          <h2 className="font-bold">
                            {t("terms_and_conditions.use_of_the_site.title")}
                          </h2>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.use_of_the_site.license_to_use.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.use_of_the_site.license_to_use.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.use_of_the_site.prohibited_activities.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.use_of_the_site.prohibited_activities.content.0"
                            )}
                          </p>
                          {t(
                            "terms_and_conditions.use_of_the_site.prohibited_activities.content",
                            { returnObjects: true }
                          )
                            .slice(1)
                            .map((item, index) => (
                              <p key={index}>{item}</p>
                            ))}
                          <p>
                            {t(
                              "terms_and_conditions.use_of_the_site.site_modifications.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.information_you_provide.title"
                            )}
                          </h2>
                          {t(
                            "terms_and_conditions.information_you_provide.content",
                            { returnObjects: true }
                          ).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                          <h2 className="font-bold">
                            {t("terms_and_conditions.privacy.title")}
                          </h2>
                          <p>{t("terms_and_conditions.privacy.content")}</p>
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.title"
                            )}
                          </h2>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.program_name_and_description.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.program_name_and_description.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.message_frequency_and_cadence.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.message_frequency_and_cadence.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.message_and_data_rates.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.message_and_data_rates.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.eligibility.title"
                            )}
                          </h3>
                          {t(
                            "terms_and_conditions.sms_terms_of_service.eligibility.content",
                            { returnObjects: true }
                          ).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.opt_in_agreement.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.opt_in_agreement.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.opt_out_instructions.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.opt_out_instructions.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.sms_terms_of_service.customer_care_contact_information.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.customer_care_contact_information.content"
                            )}
                          </p>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.customer_care_contact_information.Email"
                            )}
                          </p>
                          <p>
                            {t(
                              "terms_and_conditions.sms_terms_of_service.customer_care_contact_information.Phone"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.privacy_and_data_sharing.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.privacy_and_data_sharing.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.disclaimer_and_liability.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.disclaimer_and_liability.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.intellectual_property.title"
                            )}
                          </h2>
                          <p>
                            {t(
                              "terms_and_conditions.intellectual_property.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t("terms_and_conditions.disclaimers.title")}
                          </h2>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.disclaimers.no_professional_advice.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.disclaimers.no_professional_advice.content"
                            )}
                          </p>
                          <h3 className="font-semibold">
                            {t(
                              "terms_and_conditions.disclaimers.no_guarantee_of_results.title"
                            )}
                          </h3>
                          <p>
                            {t(
                              "terms_and_conditions.disclaimers.no_guarantee_of_results.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.limitation_of_liability.title"
                            )}
                          </h2>
                          {t(
                            "terms_and_conditions.limitation_of_liability.content",
                            { returnObjects: true }
                          ).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.arbitration_and_dispute_resolution.title"
                            )}
                          </h2>
                          <p>
                            {t(
                              "terms_and_conditions.arbitration_and_dispute_resolution.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t("terms_and_conditions.termination.title")}
                          </h2>
                          <p>{t("terms_and_conditions.termination.content")}</p>
                          <h2 className="font-bold">
                            {t(
                              "terms_and_conditions.changes_to_these_terms.title"
                            )}
                          </h2>
                          <p>
                            {t(
                              "terms_and_conditions.changes_to_these_terms.content"
                            )}
                          </p>
                          <h2 className="font-bold">
                            {t("terms_and_conditions.contact_us.title")}
                          </h2>
                          {t("terms_and_conditions.contact_us.content", {
                            returnObjects: true,
                          }).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                        <DialogFooter className="mt-4">
                          <Button
                            variant="outline"
                            onClick={() =>
                              document
                                .querySelector("[data-state='open']")
                                .click()
                            }
                          >
                            {t("navigation.close")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Link href="/" className="hover:text-blue-600">
                      {service}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center md:text-left">
              {t("company.useful_links.title")}
            </h3>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start"
                >
                  <span className="mr-2 text-white">
                    <IoIosArrowDroprightCircle />
                  </span>
                  <Link href={link.href || "/"} className="hover:text-blue-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black w-full py-4">
        <div className="border-t border-gray-700 w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center py-4">
          <p className="text-xs sm:text-lg text-center md:text-left mb-4 md:mb-0">
            {t("company.copyright")}
          </p>
          <div className="flex space-x-4">
            <FaFacebookF className="text-white hover:text-blue-500 cursor-pointer" />
            <FaWhatsapp className="text-white hover:text-green-500 cursor-pointer" />
            <FaInstagram className="text-white hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
