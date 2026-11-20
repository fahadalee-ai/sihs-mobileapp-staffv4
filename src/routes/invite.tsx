import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";
import { Button } from "@/components/kit";

export const Route = createFileRoute("/invite")({
  head: () => ({ meta: [{ title: "SIH&S — Invitation" }] }),
  component: Invite,
});

function Invite() {
  const navigate = useNavigate();
  return (
    <div className="theme-dark fixed inset-0 z-50 overflow-y-auto bg-[#0a3d24] px-5 py-10 text-white">
      <DemoBadge label="Demo only" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#8fd86f]">Invitation</p>
      <h1 className="mt-2 text-[28px] font-semibold">Avery Quinn invited you to SIH&S</h1>
      <p className="mt-3 text-sm text-[#c5d4cc]">
        Northwind Lot Services · Subcontractor Worker · Site: Harbor Yard. This invitation expires Fri, Dec 4, 2026, 5:00 PM EST.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li className="rounded-md bg-[#06281f] p-3">Organization: Northwind Lot Services</li>
        <li className="rounded-md bg-[#06281f] p-3">Role requested: Towing and roadside</li>
        <li className="rounded-md bg-[#06281f] p-3">Admin approval is still required before the first working login.</li>
      </ul>
      <Button type="button" full className="mt-6" onClick={() => navigate({ to: "/setup" })}>
        Accept invitation
      </Button>
      <Link to="/login" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#8fd86f]">
        I already have an account
      </Link>
    </div>
  );
}
