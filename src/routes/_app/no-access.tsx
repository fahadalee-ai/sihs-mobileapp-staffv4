import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";

export const Route = createFileRoute("/_app/no-access")({
  head: () => ({ meta: [{ title: "SIH&S — No access" }] }),
  component: NoAccess,
});

function NoAccess() {
  return (
    <div>
      <ScreenHeader title="No access" backTo="/roles" backLabel="Roles" />
      <div className="space-y-3 px-4 pb-8 text-sm">
        <DemoBadge />
        <h2 className="text-xl font-semibold">You cannot open this record</h2>
        <p>Your role can see its own jobs for Northwind Lot Services at Harbor Yard. Financial, personnel, health, and evidence files stay closed.</p>
        <p className="rounded-md bg-[#f3f4f6] p-3">Not visible to your organization. Another company’s contract and SIH&S margin are not shown.</p>
      </div>
    </div>
  );
}
