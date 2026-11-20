import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/forgot")({
  head: () => ({ meta: [{ title: "SIH&S — Forgot password" }] }),
  component: Forgot,
});

const STEPS = ["Account", "Code", "New password"] as const;

function Forgot() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <div className="theme-dark fixed inset-0 z-50 overflow-y-auto bg-[#0a3d24] text-white">
      <ScreenHeader title="Forgot Password" backTo="/login" dark />
      <div className="px-5 pb-10">
        <DemoBadge label="Demo only" />
        <p className="mt-4 text-sm text-[#c5d4cc]">Step {step + 1} of 3 · {STEPS[step]}</p>
        {step === 0 && (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              setStep(1);
            }}
          >
            <Field label="Work email">
              <Input type="email" placeholder="name@company.com" />
            </Field>
            <Button type="submit" full>Send code</Button>
          </form>
        )}
        {step === 1 && (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              setStep(2);
            }}
          >
            <p className="mb-3 text-sm text-[#c5d4cc]">Sample code 448291. It expires in 10 minutes.</p>
            <Field label="Code">
              <Input inputMode="numeric" />
            </Field>
            <Button type="submit" full>Continue</Button>
          </form>
        )}
        {step === 2 && (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <Field label="New password">
              <Input type="password" />
            </Field>
            <Field label="Confirm password">
              <Input type="password" />
            </Field>
            <Button type="submit" full>Reset password</Button>
          </form>
        )}
        {done && <p className="mt-4 text-sm" role="status">Password reset in this preview. Sign in with the new password.</p>}
      </div>
    </div>
  );
}
