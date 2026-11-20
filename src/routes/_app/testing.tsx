import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/_app/testing")({
  head: () => ({ meta: [{ title: "SIH&S — Testing visit" }] }),
  component: TestingVisit,
});

const EVENTS = ["En Route", "Arrived", "Service Completed", "Departed"] as const;

function TestingVisit() {
  const [event, setEvent] = useState<(typeof EVENTS)[number] | "">("");
  const [scan, setScan] = useState("");
  const [scanNote, setScanNote] = useState("");
  return (
    <div>
      <ScreenHeader title="Testing visit" backTo="/jobs" backLabel="Jobs" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <p className="rounded-md bg-[#f3f4f6] p-3">Codes and location/time records can still identify someone.</p>
        <dl className="space-y-1">
          <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Reference</dt><dd>TV-5591</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Provider</dt><dd>Northwind Lot Services</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Route</dt><dd>Dock A to Suite 2</dd></div>
        </dl>
        <p>Photos, video, entrance photos, signatures, attachments, and free text are off for this visit.</p>
        <div className="flex flex-wrap gap-2">
          {EVENTS.map((item) => (
            <button key={item} type="button" className={`min-h-11 rounded-full px-3 font-semibold ${event === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb]"}`} onClick={() => setEvent(item)}>
              {item}
            </button>
          ))}
        </div>
        <Field label="Operational reason">
          <select className="min-h-12 w-full rounded-full border border-[#e5e7eb] bg-white px-3">
            <option>Arrived at assigned point</option>
            <option>Access delayed</option>
            <option>Left assigned point</option>
          </select>
        </Field>
        {event && (
          <p role="status">
            {event} recorded with time and location only. Completion/departure records describe the visit only — not sample collection, validity, results, or compliance.
          </p>
        )}
        <section className="rounded-md border border-[#e5e7eb] p-3">
          <h2 className="font-semibold">Medical courier handoff</h2>
          <p className="mt-1">Coded package custody. Business handoff signature only. Package tracking does not replace clinical specimen chain of custody.</p>
          <Field label="Package ID">
            <Input
              value={scan}
              onChange={(input) => setScan(input.target.value)}
              placeholder="PKG-44021"
            />
          </Field>
          <Button
            type="button"
            onClick={() => setScanNote(/name|ssn|dob|patient/i.test(scan) ? "That ID looks like personal data and was rejected." : "Permitted package ID accepted.")}
          >
            Scan ID
          </Button>
          {scanNote && <p className="mt-2" role="status">{scanNote}</p>}
        </section>
        <p className="text-xs text-[#6b7280]">Billing for this visit uses a code only. No participant names or clinical details appear in messages or on this device.</p>
      </div>
    </div>
  );
}
