import type * as React from "react"
import { format } from "date-fns"

interface DemoRequestEmailProps {
  name: string
  email: string
  company?: string
  date?: Date
}

// Email to user confirming their demo request
export const DemoRequestUserEmail: React.FC<DemoRequestEmailProps> = ({ name, company, date }) => (
  <div>
    <h1>Your Demo Request is Confirmed</h1>
    <p>Hi {name},</p>
    <p>
      Thank you for requesting a demo of AIODEV. We've received your request and our team will be in touch shortly to
      schedule your personalized demo.
    </p>

    {date && (
      <p>
        Your preferred date: <strong>{format(date, "PPPP")}</strong>
      </p>
    )}

    <p>If you have any questions in the meantime, please reply to this email.</p>
    <p>
      Best regards,
      <br />
      The AIODEV Team
    </p>
  </div>
)

// Email to admin notifying of a new demo request
export const DemoRequestAdminEmail: React.FC<DemoRequestEmailProps> = ({ name, email, company, date }) => (
  <div>
    <h1>New Demo Request</h1>
    <p>A new demo request has been submitted:</p>

    <ul>
      <li>
        <strong>Name:</strong> {name}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
      {company && (
        <li>
          <strong>Company:</strong> {company}
        </li>
      )}
      {date && (
        <li>
          <strong>Preferred Date:</strong> {format(date, "PPPP")}
        </li>
      )}
    </ul>

    <p>Please follow up with this lead as soon as possible.</p>
  </div>
)

