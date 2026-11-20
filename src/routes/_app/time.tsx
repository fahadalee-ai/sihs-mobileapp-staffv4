import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/time")({
  head: () => ({ meta: [{ title: "SIH&S — Time and expenses" }] }),
  component: TimeScreen,
});

function TimeScreen() {
  const { user } = useStaff();
  const [ocr, setOcr] = useState("42.18");
  const [decision, setDecision] = useState("");
  const supervisor = user?.workerType === "supervisor" || user?.approvedRoles.includes("OFC");
  return (
    <div>
      <ScreenHeader title="Time and expenses" backTo="/profile" backLabel="Profile" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <p>Contract NW-C-14 · job SIHS-S-44190 · labor category Field technician. Time zone: Eastern.</p>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Separate lines</h2>
          <p>Hours: 2.5</p>
          <p>GPS events: 4 sample points</p>
          <p>Provider charges: $85 agreed rate</p>
          <p>Customer quantities: 1 tow</p>
        </section>
        <Field label="Mileage">
          <Input defaultValue="18" />
        </Field>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Receipt scan</h2>
          <p className="text-[#6b7280]">OCR read $42.18. Correct it before save. Demo only.</p>
          <Field label="Corrected amount">
            <Input value={ocr} onChange={(event) => setOcr(event.target.value)} />
          </Field>
        </section>
        <p className="text-xs text-[#6b7280]">Timecard rule sample: nearest 6 minutes. Overtime after 8 hours is sent to the office. It is not calculated as pay in this app.</p>
        {supervisor ? (
          <div className="flex gap-2">
            <Button type="button" onClick={() => setDecision("Approved")}>Approve</Button>
            <Button type="button" variant="outline" onClick={() => setDecision("Returned")}>Return with reason</Button>
          </div>
        ) : (
          <p>Supervisor review is available on the supervisor sample account.</p>
        )}
        {decision && <p role="status">Corrected by supervisor — reason: hours overlapped a second site. Status: {decision}.</p>}
        <Link to="/mfa" className="inline-flex min-h-11 items-center font-semibold text-[#2f7a1c]">
          Second factor before approving time
        </Link>
      </div>
    </div>
  );
}
