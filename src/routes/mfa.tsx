import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthFrame, authInputClass } from "@/components/AuthFrame";
import { Button } from "@/components/kit";

export const Route = createFileRoute("/mfa")({
  head: () => ({ meta: [{ title: "SIH&S — Verification code" }] }),
  component: Mfa,
});

function Mfa() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  return (
    <AuthFrame
      title="Verify it's you"
      subtitle="A code is required before approving time, opening a restricted report, or releasing evidence."
      backTo="/login"
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setDone(true);
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">6-digit code</span>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="448291"
            className={`${authInputClass} tracking-[0.3em]`}
          />
        </label>
        <p className="text-sm text-[#9fb5ab]">Preview code: 448291. Demo only.</p>
        <Button type="submit" full>
          Verify
        </Button>
      </form>
      {done && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#073222] p-4 text-sm" role="status">
          <p className="font-semibold">Code accepted</p>
          <p className="mt-1 text-[#c9d9d1]">You can continue the privileged action.</p>
          <button type="button" className="mt-3 min-h-11 font-semibold text-[#b6e38a]" onClick={() => navigate({ to: "/home" })}>
            Continue
          </button>
        </div>
      )}
    </AuthFrame>
  );
}
