'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { localizePath, getTcpaDictionary } from '@/lib/i18n'

export default function TcpaDisclaimer({ locale: customLocale }) {
  const params = useParams()
  const locale = customLocale || params?.lang || 'en'
  const t = getTcpaDictionary(locale).standard

  const privacyUrl = localizePath('/privacy', locale)
  const termsUrl = localizePath('/terms', locale)

  const parts = t.paragraph1.split(/(\{privacyPolicy\}|\{termsAndConditions\})/g)

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
        {parts.map((part, index) => {
          if (part === '{privacyPolicy}') {
            return (
              <Link
                key={index}
                href={privacyUrl}
                target="_blank"
                className="text-decoration-underline"
                style={{ color: 'inherit' }}
              >
                {t.privacyPolicy}
              </Link>
            )
          }
          if (part === '{termsAndConditions}') {
            return (
              <Link
                key={index}
                href={termsUrl}
                target="_blank"
                className="text-decoration-underline"
                style={{ color: 'inherit' }}
              >
                {t.termsAndConditions}
              </Link>
            )
          }
          return part
        })}
      </p>
      <p className="mb-0">{t.paragraph2}</p>
    </div>
  )
}
