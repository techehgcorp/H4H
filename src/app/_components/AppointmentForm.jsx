"use client";

import { useMemo, useState } from "react";

const initialFormData = {
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "",
  comments: "",
};

const appointmentCopy = {
  en: {
    back: "Back",
    scheduleTitle: "Interview Schedule",
    duration: "30 min",
    selectDateTime: "Select a Date & Time",
    scheduleText:
      "Please select a time slot for your initial interview with our team. This meeting can be conducted by phone, video call, or in person, based on your preference.",
    homeLink:
      "You can review more details about working with H4H by visiting our Home Page Here",
    detailsTitle: "Personal detail",
    detailsFormTitle: "Interview Details",
    dateLabel: "Date",
    timeLabel: "Time",
    detailsText:
      "Please provide your details and preferred contact method for the interview. This information will help us ensure a smooth and efficient interview process.",
    preferredContact: "Preferred Contact Method:",
    methods: [
      "Face-to-Face Office Meeting",
      "Appointment by Phone",
      "Virtual Meeting via Google Meet",
    ],
    comments: "Additional Comments (Optional)",
    selectTime: "Select Time",
    dateAdded: "Date & Time added successfully!",
    submit: "Schedule",
    submitting: "Submitting...",
    success: "Your appointment request has been sent successfully. Our team will contact you shortly.",
    error: "We could not send your appointment request right now. Please try again.",
  },
  es: {
    back: "Atras",
    scheduleTitle: "Agenda de Entrevista",
    duration: "30 min",
    selectDateTime: "Selecciona Fecha y Hora",
    scheduleText:
      "Selecciona un horario para tu entrevista inicial con nuestro equipo. Esta reunion puede realizarse por telefono, videollamada o en persona, segun tu preferencia.",
    homeLink:
      "Puedes revisar mas detalles sobre H4H visitando nuestra pagina de inicio aqui",
    detailsTitle: "Detalle personal",
    detailsFormTitle: "Detalles de la Entrevista",
    dateLabel: "Fecha",
    timeLabel: "Hora",
    detailsText:
      "Proporciona tus datos y metodo de contacto preferido para la entrevista. Esta informacion nos ayudara a asegurar un proceso claro y eficiente.",
    preferredContact: "Metodo de contacto preferido:",
    methods: [
      "Reunion presencial en oficina",
      "Cita por telefono",
      "Reunion virtual por Google Meet",
    ],
    comments: "Comentarios adicionales (Opcional)",
    selectTime: "Selecciona Hora",
    dateAdded: "Fecha y hora agregadas correctamente!",
    submit: "Agendar",
    submitting: "Enviando...",
    success: "Tu solicitud de cita fue enviada correctamente. Nuestro equipo se comunicara contigo pronto.",
    error: "No pudimos enviar tu solicitud de cita en este momento. Intentalo de nuevo.",
  },
  ht: {
    back: "Retounen",
    scheduleTitle: "Orè Entèvyou",
    duration: "30 min",
    selectDateTime: "Chwazi Dat ak Lè",
    scheduleText:
      "Tanpri chwazi yon lè pou premye entèvyou ou ak ekip nou an. Reyinyon sa a ka fèt pa telefòn, videyo, oswa an pèsòn selon preferans ou.",
    homeLink:
      "Ou ka wè plis detay sou H4H lè ou vizite paj akèy nou an isit la",
    detailsTitle: "Detay pèsonèl",
    detailsFormTitle: "Detay Entèvyou",
    dateLabel: "Dat",
    timeLabel: "Lè",
    detailsText:
      "Tanpri bay detay ou ak metòd kontak ou prefere pou entèvyou a. Enfòmasyon sa a ap ede nou fè pwosesis la pi klè ak pi fasil.",
    preferredContact: "Metòd kontak ou prefere:",
    methods: [
      "Reyinyon an pèsòn nan biwo",
      "Randevou pa telefòn",
      "Reyinyon vityèl sou Google Meet",
    ],
    comments: "Kòmantè anplis (Opsyonèl)",
    selectTime: "Chwazi Lè",
    dateAdded: "Dat ak lè ajoute avèk siksè!",
    submit: "Pwograme",
    submitting: "Ap voye...",
    success: "Demann randevou ou an voye avèk siksè. Ekip nou an ap kontakte ou byento.",
    error: "Nou pa t kapab voye demann randevou ou an kounye a. Tanpri eseye ankò.",
  },
};

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const contactMethodKeys = ["face-to-face", "phone", "virtual"];

