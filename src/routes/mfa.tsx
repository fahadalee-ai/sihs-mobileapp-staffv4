import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/mfa")({
  head: () => ({ meta: [{ title: "SIH&S — Verification code" }] }),
  component: Mfa,
});

function Mfa() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="theme-dark fixed inset-0 z-50 overflow-y-auto bg-[#0a3d24] px-5 py-10 text-white">
      <DemoBadge label="Demo only" />
      <h1 className="mt-4 text-[28px] font-semibold">Enter the second-factor code</h1>
      <p className="mt-2 text-sm text-[#c5d4cc]">
        Required before approving time, opening a restricted report, or releasing evidence. The sample code is 448291.
      </p>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          setDone(true);
        }}
      >
        <Field label="6-digit code">
          <Input value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" />
        </Field>
        <Button type="submit" full>
          Verify
        </Button>
      </form>
      {done && (
        <p className="mt-4 rounded-md bg-[#06281f] p-3 text-sm" role="status">
          Code accepted for this preview. Privileged action can continue.
        </p>
      )}
      <button type="button" className="mt-4 min-h-11 text-sm font-semibold text-[#8fd86f]" onClick={() => navigate({ to: "/home" })}>
        Back to the app
      </button>
    </div>
  );
}
