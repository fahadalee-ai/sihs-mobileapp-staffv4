import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Art } from "@/components/Art";
import { DemoBadge } from "@/components/DemoBadge";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/jobs")({
  head: () => ({ meta: [{ title: "SIH&S — Jobs" }] }),
  component: Jobs,
});

const TABS = ["Requests", "Confirmed bookings", "Assignments"] as const;

const REQUESTS = [
  { id: "RQ-220", service: "Cleaning", site: "Harbor Yard", when: "Fri, Nov 20, 2026, 1:00 PM EST", note: "Info only. Not a booking." },
];

const BOOKINGS = [
  { id: "BK-18", service: "Courier", site: "Harbor Yard", when: "Fri, Nov 20, 2026, 2:00 PM EST", po: "PO-88421" },
  { id: "BK-19", service: "Courier", site: "Maple Dock", when: "Fri, Nov 20, 2026, 3:30 PM EST", po: "PO-88421" },
];

function Jobs() {
  const { jobs, showAllJobs, user } = useStaff();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Assignments");
  const navigate = useNavigate();
  const role = user?.activeRole;
  const list = jobs.filter((job) => {
    if (!showAllJobs && role && job.functionCode !== role) return false;
    return true;
  });

  return (
    <div className="px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <h1 className="text-2xl font-semibold">My assignments</h1>
      <div className="mt-2"><DemoBadge /></div>
      <p className="mt-2 text-sm text-[#6b7280]">Requests, confirmed bookings, and assignments stay in separate lists. Times use the local time zone.</p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="tablist" aria-label="Job status">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={`min-h-11 rounded-md px-2 text-sm font-semibold ${tab === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb]"}`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {tab === "Requests" && (
          <>
            {REQUESTS.map((item) => (
              <article key={item.id} className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 shadow-sm ring-1 ring-[#ececec]">
                <p className="text-xs text-[#6b7280]">{item.id} · Request · info only</p>
                <p className="mt-1 font-semibold">{item.service}</p>
                <p className="text-sm">{item.site}</p>
                <p className="text-sm">{item.when}</p>
                <p className="mt-2 text-sm font-semibold">You cannot accept this job — credential expired / missing qualification</p>
                <p className="mt-1 text-xs text-[#6b7280]">{item.note}</p>
              </article>
            ))}
          </>
        )}
        {tab === "Confirmed bookings" && BOOKINGS.map((item) => (
          <article key={item.id} className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 shadow-sm ring-1 ring-[#ececec]">
            <p className="text-xs text-[#6b7280]">{item.id} · Confirmed booking · its own visit</p>
            <p className="mt-1 font-semibold">{item.service}</p>
            <p className="text-sm">{item.site} · {item.when}</p>
            <p className="text-sm">Contract / PO: {item.po}</p>
            <p className="mt-2 text-xs text-[#6b7280]">Checks: qualification current · equipment listed · availability open</p>
          </article>
        ))}
        {tab === "Assignments" && list.length === 0 && (
          <div className="rounded-md border border-dashed border-[#e5e7eb] p-6 text-center">
            <Art kind="empty" className="mx-auto h-32 w-full" />
            <p className="mt-2 text-sm font-semibold">No assignments in this view</p>
          </div>
        )}
        {tab === "Assignments" && list.map((job) => (
          <article key={job.id} className="rounded-[16px] border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-[#ececec] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#6b7280]">{job.id}</p>
                <p className="mt-1 inline-flex rounded-md border border-[#e5e7eb] px-2 py-1 text-xs font-semibold">{job.service}</p>
              </div>
              <span className="rounded-full bg-[#5cba40] px-2 py-1 text-xs font-semibold text-white">{job.status}</span>
            </div>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Property</dt><dd className="text-right">{job.property}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Time</dt><dd className="text-right">{job.when} · local time zone</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Contract / PO</dt><dd className="text-right">PO-88421</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-[#6b7280]">Service location</dt><dd className="text-right">{job.serviceLocation}</dd></div>
            </dl>
            <p className="mt-2 text-xs text-[#6b7280]">Latest update: {job.latestLabel}. Source: {job.latestSource}</p>
            <button type="button" className="mt-2 flex min-h-11 w-full items-center text-sm font-semibold text-[#2f7a1c]" onClick={() => navigate({ to: "/jobs/$id", params: { id: job.id } })}>
              Job details
            </button>
            <Link to="/outcome" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#2f7a1c]">Report an outcome</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
