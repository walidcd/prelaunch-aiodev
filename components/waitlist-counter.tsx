"use client";

import { Users } from "lucide-react";

interface WaitlistCounterProps {
  count: number;
}

export function WaitlistCounter({ count }: WaitlistCounterProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-300">
        <Users className="h-4 w-4 text-purple-400" />
        <span>
          <span className="font-bold text-white">{count}</span>{" "}
          {count === 1 ? "person" : "people"} on the waitlist
        </span>
      </div>
    </div>
  );
}
