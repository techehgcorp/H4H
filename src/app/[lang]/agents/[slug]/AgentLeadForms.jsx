// src/app/[lang]/agents/[slug]/AgentLeadForms.jsx
// The Quote / Message / Free Guide forms on an agent's profile.
//
// <LeadFormProvider> wraps the page and owns a single pop-up form.
// <LeadButton source="quote" product="dental"> opens it from anywhere inside.
//
// The pop-up uses the browser's built-in <dialog>: it traps keyboard focus,
// closes with Esc, and is announced properly by screen readers. On phones it
// slides up from the bottom like an app sheet.
"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { OFFICE_PHONE, fill, firstName as getFirstName, formatPhone } from "@/lib/site";

const LeadFormContext = createContext(() => {});

export function LeadButton({ source, product, className, children }) {
  const open = useContext(LeadFormContext);
  return (
    <button type="button" className={className} onClick={() => open(source, product)}>
      {children}
    </button>
  );
}

export function LeadFormProvider({ agent, lang, t, productNames, children }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(null); // { source, product, key }

  const open = useCallback((source, product) => {
    setForm({ source, product, key: Date.now() });
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    if (form && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [form]);

  return (
    <LeadFormContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="h4h-lead-dialog"
        aria-labelledby="h4h-lead-title"
        onClose={() => setForm(null)}
        onClick={(event) => {
          // Click on the dark backdrop (outside the box) closes it
          if (event.target === dialogRef.current) close();
        }}
      >
        {form && (
          <LeadForm
            key={form.key}
            source={form.source}
            initialProduct={form.product}
            agent={agent}
            lang={lang}
            t={t}
            productNames={productNames}
            onClose={close}
          />
        )}
      </dialog>
    </LeadFormContext.Provider>
  );
}

function LeadForm({ source, initialProduct, agent, lang, t, productNames, onClose }) {
  const id = useId();
  const openedAt = useRef(Date.now());
  const values = {
    name: agent.name,
    firstName: getFirstName(agent.name),
    phone: formatPhone(agent.phone || OFFICE_PHONE),
  };

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    message: "",
    company: "", // honeypot: hidden from people, bots fill it in
  });
  const [products, setProducts] = useState(
    initialProduct && agent.products.includes(initialProduct)
      ? [initialProduct]
      : agent.products.length === 1
        ? [...agent.products]
        : []
  );
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [serverError, setServerError] = useState("");
  const [download, setDownload] = useState(null);

  function update(name) {
    return (event) => {
      setFields((current) => ({ ...current, [name]: event.target.value }));
      if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    };
  }

  function toggleProduct(product) {
    setProducts((current) =>
      current.includes(product) ? current.filter((item) => item !== product) : [...current, product]
    );
    if (errors.products) setErrors((current) => ({ ...current, products: undefined }));
  }

  function validate() {
    const next = {};
    if (!fields.firstName.trim()) next.firstName = t.errors.required;
    if (!fields.lastName.trim()) next.lastName = t.errors.required;
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email.trim())) next.email = t.errors.email;
    const digits = fields.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    if (digits.length !== 10) next.phone = t.errors.phone;
    if (source === "quote") {
      if (!products.length) next.products = t.errors.products;
      if (!/^\d{5}$/.test(fields.zip.trim())) next.zip = t.errors.zip;
    }
    if (!consent) next.consent = fill(t.errors.consent, values);
    return next;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    setServerError("");
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      document.getElementById(`${id}-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/agent-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          source,
          products: source === "quote" ? products : [],
          consent,
          agentSlug: agent.slug,
          lang,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        const code = result.error && t.errors[result.error] ? result.error : "generic";
        setServerError(fill(t.errors[code], values));
        setStatus("error");
        return;
      }

      // The guide is downloaded with a button on the success screen: starting
      // it automatically is unreliable on phones (iPhones may replace the page).
      if (result.download) setDownload(result.download);
      setStatus("done");
    } catch {
      setServerError(fill(t.errors.generic, values));
      setStatus("error");
    }
  }

  const titleId = "h4h-lead-title";
  const fieldError = (name) =>
    errors[name] ? (
      <p className="h4h-field-error" id={`${id}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;
  const describedBy = (name) => (errors[name] ? `${id}-${name}-error` : undefined);

  if (status === "done") {
    return (
      <div className="h4h-lead-box h4h-lead-success" role="status">
        <button type="button" className="h4h-lead-close" onClick={onClose} aria-label={t.close}>
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
        <i className="bi bi-check-circle-fill h4h-lead-success-icon" aria-hidden="true" />
        <h2 id={titleId}>{fill(t.successTitle, { leadName: fields.firstName.trim() })}</h2>
        <p>{fill(t.success[source], values)}</p>
        <div className="h4h-lead-actions">
          {download && (
            <a className="btn h4h-btn-primary" href={download} download target="_blank" rel="noopener">
              <i className="bi bi-download" aria-hidden="true" /> {t.downloadAgain}
            </a>
          )}
          <button
            type="button"
            className={`btn ${download ? "h4h-btn-outline" : "h4h-btn-primary"}`}
            onClick={onClose}
          >
            {t.done}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="h4h-lead-box" onSubmit={onSubmit} noValidate>
      <button type="button" className="h4h-lead-close" onClick={onClose} aria-label={t.close}>
        <i className="bi bi-x-lg" aria-hidden="true" />
      </button>

      <h2 id={titleId}>{fill(t.titles[source], values)}</h2>
      <p className="h4h-lead-intro">{fill(t.intros[source], values)}</p>

      {source === "quote" && (
        <fieldset className="h4h-lead-products" aria-describedby={describedBy("products")}>
          <legend>{t.productsLabel}</legend>
          <div className="h4h-product-options">
            {agent.products.map((product, index) => (
              <label key={product} className="h4h-product-option">
                <input
                  type="checkbox"
                  id={index === 0 ? `${id}-products` : undefined}
                  checked={products.includes(product)}
                  onChange={() => toggleProduct(product)}
                />
                <span>{productNames[product]}</span>
              </label>
            ))}
          </div>
          {fieldError("products")}
        </fieldset>
      )}

      <div className="row g-3">
        <div className="col-6">
          <label className="form-label" htmlFor={`${id}-firstName`}>
            {t.firstName}
          </label>
          <input
            id={`${id}-firstName`}
            className="form-control"
            value={fields.firstName}
            onChange={update("firstName")}
            autoComplete="given-name"
            maxLength={50}
            required
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={describedBy("firstName")}
          />
          {fieldError("firstName")}
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor={`${id}-lastName`}>
            {t.lastName}
          </label>
          <input
            id={`${id}-lastName`}
            className="form-control"
            value={fields.lastName}
            onChange={update("lastName")}
            autoComplete="family-name"
            maxLength={50}
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={describedBy("lastName")}
          />
          {fieldError("lastName")}
        </div>
        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor={`${id}-email`}>
            {t.email}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            className="form-control"
            value={fields.email}
            onChange={update("email")}
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
          {fieldError("email")}
        </div>
        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor={`${id}-phone`}>
            {t.phone}
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            className="form-control"
            value={fields.phone}
            onChange={update("phone")}
            autoComplete="tel-national"
            placeholder="(954) 555-0100"
            maxLength={20}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
          />
          {fieldError("phone")}
        </div>

        {source === "quote" && (
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor={`${id}-zip`}>
              {t.zip}
            </label>
            <input
              id={`${id}-zip`}
              className="form-control"
              value={fields.zip}
              onChange={update("zip")}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              pattern="[0-9]{5}"
              required
              aria-invalid={Boolean(errors.zip)}
              aria-describedby={describedBy("zip")}
            />
            {fieldError("zip")}
          </div>
        )}

        {source === "contact" && (
          <div className="col-12">
            <label className="form-label" htmlFor={`${id}-message`}>
              {t.message}
            </label>
            <textarea
              id={`${id}-message`}
              className="form-control"
              rows={4}
              value={fields.message}
              onChange={update("message")}
              placeholder={fill(t.messagePlaceholder, values)}
              maxLength={1000}
            />
          </div>
        )}
      </div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div className="h4h-hp" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={update("company")}
        />
      </div>

      <div className="form-check h4h-consent">
        <input
          id={`${id}-consent`}
          type="checkbox"
          className="form-check-input"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
          }}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describedBy("consent")}
        />
        <label className="form-check-label" htmlFor={`${id}-consent`}>
          {fill(t.consent, values)}{" "}
          <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer">
            {t.privacy}
          </a>
        </label>
        {fieldError("consent")}
      </div>

      {serverError && (
        <p className="h4h-form-alert" role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn h4h-btn-primary h4h-lead-submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true" /> {t.sending}
          </>
        ) : (
          t.submit[source]
        )}
      </button>
    </form>
  );
}
