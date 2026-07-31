'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { localizePath } from '@/lib/i18n'

export default function TcpaDisclaimer({ locale: customLocale }) {
  const params = useParams()
  const locale = customLocale || params?.lang || 'en'

  const privacyUrl = localizePath('/privacy', locale)
  const termsUrl = localizePath('/terms', locale)

  return (
    <div
      className="tcpa-disclaimer mt-3 text-muted"
      style={{
        fontSize: '0.725rem',
        lineHeight: '1.4',
        textAlign: 'left',
        opacity: 0.85,
      }}
    >
      <p className="mb-2">
        By clicking the button and submitting this form, I agree that I am 18+ years old and agree to the{' '}
        <Link
          href={privacyUrl}
          target="_blank"
          className="text-decoration-underline"
          style={{ color: 'inherit' }}
        >
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link
          href={termsUrl}
          target="_blank"
          className="text-decoration-underline"
          style={{ color: 'inherit' }}
        >
          Terms and Conditions
        </Link>
        . By clicking the button and submitting this form, I provide my signature giving express consent to receive marketing communications via automated telephone dialing systems, artificial or pre-recorded voices, emails, live phone calls, pre-recorded calls, postal mail, text messages via SMS or MMS and other forms of communication regarding offers Life Insurance, Final Expense, Medicare, Health Insurance, Home/Auto Insurance or other products from QOL Insurance LLC or from our marketing partners and agents to the number(s) and/or email I provided, including a mobile phone, even if I am on a state or federal Do Not Call and/or Do Not Email registry.
      </p>
      <p className="mb-0">
        Message frequency varies and represents our good faith effort to reach you regarding your insurance inquiry. Message and data rates may apply. Text HELP for help or text STOP to cancel. I understand that my consent to receive communications is not a condition of purchase and I may revoke my consent at any time.
      </p>
    </div>
  )
}
