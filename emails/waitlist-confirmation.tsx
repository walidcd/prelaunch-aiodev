import type * as React from "react"

interface WaitlistEmailProps {
  name?: string
  email: string
}

// Email to user confirming their waitlist signup
export const WaitlistUserEmail: React.FC<WaitlistEmailProps> = ({ name, email }) => (
  <div>
    <h1>Welcome to the AIODEV Waitlist!</h1>
    <p>Hi {name || "there"},</p>
    <p>Thank you for joining the AIODEV waitlist. We're excited to have you on board!</p>
    <p>
      We'll notify you at <strong>{email}</strong> as soon as we're ready to launch and you'll be among the first to get
      access.
    </p>
    <p>In the meantime, stay tuned for updates and sneak peeks of what we're building.</p>
    <p>
      Best regards,
      <br />
      The AIODEV Team
    </p>
  </div>
)

// Email to admin notifying of a new waitlist signup
interface WaitlistAdminEmailProps extends WaitlistEmailProps {
  waitlistCount: number
}

export const WaitlistAdminEmail: React.FC<WaitlistAdminEmailProps> = ({
  name,
  email,
  waitlistCount = 0, // Provide default value
}) => (
  <div>
    <h1>New Waitlist Signup</h1>
    <p>A new user has joined the waitlist:</p>

    <ul>
      <li>
        <strong>Email:</strong> {email}
      </li>
      {name && (
        <li>
          <strong>Name:</strong> {name}
        </li>
      )}
    </ul>

    <p>The waitlist is growing! Current count: {waitlistCount}</p>
  </div>
)

