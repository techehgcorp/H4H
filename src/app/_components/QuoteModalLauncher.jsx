"use client";

import { useEffect, useMemo, useState } from "react";
import { localizePath } from "@/lib/i18n";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  coverageType: "",
  insuranceCoverage: "",
  householdIncome: "",
};

const coverageImages = [
  "/assets/img/person/person-m-9.webp",
  "/assets/img/health/consultation-3.webp",
];

const insuranceImages = [
  "/assets/img/health/cardiology-2.webp",
  "/assets/img/health/orthopedics-1.webp",
  "/assets/img/health/oncology-2.webp",
  "/assets/img/health/pediatrics-4.webp",
];

const incomeVisuals = [
  { type: "badge", label: "$15K" },
  { type: "badge", label: "$30K" },
  { type: "badge", label: "$50K" },
  { type: "badge", label: "$75K" },
  { type: "badge", label: "$75K+" },
];

const quoteCopy = {
  en: {
    name: "Name",
    address: "Address",
    contact: "Contact",
    eyebrow: "Get a free quote",
    requestSent: "Request sent",
    close: "Close",
    startAnother: "Start another quote",
    back: "Back",
    next: "Next",
    optional: "optional",
  },
  es: {
    name: "Nombre",
    address: "Direccion",
    contact: "Contacto",
    eyebrow: "Obtén una cotizacion gratis",
    requestSent: "Solicitud enviada",
    close: "Cerrar",
    startAnother: "Iniciar otra cotizacion",
    back: "Atras",
    next: "Siguiente",
    optional: "opcional",
  },
  ht: {
    name: "Non",
    address: "Adres",
    contact: "Kontak",
    eyebrow: "Jwenn yon estimasyon gratis",
    requestSent: "Demann voye",
    close: "Fèmen",
    startAnother: "Kòmanse yon lòt estimasyon",
    back: "Retounen",
    next: "Apre",
    optional: "opsyonèl",
  },
};

function getCopy(locale) {
  return quoteCopy[locale] || quoteCopy.en;
}

function getStepLabels(form, copy) {
  return [
    copy.name,
    form.coverageTypePlaceholder,
    form.insuranceCoveragePlaceholder,
    form.householdIncomePlaceholder,
    form.dob,
    form.zipCode,
    copy.address,
    copy.contact,
  ];
}

function getStepFields(step) {
  const fieldsByStep = [
    ["firstName", "lastName"],
    ["coverageType"],
    ["insuranceCoverage"],
    ["householdIncome"],
    ["dob"],
    ["zipCode"],
    [],
    ["email"],
  ];

  return fieldsByStep[step] || [];
}

function isStepComplete(step, formData) {
  const fields = getStepFields(step);
  const hasValues = fields.every((field) => String(formData[field] || "").trim());
  return step === 5 ? hasValues && /^\d{5}$/.test(formData.zipCode) : hasValues;
}

function OptionVisual({ visual }) {
  if (typeof visual === "string") {
    return <img src={visual} alt="" loading="lazy" />;
  }

  return (
    <span className="quote-option-card__badge" aria-hidden="true">
      {visual.label}
    </span>
  );
}

function OptionGrid({ name, options, visuals, value, onSelect }) {
  return (
    <div className="quote-option-grid">
      {options.map((option, index) => (
        <button
          className={`quote-option-card${value === option.value ? " is-selected" : ""}`}
          key={option.value}
          type="button"
          onClick={() => onSelect(name, option.value)}
        >
          <OptionVisual visual={visuals[index % visuals.length]} />
          <span>{option.label}</span>
          <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
        </button>
      ))}
    </div>
  );
}

