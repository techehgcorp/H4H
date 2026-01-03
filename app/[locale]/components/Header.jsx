"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  FaCalendar,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaPhone,
  FaPhoneVolume,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GoogleTranslate } from "@/lib/googleTranslate";
import { getPrefLangCookie } from "@/lib/getPrefLangCookie";
import { useTranslation } from "react-i18next";
import LanguageChanger from "@/components/LanguageChanger";

const Header = () => {
  const { t } = useTranslation();
  const pathname = usePathname(); // Get the current pathname
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  const isHomePage = pathname === "/";
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formPosition, setFormPosition] = useState(
    formRef?.current?.getBoundingClientRect()?.top
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    insuranceType: Yup.array()
      .min(1, "Select at least one insurance type")
      .required(),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string().required("Date of birth is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip Code must be 5 digits")
      .required("Zip code is required"),
    email: Yup.string()
      .email("Invalid email address")
      .optional("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^(?:(\+1\s?)?(\(\d{3}\)|\d{3})[\s-]?(\d{3})[\s-]?(\d{4})|(\d{11}))$/,
        "Phone number must be in the format: (123) 456-7890, 123-456-7890, or 1234567890"
      )
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      insuranceType: [],
      firstName: "",
      lastName: "",
      dob: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
      consent: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        insuranceType: values.insuranceType.join(", "),
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob,
        zipCode: values.zipCode,
        email: values.email,
        phoneNumber: values.phoneNumber,
        consent: values.consent,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/saveToGoogleSheet", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === 200) {
            if (values?.email) {
              await fetch("/api/submit-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
            }

            Swal.fire({
              icon: "success",
              title: "Form Submitted!",
              text: "Your form has been submitted successfully! An agent will reach out to you soon.",
              confirmButtonColor: "#17f0ff",
              width: "25rem",
            });
            formik.resetForm();
            setIsSubmitting(false);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `Oops! ${error}`,
            text: "Something went wrong while submitting the form. Please try again.",
            confirmButtonColor: "#B92031",
          });
          formik.resetForm();
          setIsSubmitting(false);
        });
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setFormPosition(formRef?.current?.getBoundingClientRect().top);
      const screenPosition = window.innerHeight / 10;
      if (formPosition < screenPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [formPosition]);

  let heroImage = "url(/default-hero-image.jpg)";
  let pageTitle = "Page";

  switch (pathname) {
    case "/about":
      heroImage = "url(/path-to-about-hero-image.jpg)";
      pageTitle = "About";
      break;
    case "/pages":
      heroImage = "url(/path-to-pages-hero-image.jpg)";
      pageTitle = "Pages";
      break;
    case "/policies":
      heroImage = "url(/path-to-policies-hero-image.jpg)";
      pageTitle = "Policies";
      break;
    case "/faq":
      heroImage = "url(/path-to-faq-hero-image.jpg)";
      pageTitle = "FAQ";
      break;
    case "/blogs":
      heroImage = "url(/path-to-blogs-hero-image.jpg)";
      pageTitle = "Blogs";
      break;
    case "/life-insurance":
      heroImage = "url(/path-to-life-insurance-hero-image.jpg)";
      pageTitle = "Life Insurance";
      break;
    default:
      heroImage = "url(/default-hero-image.jpg)";
      pageTitle = "Page";
  }

  const slides = t("slides", { returnObjects: true });

  const insuranceTypes = [
    {
      title: t("contact_form.insurance_types.health"),
    },
    {
      title: t("contact_form.insurance_types.dental"),
    },
    {
      title: t("contact_form.insurance_types.vision"),
    },
    {
      title: t("contact_form.insurance_types.medicare"),
    },
    {
      title: t("contact_form.insurance_types.life"),
    },
  ];

  const handleLinkClick = (href) => {
    router.push(href); // Use router to navigate
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto text-[#3685b4] py-4 px-4 lg:px-8 flex justify-between items-center text-base">
            {/* Logo Section - Moved to Top Bar */}
            <div className="flex items-center mr-6 lg:mr-8">
              <Link href='/'>
                <Image
                  alt="logo"
                  src="/images/HHlogo.png"
                  width={110}
                  height={45}
                  className="w-[110px] h-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Contact & Socials */}
            <div className="hidden lg:flex w-full justify-between items-center flex-1">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 border-2 border-[#3685b4] rounded-full flex items-center justify-center">
                    <FaPhoneVolume className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex flex-col text-[#3685b4] font-bold leading-tight">
                    <Link href='http://wa.me/17863977167' className="hover:text-blue-700 transition text-base">
                      (786) 397-7167
                    </Link>
                    <span className="text-base">(844) 544-0663</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 border-2 border-[#3685b4] rounded-full flex items-center justify-center">
                    <MdOutlineMailOutline className="w-7 h-7 text-red-600" />
                  </div>
                  <Link href="mailto:info@h4hinsurance.com">
                    <span className="text-[#3685b4] font-bold text-lg hover:text-blue-700 transition">
                      info@h4hinsurance.com
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex space-x-6 items-center">
                <a href="https://www.tiktok.com/@h4h.insurance" className="flex hover:text-gray-600 transition">
                  <FaTiktok className="w-8 h-8 text-[#3685b4] hover:text-black" />
                </a>
                <a href="https://www.facebook.com/people/Health-4-Haitians/61567682720657/#" className="flex hover:text-gray-600 transition">
                  <FaFacebook className="w-8 h-8 text-[#3685b4] hover:text-blue-800" />
                </a>
                <a href="https://www.instagram.com/health4haitians/" className="flex hover:text-gray-600 transition">
                  <FaInstagram className="w-8 h-8 text-[#3685b4] hover:text-pink-600" />
                </a>
                <a href="http://wa.me/17863977167" className="flex hover:text-gray-600 transition">
                  <FaWhatsapp className="w-8 h-8 text-[#3685b4] hover:text-green-600" />
                </a>
                <div className="text-black ml-4">
                  <LanguageChanger />
                </div>
              </div>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden block ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="hover:text-gray-600 p-2">
                    <FaBars className="w-8 h-8 text-[#3685b4]" />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    {/* ... content checks out ... */}
                    <SheetTitle> {t("navigation.navigate")}</SheetTitle>
                    <SheetDescription>
                      {t("navigation.choose_page")}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4 text-lg">
                    <nav className="py-4">
                      <ul className="flex flex-col space-y-4">
                        <li>
                          <Link
                            href="/"
                            onClick={() => handleLinkClick("#home")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.home")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about-us"
                            onClick={() => handleLinkClick("/about-us")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.about_us")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/health"
                            onClick={() => handleLinkClick("/health")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.health")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dental"
                            onClick={() => handleLinkClick("/dental")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.dental_vision")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/life"
                            onClick={() => handleLinkClick("/life")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.life")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/medicare"
                            onClick={() => handleLinkClick("/medicare")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.medicare")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/mission"
                            onClick={() => handleLinkClick("/mission")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.mission")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/referafriend"
                            onClick={() => handleLinkClick("#referafriend")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.referafriend")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/community"
                            onClick={() => handleLinkClick("#community")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.community")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/testimonials"
                            onClick={() => handleLinkClick("#testimonials")}
                            className="hover:text-[#13287B] py-2 px-2"
                          >
                            {t("navigation.menu_items.testimonials")}
                          </Link>
                        </li>
                        <li className="">
                          <div className="flex justify-center items-center w-[80%]">
                            <button
                              onClick={() => handleLinkClick("appointment")}
                              className="flex items-center justify-center"
                            >
                              <img
                                src="images/calendar3D.png"
                                className="h-12 w-12"
                              />
                              <span className="hover:text-primary-darkAqua text-xs text-gray-800 py-1">
                                {t("misc.schedule")}
                              </span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">{t("navigation.close")}</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Main Navigation */}
      </header>

      {/* Spacer to push content down because of fixed top bar and floating nav */}
      <header className="sticky top-[120px] z-40 w-full flex justify-center mt-[120px] pointer-events-none">
        <div className="bg-[#3685b4] shadow-xl flex justify-between items-center w-[95%] max-w-[1400px] mx-auto rounded-full px-10 py-3 pointer-events-auto">
          {/* Logo removed from here */}

          <div className="hidden lg:flex justify-start items-center flex-1">
            <nav className="text-white w-full">
              <div className="text-[1.1rem] font-medium flex space-x-8 items-center">

                {/* Home */}
                <Link href="/" className="hover:text-gray-200 text-white py-2 mr-4 transition-colors">
                  {t("navigation.menu_items.home")}
                </Link>

                {/* About Us */}
                <Link href="/about-us" className="whitespace-nowrap hover:text-gray-200 text-white py-2 mr-4 transition-colors">
                  {t("navigation.menu_items.about_us")}
                </Link>

                {/* Mission */}
                <Link href="/mission" className="hover:text-gray-200 text-white py-2 mr-4 transition-colors">
                  {t("navigation.menu_items.mission")}
                </Link>

                {/* Products Dropdown com espaçamento reduzido */}

                <NavigationMenu>
                  <NavigationMenuList className="flex">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-gray-200 text-white text-[1.1rem] py-2">
                        {t("navigation.menu_items.products")}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white w-[400px] shadow-lg rounded-md border-0">
                        <div className="p-4">
                          <NavigationMenuLink asChild>
                            <Link href="/health" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.health")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/dental" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.dental_vision")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/life" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.life")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/medicare" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.medicare")}
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>


                {/* Community Dropdown com espaçamento reduzido */}

                <NavigationMenu>
                  <NavigationMenuList className="flex">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-gray-200 text-white text-[1.1rem] py-2">
                        {t("navigation.menu_items.community")}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white w-[400px] shadow-lg rounded-md border-0">
                        <div className="p-4">
                          <NavigationMenuLink asChild>
                            <Link href="/community" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.community")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/testimonials" className="block px-4 py-2 hover:bg-gray-100 text-[#3685b4]">
                              {t("navigation.menu_items.testimonials")}
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>


                {/* Refer a Friend */}
                <Link href="/referafriend" className="whitespace-nowrap hover:text-gray-200 text-white py-2 ml-4 transition-colors">
                  {t("navigation.menu_items.referafriend")}
                </Link>

              </div>
            </nav>
          </div>

          <div className="hidden lg:flex justify-end items-center">
            <button
              onClick={() => handleLinkClick("appointment")}
              className="bg-white text-[#3685b4] hover:bg-gray-100 font-bold py-3 px-6 rounded-full shadow-md transition transform hover:scale-105"
            >
              Schedule your Appointment
            </button>
          </div>
        </div>
      </header>


      <header>
        {/* Hero Section */}
        {isHomePage ? (
          <div className="relative h-[24rem] lg:h-[32rem]  bg-cover bg-center rounded-md">
            <Image
              src="/images/slider/african.jpeg"
              alt="main"
              layout="fill"
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-3xl text-white space-y-4 animate-slideIn">
                <h1 className="text-lg md:text-4xl mb-6 font-bold leading-normal">
                  {t("misc.afford")}
                </h1>
                <h2 className="text-base ml-0 sm:ml-10 md:text-2xl max-w-2xl py-5 font-bold leading-normal">
                  {t("misc.protect")}
                </h2>
                <div className="inline-block">
                  <button
                    onClick={() => {
                      router.push("/quote");
                    }}
                    className="bg-primary-darkAqua hover:bg-[#0A4958] text-white font-bold py-2 px-8 rounded-full transition-colors duration-300"
                  >
                    {t("misc.quote")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
