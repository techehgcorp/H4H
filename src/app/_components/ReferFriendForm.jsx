'use client'

import { useState } from 'react'

const initialFormData = {
  referrerName: '',
  referrerEmail: '',
  referrerPhone: '',
  referredName: '',
  referredEmail: '',
  referredPhone: '',
  consent: false,
}

export default function ReferFriendForm({ form }) {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: '',
  })

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setStatus({
      loading: true,
      error: '',
      success: '',
    })

    try {
      const response = await fetch('/api/saveToCareersSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'referFriend',
          ...formData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || form.error)
      }

      setFormData(initialFormData)
      setStatus({
        loading: false,
        error: '',
        success: form.success,
      })
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || form.error,
        success: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="row gy-3">
        <div className="col-12">
          <input
            type="text"
            name="referrerName"
            className="form-control"
            placeholder={form.referrerName}
            value={formData.referrerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="email"
            name="referrerEmail"
            className="form-control"
            placeholder={form.referrerEmail}
            value={formData.referrerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="tel"
            name="referrerPhone"
            className="form-control"
            placeholder={form.referrerPhone}
            value={formData.referrerPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            name="referredName"
            className="form-control"
            placeholder={form.referredName}
            value={formData.referredName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="email"
            name="referredEmail"
            className="form-control"
            placeholder={form.referredEmail}
            value={formData.referredEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="tel"
            name="referredPhone"
            className="form-control"
            placeholder={form.referredPhone}
            value={formData.referredPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="d-flex align-items-start gap-2 referral-consent">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>{form.consent}</span>
          </label>
        </div>
        <div className="col-12">
          {status.loading ? <div className="loading d-block">{form.loading}</div> : null}
          {status.error ? <div className="error-message d-block">{status.error}</div> : null}
          {status.success ? <div className="sent-message d-block">{status.success}</div> : null}
          <button type="submit" className="btn btn-appointment w-100" disabled={status.loading}>
            {status.loading ? form.submitting : form.submit}
          </button>
        </div>
      </div>
    </form>
  )
}