export default function QuoteModalLauncher({
  className = "",
  form,
  label,
  locale = "en",
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onTriggerClick,
  style,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const copy = useMemo(() => getCopy(locale), [locale]);
  const stepLabels = useMemo(() => getStepLabels(form, copy), [form, copy]);

  const coverageTypeOptions = useMemo(
    () => form.coverageTypeOptions.filter((option) => ["individual", "family"].includes(option.value)),
    [form]
  );
  const currentStepLabel = stepLabels[step];
  const isSuccessStep = step === stepLabels.length;
  const progress = ((Math.min(step, stepLabels.length - 1) + 1) / stepLabels.length) * 100;
  const canContinue = isSuccessStep || isStepComplete(step, formData);
  const optionalText = `(*${copy.optional})`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.classList.add("quote-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("quote-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openModal() {
    if (status.success) {
      resetForm();
    }
    setIsOpen(true);
  }

  function closeModal() {
    if (status.loading) return;
    setIsOpen(false);
  }

  function updateField(name, value) {
    setStatus((current) => ({ ...current, error: "" }));
    setFormData((current) => ({
      ...current,
      [name]: name === "zipCode" ? value.replace(/\D/g, "").slice(0, 5) : value,
    }));
  }

  function handleChange(event) {
    updateField(event.target.name, event.target.value);
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    if (!canContinue) return;
    setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  }

  function resetForm() {
    setFormData(initialFormData);
    setStep(0);
    setStatus({ loading: false, error: "", success: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canContinue) return;

    setStatus({ loading: true, error: "", success: "" });

    try {
      const sheetResponse = await fetch("/api/saveToGoogleSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const sheetResult = await sheetResponse.json();

      if (!sheetResponse.ok) {
        throw new Error(sheetResult?.error || form.error);
      }

      const leadResponse = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          locale,
        }),
      });
      const leadResult = await leadResponse.json();

      if (!leadResponse.ok) {
        throw new Error(leadResult?.message || form.error);
      }

      setStatus({ loading: false, error: "", success: form.success });
      setStep(stepLabels.length);
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || form.error,
        success: "",
      });
    }
  }

  function renderStep() {
    if (step === 0) {
      return (
        <div className="quote-field-grid">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder={form.firstName}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder={form.lastName}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      );
    }

    if (step === 1) {
      return (
        <OptionGrid
          name="coverageType"
          options={coverageTypeOptions}
          visuals={coverageImages}
          value={formData.coverageType}
          onSelect={updateField}
        />
      );
    }

    if (step === 2) {
      return (
        <OptionGrid
          name="insuranceCoverage"
          options={form.insuranceCoverageOptions}
          visuals={insuranceImages}
          value={formData.insuranceCoverage}
          onSelect={updateField}
        />
      );
    }

    if (step === 3) {
      return (
        <OptionGrid
          name="householdIncome"
          options={form.householdIncomeOptions}
          visuals={incomeVisuals}
          value={formData.householdIncome}
          onSelect={updateField}
        />
      );
    }

    if (step === 4) {
      return (
        <input
          type="date"
          name="dob"
          className="form-control quote-single-input"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      );
    }

    if (step === 5) {
      return (
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength="5"
          name="zipCode"
          className="form-control quote-single-input"
          placeholder={form.zipCode}
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      );
    }

    if (step === 6) {
      return (
        <div className="quote-field-stack">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder={`${form.address} ${optionalText}`}
            value={formData.address}
            onChange={handleChange}
          />
          <div className="quote-field-grid">
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder={`${form.city} ${optionalText}`}
              value={formData.city}
              onChange={handleChange}
            />
            <select
              name="state"
              className="form-select"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">{form.statePlaceholder} {optionalText}</option>
              {form.stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return (
      <div className="quote-field-grid">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder={form.email}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          className="form-control"
          placeholder={`${form.phone} ${optionalText}`}
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <>
      <button
        className={className}
        type="button"
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={(event) => {
          if (onTriggerClick?.(event) === false || event.defaultPrevented) {
            return;
          }

          openModal();
        }}
      >
        {label}
      </button>

      {isOpen ? (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
          <button className="quote-modal__backdrop" type="button" aria-label="Close quote form" onClick={closeModal} />
          <div className="quote-modal__panel">
            <button className="quote-modal__close" type="button" aria-label="Close quote form" onClick={closeModal}>
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>

            {step === stepLabels.length ? (
              <div className="quote-success">
                <img src="/assets/img/health/staff-7.png" alt="" />
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                <h2 id="quote-modal-title">{copy.requestSent}</h2>
                <p>{status.success}</p>
                <button className="quote-primary-action" type="button" onClick={closeModal}>
                  {copy.close}
                </button>
                <button className="quote-link-action" type="button" onClick={resetForm}>
                  {copy.startAnother}
                </button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                <div className="quote-modal__content">
                  <div className="quote-progress" aria-label={`Step ${step + 1} of ${stepLabels.length}`}>
                    <span>{step + 1}</span>
                    <div className="quote-progress__track">
                      <div style={{ width: `${progress}%` }}></div>
                    </div>
                    <span>{stepLabels.length}</span>
                  </div>

                  <p className="quote-eyebrow">{copy.eyebrow}</p>
                  <h2 id="quote-modal-title">{currentStepLabel}</h2>

                  <div className="quote-step-body">{renderStep()}</div>

                  {status.error ? <div className="error-message d-block">{status.error}</div> : null}

                  <div className="quote-actions">
                    <button className="quote-secondary-action" type="button" onClick={goBack} disabled={step === 0 || status.loading}>
                      {copy.back}
                    </button>
                    {step === stepLabels.length - 1 ? (
                      <button className="quote-primary-action" type="submit" disabled={!canContinue || status.loading}>
                        {status.loading ? form.submitting : form.submit}
                      </button>
                    ) : (
                      <button className="quote-primary-action" type="button" onClick={goNext} disabled={!canContinue}>
                        {copy.next}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
