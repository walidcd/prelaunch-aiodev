import { getWaitlistCount } from "@/app/actions"
import Hero from "@/components/hero"

export default async function Home() {
  const waitlistCount = await getWaitlistCount()

  return <Hero waitlistCount={waitlistCount} />
}

