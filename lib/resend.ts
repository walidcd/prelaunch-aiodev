import { Resend } from "resend"

// Create a single Resend client
export const createResendClient = () => {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error("Missing Resend API key")
  }

  return new Resend(resendApiKey)
}

