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

const bookDemoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  date: z.date().optional(),
});

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Load environment variables
const ADMIN_EMAIL = "walidboutahar19@gmail.com";
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

    const userHtml = await renderAsync(
      DemoRequestUserEmail({ name, email, company, date })
    );

    const { error: userEmailError } = await resend.emails.send({
      from: "AIODEV <onboarding@resend.dev>",
      to: email,
      subject: "Your AIODEV Demo Request",
      html: userHtml,
    });

    if (userEmailError) {
      console.error("User email error:", userEmailError);
    }

    // Send notification email to admin
    const adminHtml = await renderAsync(
      DemoRequestAdminEmail({ name, email, company, date })
    );

    const { error: adminEmailError } = await resend.emails.send({
      from: "AIODEV <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: "New AIODEV Demo Request",
      html: adminHtml,
    });

    if (adminEmailError) {
      console.error("Admin email error:", adminEmailError);
    }

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
    const supabase = createServerSupabaseClient();

    const { error: dbError } = await supabase.from("waitlist_entries").insert({
      email,
      name,
    });

    if (dbError) {
      if (dbError.code === "23505") {
        console.log("User already on waitlist:", email);
      } else {
        console.error("Database error:", dbError);
      }
    }

    // Get waitlist count
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
    }

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
        });

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
        });
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
    }

    return { success: true };
  } catch (error) {
    console.error("Error joining waitlist:", error);
    throw new Error("Failed to join waitlist");
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const supabase = createServerSupabaseClient();
    const { count, error } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching waitlist count:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Error in getWaitlistCount:", error);
    return 0;
  }
}
