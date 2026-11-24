import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthFrame } from "@/components/AuthFrame";
import { Button } from "@/components/kit";

export const Route = createFileRoute("/invite")({
  head: () => ({ meta: [{ title: "SIH&S — Invitation" }] }),
  component: Invite,
});

function Invite() {
  const navigate = useNavigate();
  return (
    <AuthFrame
      title="You are invited"
      subtitle="Avery Quinn invited you to join Northwind Lot Services on SIH&S."
      backTo="/login"
    >
      <dl className="space-y-3 rounded-2xl border border-white/10 bg-[#073222] p-4 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#9fb5ab]">Organization</dt>
          <dd className="mt-0.5 font-semibold">Northwind Lot Services</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#9fb5ab]">Role</dt>
          <dd className="mt-0.5 font-semibold">Subcontractor worker · Towing and roadside</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#9fb5ab]">Site</dt>
          <dd className="mt-0.5 font-semibold">Harbor Yard</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#9fb5ab]">Expires</dt>
          <dd className="mt-0.5">Fri, Dec 4, 2026, 5:00 PM EST</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-[#c9d9d1]">
        Accepting starts setup. An administrator still approves the account before the first working login.
      </p>
      <Button type="button" full className="mt-6" onClick={() => navigate({ to: "/setup" })}>
        Accept invitation
      </Button>
      <p className="mt-4 text-center text-sm text-[#c9d9d1]">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#b6e38a]">
          Sign in
        </Link>
      </p>
    </AuthFrame>
  );
}
