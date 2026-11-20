import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";

export const Route = createFileRoute("/_app/help")({
  head: () => ({ meta: [{ title: "SIH&S — Help" }] }),
  component: Help,
});

function Help() {
  return (
    <div>
      <ScreenHeader title="Help" backTo="/profile" backLabel="Profile" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Replay tutorial</h2>
          <p className="mt-1 text-[#6b7280]">The intro can be skipped on every step. Replay does not change your account.</p>
          <Link to="/onboarding" className="mt-2 inline-flex min-h-11 items-center font-semibold text-[#2f7a1c]">
            Replay tutorial
          </Link>
        </section>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">This phone vs SIH&S services</h2>
          <p className="mt-1">Call, text, and email buttons open your phone’s own apps. Job messages, reminders, and escalation stay inside SIH&S.</p>
          <p className="mt-2">Location, camera, and barcode prompts are phone permissions. Dispatch, billing, and archive status are SIH&S records.</p>
        </section>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">SMS</h2>
          <p className="mt-1">Text alerts are optional and off until you turn them on. Opting out does not block sign-in, requests, or payment. Reply STOP to opt out. In-app notices remain available.</p>
        </section>
      </div>
    </div>
  );
}
