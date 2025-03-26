"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import BookDemoDialog from "./book-demo-dialog"
import JoinWaitlistDialog from "./join-waitlist-dialog"
import { WaitlistCounter } from "./waitlist-counter"

interface HeroProps {
  waitlistCount: number
}

export default function Hero({ waitlistCount }: HeroProps) {
  const [bookDemoOpen, setBookDemoOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image src="/images/background.png" alt="Aiodev Background" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 w-48">
          <Image src="/logo.svg" alt="Aiodev Logo" width={200} height={100} className="invert" />
        </div>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Master coding challenges with <span className="text-purple-400">AIODEV</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
          A comprehensive problem-solving platform for frontend and backend challenges with an integrated IDE, automated
          testing, and AI assistance.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            className="bg-purple-600 px-6 py-2 text-lg font-medium text-white hover:bg-purple-700 h-auto"
            onClick={() => setBookDemoOpen(true)}
          >
            Book a Demo
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 px-6 py-2 text-lg font-medium text-purple-400 hover:bg-purple-900/20 h-auto"
            onClick={() => setWaitlistOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>
      </div>

      <WaitlistCounter count={waitlistCount} />

      <BookDemoDialog open={bookDemoOpen} onOpenChange={setBookDemoOpen} />
      <JoinWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  )
}

