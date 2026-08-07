'use client'

import { useState } from 'react'

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactForm({ form }) {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
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
      const response = await fetch('/api/saveToContactSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to send your request')
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
        error: error.message || 'Failed to send your request',
        success: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="php-email-form">
      <div className="row gy-3">
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder={form.name}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder={form.email}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            name="subject"
            placeholder={form.subject}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <textarea
            className="form-control"
            name="message"
            rows="10"
            placeholder={form.message}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12 text-center">
          {status.loading ? <div className="loading d-block">{form.loading}</div> : null}
          {status.error ? <div className="error-message d-block">{status.error}</div> : null}
          {status.success ? <div className="sent-message d-block">{status.success}</div> : null}
          <button type="submit" disabled={status.loading}>{form.submit}</button>
        </div>
      </div>
    </form>
  )
}
