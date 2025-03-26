import { getWaitlistCount } from "@/app/actions";
import Hero from "@/components/hero";

export default async function Home() {
  // Fetch the waitlist count in the server component
  const waitlistCount = await getWaitlistCount();

  // Pass the count as a prop to the client component
  return <Hero waitlistCount={waitlistCount} />;
}
