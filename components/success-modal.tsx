"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  type: "demo" | "waitlist";
}

export default function SuccessModal({
  open,
  onOpenChange,
  title,
  description,
  type,
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm">
          {type === "demo" ? (
            <p>
              We have received your request! Our team will contact you shortly
              to schedule your personalized demo.
            </p>
          ) : (
            <p>
              We have received your request! You'll be among the first to know
              when AIODEV launches. Stay tuned for updates!
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Got it, thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
