import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthFrame, authInputClass } from "@/components/AuthFrame";
import { Button } from "@/components/kit";

export const Route = createFileRoute("/forgot")({
  head: () => ({ meta: [{ title: "SIH&S — Forgot password" }] }),
  component: Forgot,
});

const STEPS = ["Email", "Code", "New password"] as const;

function Forgot() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const titles = ["Reset your password", "Enter the code", "Choose a new password"] as const;
  const subtitles = [
    "We will send a code to your work email. This preview does not send a real message.",
    "Enter the 6-digit code. For this preview, use 448291. It expires in 10 minutes.",
    "Use a password you have not used on another site.",
  ] as const;

  return (
    <AuthFrame title={titles[step]} subtitle={subtitles[step]} backTo="/login">
      <ol className="mb-6 flex gap-2" aria-label="Reset progress">
        {STEPS.map((label, index) => (
          <li key={label} className="flex-1">
            <span className={`block h-1 rounded-full ${index <= step ? "bg-[#5cba40]" : "bg-white/15"}`} />
            <span className={`mt-1 block text-[11px] font-medium ${index === step ? "text-white" : "text-[#9fb5ab]"}`}>{label}</span>
          </li>
        ))}
      </ol>

      {done ? (
        <div className="rounded-2xl border border-white/10 bg-[#073222] p-4" role="status">
          <p className="font-semibold">Password updated</p>
          <p className="mt-1 text-sm text-[#c9d9d1]">Sign in with your new password.</p>
          <Link to="/login" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#5cba40] font-semibold text-white">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (step < 2) setStep((value) => value + 1);
            else setDone(true);
          }}
        >
          {step === 0 && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Work email</span>
              <input type="email" autoComplete="username" placeholder="name@company.com" className={authInputClass} />
            </label>
          )}
          {step === 1 && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">6-digit code</span>
              <input inputMode="numeric" autoComplete="one-time-code" placeholder="448291" className={`${authInputClass} tracking-[0.3em]`} />
            </label>
          )}
          {step === 2 && (
            <>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">New password</span>
                <input type="password" autoComplete="new-password" className={authInputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Confirm password</span>
                <input type="password" autoComplete="new-password" className={authInputClass} />
              </label>
            </>
          )}
          <Button type="submit" full>
            {step === 0 ? "Send code" : step === 1 ? "Continue" : "Update password"}
          </Button>
        </form>
      )}
    </AuthFrame>
  );
}