function getCopy(locale) {
  return appointmentCopy[locale] || appointmentCopy.en;
}

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value, locale) {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale === "ht" ? "fr" : locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatTime(value) {
  if (!value) return "";

  const [hours, minutes] = value.split(":");
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2026, 0, 1, Number(hours), Number(minutes)));
}

export default function AppointmentForm({ form, locale = "en" }) {
  const copy = useMemo(() => getCopy(locale), [locale]);
  const [step, setStep] = useState("schedule");
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const selectedDate = formatDate(formData.date, locale);
  const selectedTime = formatTime(formData.time);
  const selectedContactMethodLabel =
    copy.methods[contactMethodKeys.indexOf(formData.contactMethod)] || formData.contactMethod;
  const canContinue = Boolean(formData.date && formData.time);
  const canSubmit = Boolean(
    formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.contactMethod
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setStatus((current) => ({ ...current, error: "" }));
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function goToDetails(event) {
    event.preventDefault();

    if (!canContinue) return;

    setStep("details");
    setStatus({ loading: false, error: "", success: copy.dateAdded });
  }

  function goBack() {
    setStatus({ loading: false, error: "", success: "" });
    setStep("schedule");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    setStatus({ loading: true, error: "", success: "" });

    try {
      const sheetResponse = await fetch("/api/saveToAppointmentSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          method: formData.contactMethod,
          contactMethod: selectedContactMethodLabel,
          comments: formData.comments,
          locale,
        }),
      });
      const sheetResult = await sheetResponse.json();

      if (!sheetResponse.ok) {
        throw new Error(sheetResult?.error || copy.error);
      }

      const leadResponse = await fetch("/api/submit-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          date: formData.date,
          time: formData.time,
          method: formData.contactMethod,
          locale,
        }),
      });
      const leadResult = await leadResponse.json();

      if (!leadResponse.ok) {
        throw new Error(leadResult?.message || copy.error);
      }

      setFormData(initialFormData);
      setStep("schedule");
      setStatus({ loading: false, error: "", success: copy.success });
    } catch (error) {
      setStatus({ loading: false, error: error.message || copy.error, success: "" });
    }
  }

  return (
    <div className="appointment-scheduler">
      {status.success ? <div className="sent-message d-block">{status.success}</div> : null}
      {status.error ? <div className="error-message d-block">{status.error}</div> : null}

      <div className="appointment-scheduler__grid">
        <aside className="appointment-scheduler__summary">
          {step === "details" ? (
            <button className="appointment-back-btn" type="button" onClick={goBack}>
              {copy.back}
            </button>
          ) : null}
          <img src="/HHlogoNoBg3.png" alt="Health4Haitians" />
          <h2>{step === "details" ? copy.detailsTitle : copy.scheduleTitle}</h2>
          <p className="appointment-duration">
            <i className="bi bi-telephone-fill" aria-hidden="true"></i>
            {copy.duration}
          </p>
          {step === "details" ? (
            <>
              <p>
                {copy.dateLabel}: {selectedDate}
              </p>
              <p>
                {copy.timeLabel}: {selectedTime}
              </p>
              <p>{copy.detailsText}</p>
            </>
          ) : (
            <p>{copy.scheduleText}</p>
          )}
          <a href={`/${locale}`}>{copy.homeLink}</a>
        </aside>

        {step === "schedule" ? (
          <form className="appointment-scheduler__panel" onSubmit={goToDetails}>
            <h3>{copy.selectDateTime}</h3>
            <input
              type="date"
              name="date"
              className="form-control"
              min={getTodayInputValue()}
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select
              name="time"
              className="form-select"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">{copy.selectTime}</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {formatTime(time)}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-appointment w-100" disabled={!canContinue}>
              {copy.submit}
            </button>
          </form>
        ) : (
          <form className="appointment-scheduler__panel" onSubmit={handleSubmit}>
            <h3>{copy.detailsFormTitle}</h3>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder={form.firstName.replace("Your ", "")}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder={form.lastName.replace("Your ", "")}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder={form.email.replace("Your ", "")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder={form.phone.replace("Your ", "")}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <fieldset className="appointment-contact-method">
              <legend>{copy.preferredContact}</legend>
              {copy.methods.map((method, index) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="contactMethod"
                    value={contactMethodKeys[index]}
                    checked={formData.contactMethod === contactMethodKeys[index]}
                    onChange={handleChange}
                    required
                  />
                  <span>{method}</span>
                </label>
              ))}
            </fieldset>
            <textarea
              name="comments"
              className="form-control"
              placeholder={copy.comments}
              value={formData.comments}
              onChange={handleChange}
              rows="3"
            />
            <button type="submit" className="btn btn-appointment w-100" disabled={!canSubmit || status.loading}>
              {status.loading ? copy.submitting : copy.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
