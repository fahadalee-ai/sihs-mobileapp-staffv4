import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/_app/proof")({
  head: () => ({ meta: [{ title: "SIH&S — Service proof" }] }),
  component: Proof,
});

const SERVICES = ["Cleaning", "Lawn", "Supplies", "Notary", "Courier"] as const;

function Proof() {
  const [service, setService] = useState<(typeof SERVICES)[number]>("Cleaning");
  const [signoff, setSignoff] = useState("Satisfactory");
  const [missing, setMissing] = useState(false);
  return (
    <div>
      <ScreenHeader title="Service proof" backTo="/jobs" backLabel="Jobs" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((item) => (
            <button key={item} type="button" className={`min-h-11 rounded-full px-3 font-semibold ${service === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb]"}`} onClick={() => setService(item)}>
              {item}
            </button>
          ))}
        </div>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Photo</h2>
          <p className="mt-1">Before photo · captured Fri, Nov 20, 2026, 10:41 AM EST · uploaded 10:42 AM EST</p>
          <p>Location 39.74, -75.55 · accuracy 18 m</p>
          <p className="mt-1 text-[#6b7280]">Imported file · capture details missing</p>
        </section>
        {service === "Cleaning" && (
          <ul className="space-y-2">
            {["Lobby", "Restrooms", "Break room"].map((area) => (
              <li key={area} className="rounded-md border border-[#e5e7eb] p-3">{area} checklist · not started</li>
            ))}
          </ul>
        )}
        {service === "Lawn" && <p className="rounded-md border border-[#e5e7eb] p-3">Mow front beds · edge walk · blow clippings. Each line is its own task.</p>}
        {service === "Supplies" && (
          <p className="rounded-md border border-[#e5e7eb] p-3">Gloves · quantity 4 · unit box. Paper towels · quantity 2 · unit case.</p>
        )}
        {service === "Notary" && (
          <p className="rounded-md border border-[#e5e7eb] p-3">
            Attendance: present. Status: completed visit. Charges: sample $75. Signatures in this app are not notarizations. Official notarial records are kept separately.
          </p>
        )}
        {service === "Courier" && (
          <div className="space-y-2 rounded-md border border-[#e5e7eb] p-3">
            <p>Package NW-220 · qty 1 · from Harbor Yard to Maple Dock</p>
            <p>Condition: sealed. Barcode field accepts the package ID.</p>
            <Field label="Barcode">
              <Input placeholder="NW-220" />
            </Field>
            <p>Custody: Riley Chen, receiver. Outcomes: Partial, Damaged, Refused, Failed, Return delivery.</p>
          </div>
        )}
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Collect customer sign-off</h2>
          <p className="mt-1 text-[#6b7280]">Dispatch required this. It stays separate from your completion.</p>
          {["Satisfactory", "Completed with exceptions", "Unsatisfactory"].map((item) => (
            <label key={item} className="mt-2 flex items-center gap-2">
              <input type="radio" name="signoff" checked={signoff === item} onChange={() => setSignoff(item)} />
              {item}
            </label>
          ))}
          <p className="mt-2">Signer: Jordan Hale · authority: site lead · 11:05 AM EST</p>
          <p>Exceptions: scuff on dock plate, noted only.</p>
        </section>
        <Button type="button" variant="outline" full onClick={() => setMissing(true)}>
          Signature refused
        </Button>
        {missing && (
          <p role="status">Missing signature. Escalated to office. This job shows Under office review. Your completion record is unchanged.</p>
        )}
      </div>
    </div>
  );
}
