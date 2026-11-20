import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button, Field, Input } from "@/components/kit";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";

export const Route = createFileRoute("/_app/messages")({
  head: () => ({ meta: [{ title: "SIH&S — Messages" }] }),
  component: Messages,
});

function Messages() {
  const [failed, setFailed] = useState(false);
  return (
    <div>
      <ScreenHeader title="Job messages" backTo="/jobs" backLabel="Jobs" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <p className="font-semibold">SIHS-S-44190 · Harbor Yard</p>
        <article className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <p className="text-xs text-[#6b7280]">Dispatch · 9:12 AM EST</p>
          <p>Gate code is on the assignment. Call if the dock is blocked.</p>
        </article>
        <article className="rounded-md bg-[#f3f4f6] p-3">
          <p className="text-xs text-[#6b7280]">Reminder · 10:00 AM EST</p>
          <p>Arrive window is 10:30–11:00 AM Eastern.</p>
        </article>
        <Field label="Reply">
          <Input placeholder="Message the office" />
        </Field>
        <div className="flex flex-wrap gap-3">
          <a className="font-semibold text-[#2f7a1c]" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a>
          <a className="font-semibold text-[#2f7a1c]" href="sms:+13024064665">Text</a>
          <a className="font-semibold text-[#2f7a1c]" href="mailto:sihs@susanshooks.com">Email</a>
        </div>
        <Button type="button" variant="outline" onClick={() => setFailed(true)}>
          Escalate
        </Button>
        {failed && <p role="status">Delivery failed. The office still has the escalation. Retry does not create a second job.</p>}
        <p className="text-xs text-[#6b7280]">No job number is required for a concern that is not tied to a job. Open Report an Incident or Concern.</p>
      </div>
    </div>
  );
}
