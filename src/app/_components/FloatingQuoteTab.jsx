// src/app/_components/FloatingQuoteTab.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import QuoteModalLauncher from "./QuoteModalLauncher";
import { getAppointmentDictionary, getShellDictionary, removeLocaleFromPathname } from "@/lib/i18n";

export default function FloatingQuoteTab({ locale = "en" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [top, setTop] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef(null);
  const suppressClick = useRef(false);
  const appointment = getAppointmentDictionary(locale);
  const shell = getShellDictionary(locale);
  const pathname = removeLocaleFromPathname(usePathname() || "/");
  // Agent profiles have their own quote form that credits the agent,
  // so the site-wide tab stays out of the way there.
  const isAgentProfile = pathname.startsWith("/agents/");
  // Pages that are already a form: the tab would only sit on top of their
  // fields on a phone.
  const isFormPage = ["/contact", "/appointment", "/refer-a-friend"].includes(pathname);

  useEffect(() => {
    function updateVisibility() {
      const sections = Array.from(document.querySelectorAll("main section"));
      const targetSection = sections[1] || sections[0];

      if (!targetSection) {
        setIsVisible(false);
        return;
      }

      const triggerLine = window.innerHeight * 0.62;
      setIsVisible(targetSection.getBoundingClientRect().top <= triggerLine);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function clampTop(value, buttonHeight = 42) {
    const min = buttonHeight / 2 + 12;
    const max = window.innerHeight - buttonHeight / 2 - 12;
    return Math.min(Math.max(value, min), max);
  }

  function handlePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTop: rect.top + rect.height / 2,
      height: rect.height,
      moved: false,
    };
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    const drag = dragState.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - drag.startY;

    if (Math.abs(deltaY) > 3) {
      drag.moved = true;
      suppressClick.current = true;
    }

    setTop(clampTop(drag.startTop + deltaY, drag.height));
  }

  function handlePointerUp(event) {
    const drag = dragState.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    suppressClick.current = drag.moved;
    dragState.current = null;
    setIsDragging(false);
  }

  function handleTriggerClick() {
    if (!suppressClick.current) return true;

    suppressClick.current = false;
    return false;
  }

  if (isAgentProfile || isFormPage) return null;

  return (
    <QuoteModalLauncher
      className={`floating-quote-tab${isVisible ? " is-visible" : ""}${isDragging ? " is-dragging" : ""}`}
      form={appointment.form}
      label={shell.nav.quote}
      locale={locale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTriggerClick={handleTriggerClick}
      style={top === null ? undefined : { top }}
    />
  );
}
