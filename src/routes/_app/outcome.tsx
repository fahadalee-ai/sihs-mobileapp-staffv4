import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field } from "@/components/kit";

export const Route = createFileRoute("/_app/outcome")({
  head: () => ({ meta: [{ title: "SIH&S — Job outcome" }] }),
  component: Outcome,
});

const FLOWS = [
  "Reschedule request",
  "Cancel",
  "No access / No-show",
  "Unsafe conditions",
  "Equipment mismatch",
  "Unsuccessful work",
] as const;

const REASONS = [
  "Customer not on site",
  "Gate locked",
  "Weather",
  "Wrong equipment",
  "Safety stop",
  "Other listed reason",
];

function Outcome() {
  const [flow, setFlow] = useState<(typeof FLOWS)[number]>(FLOWS[0]);
  const [reason, setReason] = useState(REASONS[0]);
  const [sent, setSent] = useState(false);
  return (
    <div>
      <ScreenHeader title="Job outcome" backTo="/jobs" backLabel="Jobs" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <p>Choose an outcome. A reason from the list is sent to the office with this notice. The job is not closed by this step.</p>
        <div className="flex flex-wrap gap-2">
          {FLOWS.map((item) => (
            <button
              key={item}
              type="button"
              className={`min-h-11 rounded-full px-3 text-sm font-semibold ${flow === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb]"}`}
              onClick={() => setFlow(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <Field label="Reason">
          <select className="min-h-12 w-full rounded-full border border-[#e5e7eb] bg-white px-3" value={reason} onChange={(event) => setReason(event.target.value)}>
            {REASONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <p className="rounded-md bg-[#f3f4f6] p-3">Office notice preview: {flow}. Reason: {reason}. Job SIHS-S-44190. Time zone: Eastern.</p>
        <Button type="button" full onClick={() => setSent(true)}>
          Send to office
        </Button>
        {sent && <p role="status">Notice sent to dispatch in this preview. Customer and worker both see the same reason.</p>}
      </div>
    </div>
  );
}
