import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/DemoBadge";

export const Route = createFileRoute("/timeout")({
  head: () => ({ meta: [{ title: "SIH&S — Session ended" }] }),
  component: Timeout,
});

function Timeout() {
  return (
    <div className="theme-dark fixed inset-0 z-50 overflow-y-auto bg-[#0a3d24] px-5 py-10 text-white">
      <DemoBadge label="Demo only" />
      <h1 className="mt-4 text-[28px] font-semibold">Your session timed out</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#c5d4cc]">
        SIH&S signed this device out after 15 minutes without use. Unsent notes stay in the offline queue. Sign in again to continue.
      </p>
      <Link to="/login" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#5cba40] px-6 font-semibold text-white">
        Sign in again
      </Link>
    </div>
  );
}
