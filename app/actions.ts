"use server";

import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { createResendClient } from "@/lib/resend";
import {
  DemoRequestUserEmail,
  DemoRequestAdminEmail,
} from "@/emails/demo-request";
import {
  WaitlistUserEmail,
  WaitlistAdminEmail,
} from "@/emails/waitlist-confirmation";
import { renderAsync } from "@react-email/render";

// Schema for book demo form
const bookDemoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  date: z.date().optional(),
});

// Schema for waitlist form
const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Your personal email for receiving admin notifications
const ADMIN_EMAIL = "walidboutahar19@gmail.com"; // REPLACE THIS with your personal email

/**
 * Server action to handle booking a demo
 */
export async function bookDemo(formData: z.infer<typeof bookDemoSchema>) {
  // Validate the form data
  const validatedFields = bookDemoSchema.safeParse(formData);

  if (!validatedFields.success) {
    throw new Error("Invalid form data");
  }

  const { name, email, company, date } = validatedFields.data;

  try {
    // Initialize clients
    const supabase = createServerSupabaseClient();
    const resend = createResendClient();

    // Store in Supabase
    const { error: dbError } = await supabase.from("demo_requests").insert({
      name,
      email,
      company,
      preferred_date: date,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store demo request");
    }

    // Send confirmation email to user
    const userHtml = await renderAsync(
      DemoRequestUserEmail({ name, email, company, date })
    );

    const { error: userEmailError } = await resend.emails.send({
      from: "AIODEV <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: email,
      subject: "Your AIODEV Demo Request",
      html: userHtml,
    });

    if (userEmailError) {
      console.error("User email error:", userEmailError);
      // Continue even if user email fails
    }

    // Send notification email to admin
    const adminHtml = await renderAsync(
      DemoRequestAdminEmail({ name, email, company, date })
    );

    const { error: adminEmailError } = await resend.emails.send({
      from: "AIODEV <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: ADMIN_EMAIL, // Your personal email
      subject: "New AIODEV Demo Request",
      html: adminHtml,
    });

    if (adminEmailError) {
      console.error("Admin email error:", adminEmailError);
      // Continue even if admin email fails
    }

    // Return success
    return { success: true };
  } catch (error) {
    console.error("Error booking demo:", error);
    throw new Error("Failed to book demo");
  }
}

/**
 * Server action to handle joining the waitlist
 */
export async function joinWaitlist(formData: z.infer<typeof waitlistSchema>) {
  // Validate the form data
  const validatedFields = waitlistSchema.safeParse(formData);

  if (!validatedFields.success) {
    throw new Error("Invalid form data");
  }

  const { email, name } = validatedFields.data;

  try {
    // Initialize clients
    const supabase = createServerSupabaseClient();

    // Store in Supabase - handle potential errors more gracefully
    const { error: dbError } = await supabase.from("waitlist_entries").insert({
      email,
      name,
    });

    // Handle duplicate email case
    if (dbError) {
      if (dbError.code === "23505") {
        // Unique violation
        console.log("User already on waitlist:", email);
        // Continue with the process even if the user is already on the waitlist
      } else {
        console.error("Database error:", dbError);
        // Don't throw here, try to continue with email sending
      }
    }

    // Get waitlist count - with better error handling
    let waitlistCount = 0;
    try {
      const { count, error: countError } = await supabase
        .from("waitlist_entries")
        .select("*", { count: "exact", head: true });

      if (!countError && count !== null) {
        waitlistCount = count;
      }
    } catch (countErr) {
      console.error("Error getting waitlist count:", countErr);
      // Continue with the process even if count fails
    }

    // Try to send emails, but don't fail the whole process if they fail
    try {
      const resend = createResendClient();

      // Send confirmation email to user
      const userHtml = await renderAsync(WaitlistUserEmail({ name, email }));

      await resend.emails
        .send({
          from: "AIODEV <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to the AIODEV Waitlist",
          html: userHtml,
        })
        .catch((err) => {
          console.error("User email error:", err);
          // Continue even if user email fails
        });

      // Send notification email to admin
      const adminHtml = await renderAsync(
        WaitlistAdminEmail({
          name,
          email,
          waitlistCount,
        })
      );

      await resend.emails
        .send({
          from: "AIODEV <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: "New AIODEV Waitlist Signup",
          html: adminHtml,
        })
        .catch((err) => {
          console.error("Admin email error:", err);
          // Continue even if admin email fails
        });
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
      // Don't fail the whole process if email sending fails
    }

    // Return success regardless of email sending
    return { success: true };
  } catch (error) {
    console.error("Error joining waitlist:", error);
    throw new Error("Failed to join waitlist");
  }
}
