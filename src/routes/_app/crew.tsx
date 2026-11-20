import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/crew")({
  head: () => ({ meta: [{ title: "SIH&S — Provider workspace" }] }),
  component: Crew,
});

function Crew() {
  const { user } = useStaff();
  const allowed = user?.workerType === "supervisor";
  return (
    <div>
      <ScreenHeader title="Provider workspace" backTo="/profile" backLabel="Profile" />
      <div className="space-y-3 px-4 pb-8 text-sm">
        <DemoBadge />
        {!allowed && (
          <p className="rounded-md bg-[#f3f4f6] p-3">This workspace is for a Subcontractor Supervisor or Company Admin. Switch to that sample account to manage workers.</p>
        )}
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Permitted workers</h2>
          <p className="mt-1">Riley Chen · assigned · Harbor Yard</p>
          <p>Sam Patel · not assigned today</p>
          <p className="mt-2 text-[#6b7280]">Add, remove, and assign stay inside your company only.</p>
        </section>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Agreed rates</h2>
          <p>Light-duty tow labor · $85 / hour agreed</p>
          <p>Courier stop · $42 / stop agreed</p>
          <p className="mt-2 font-semibold">SIH&S margin is not shown.</p>
        </section>
        <p className="rounded-md bg-[#f3f4f6] p-3">Not visible to your organization. Unrelated contracts and other companies’ records stay hidden.</p>
        <p>Assignments, service proof, time, expenses, and invoices for your workers are listed here. Sample invoice NW-INV-19 is draft only.</p>
      </div>
    </div>
  );
}
