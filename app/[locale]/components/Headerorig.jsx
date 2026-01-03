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

  // const slides = [
  //   {
  //     imageUrl: "/images/slider/african.jpeg",
  //     title:
  //       "Together We are Building a Healthier Haiti, One Family at a Time.",
  //     url: "/about-us",
  //     buttonText: "Learn More",
  //   },
  //   {
  //     imageUrl: "/images/slider/african3.jpeg",
  //     title:
  //       "Comprehensive Health Plans for Individuals, Family and Medicare Options.",
  //     url: "/health",
  //     buttonText: "Compare Plans",
  //   },
  //   {
  //     imageUrl: "/images/slider/african2.jpg",
  //     title: "Find an Affordable Dental & Vision Plan for Your Family.",
  //     url: "/dental",
  //     buttonText: "Discover More",
  //   },
  //   {
  //     imageUrl: "/images/slider/african3.jpg",
  //     title: "Protect Your Family's Financial Future with Life Insurance.",
  //     url: "/appointment",
  //     buttonText: "Contact Agent",
  //   },
  // ];

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

  // const prefLangCookie = getPrefLangCookie();

  return (
    <>
        <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
        {/* Top Bar */}
        <div className="bg-primary-darkAqua ">
          <div className="container mx-auto text-white py-4 px-0 lg:px-6 md:px-4 flex justify-end items-center text-sm">
            <div className="flex flex-col sm:flex-row w-full justify-between items-center">
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-10">
                <div className="flex items-center ">
                  <FaPhoneVolume className="w-8 h-8 text-[#B92031]" />
                  <span className="text-white font-bold  px-2 text-[1.2rem]">
                  <Link href='http://wa.me/17863977167'>
                    (786) 397-7167
                    </Link> 
                    <br/>
                    <span className="block mt-2">(844) 544-0663</span>
                  </span>                  

                </div>
                <div className="flex items-center">
                  <MdOutlineMailOutline className="w-8 h-8 text-[#B92031]" />
                  <Link href="mailto:info@h4hinsurance.com">
                    <span className="text-white font-bold px-2 text-xl">
                    info@h4hinsurance.com
                    </span>                  
                  </Link>

                </div>
              </div>
              <div className=" flex space-x-4 mt-4 sm:mt-0">
              <a href="https://www.tiktok.com/@h4h.insurance" className="lg:flex hover:text-gray-400">
                  <FaTiktok className="w-6 h-6 text-white hover:text-blue-800" />
                </a>
                <a href="https://www.facebook.com/people/Health-4-Haitians/61567682720657/#" className="lg:flex hover:text-gray-400">
                  <FaFacebook className="w-6 h-6 text-white hover:text-blue-800" />
                </a>
                <a href="https://www.instagram.com/health4haitians/" className="lg:flex hover:text-gray-400">
                  <FaInstagram className="w-6 h-6 text-white hover:text-pink-800" />
                </a>
                <a href="http://wa.me/17863977167" className="lg:flex hover:text-gray-400">
                  <FaWhatsapp className="w-6 h-6 text-white hover:text-green-800" />
                </a>
                <div className="text-black">
                  <LanguageChanger />
                </div>
              </div>
              <div className="lg:hidden block lg:mt-0 mt-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="hover:text-gray-400">
                      <FaBars className="w-6 h-6 text-white" />
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
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
                          {/* <li>
                            <Link
                              href="/contact"
                              onClick={() => handleLinkClick("contact")}
                              className="hover:text-[#13287B] py-2 px-2"
                            >
                              {t("navigation.menu_items.contact")}
                            </Link>
                          </li> */}
                          <li className="">
                            <div className="flex justify-center items-center w-[80%]">
                              <button
                                onClick={() => handleLinkClick("appointment")}
                                className="flex items-center justify-center"
                                // className="bg-primary-darkAqua p-4 rounded-full hover:bg-[#0A4958] text-white hover:text-white animate-shadow-pulse"
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
        </div>
        {/* Main Navigation */}
      </header>
      <header className="bg-white sticky top-0 z-40 shadow-md">
        <div className="bg-white shadow-md flex justify-center lg:justify-start items-center w-full mx-auto pt-[60px] pb-[2px]">
          <div className="flex lg:pl-[5rem] justify-center items-center text-[#0A4958] my-5 xl:w-5/12 w-[20%] mt-8 mr-20">
            <Link href='/'>
              <Image
                alt="logo"
                src="/images/HHlogo.png"
                width={130}
                height={50}
              />
            </Link>
          </div>

          <div className="hidden lg:flex justify-center items-center md:w-[60%]">
            <nav className="text-black">
              <div className="text-[1.35rem] flex space-x-8"> {/* ⬅️ Espaçamento reduzido aqui */}
                <Link href="/" className="hover:text-primary-darkAqua text-[#8d8d8d] py-2">
                  {t("navigation.menu_items.home")}
                </Link>

                <Link href="/about-us" className="whitespace-nowrap hover:text-primary-darkAqua text-[#8d8d8d] py-2">
                  {t("navigation.menu_items.about_us")}
                </Link>

                <NavigationMenu>
                  <NavigationMenuList className="flex">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="hover:text-primary-darkAqua text-[1.28rem] text-[#8d8d8d] py-2">
                        {t("navigation.menu_items.products")}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white w-[400px] shadow-lg rounded-md">
                        <div className="p-4">
                          <NavigationMenuLink asChild>
                            <Link href="/health" className="block px-4 py-2 hover:bg-gray-100 text-[#8d8d8d]">
                              {t("navigation.menu_items.health")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/dental" className="block px-4 py-2 hover:bg-gray-100 text-[#8d8d8d]">
                              {t("navigation.menu_items.dental_vision")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/life" className="block px-4 py-2 hover:bg-gray-100 text-[#8d8d8d]">
                              {t("navigation.menu_items.life")}
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/medicare" className="block px-4 py-2 hover:bg-gray-100 text-[#8d8d8d]">
                              {t("navigation.menu_items.medicare")}
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Link href="/mission" className="hover:text-primary-darkAqua text-[#8d8d8d] py-2">
                  {t("navigation.menu_items.mission")}
                </Link>

                <Link href="/referafriend" className="whitespace-nowrap hover:text-primary-darkAqua text-[#8d8d8d] py-2">
                  {t("navigation.menu_items.referafriend")}
                </Link>

                {/* ✅ Novo Link */}
                <Link href="/community" className="whitespace-nowrap hover:text-primary-darkAqua text-[#8d8d8d] py-2">
                  {t("navigation.menu_items.community")}
                </Link>
              </div>
            </nav>
          </div>

          <div className="hidden lg:flex lg:flex-col justify-center items-center w-[20%]">
            <button onClick={() => handleLinkClick("appointment")}>
              <img src="images/calendar3D.png" className="h-12 w-12" />
            </button>
            <span className="hover:text-primary-darkAqua text-xs text-gray-800 py-1">
              {t("misc.schedule")}
            </span>
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
                <div className="inline-block bg-black bg-opacity-50 p-3 rounded">
                  <button
                    onClick={() => {
                      router.push("/quote");
                    }}
                    className="bg-primary-darkAqua hover:bg-[#0A4958] text-white font-bold py-2 px-8 rounded"
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



