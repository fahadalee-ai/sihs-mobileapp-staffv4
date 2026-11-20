import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Briefcase, Check, ChevronRight, Cloud, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { Art } from "@/components/Art";
import { ScreenHeader } from "@/components/Chrome";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "SIH&S — Notifications" }] }),
  component: Notifications,
});

function iconFor(type: string): ReactNode {
  if (type.toLowerCase().includes("sync")) return <Cloud size={18} aria-hidden />;
  if (type.toLowerCase().includes("qualification")) return <AlertCircle size={18} aria-hidden />;
  if (type.toLowerCase().includes("changed") || type.toLowerCase().includes("postpon")) return <Clock size={18} aria-hidden />;
  if (type.toLowerCase().includes("approval") || type.toLowerCase().includes("correction")) return <Check size={18} aria-hidden />;
  return <Briefcase size={18} aria-hidden />;
}

function Notifications() {
  const { notices, notifyPush, notifySms, setNotify } = useStaff();
  const navigate = useNavigate();
  const ordered = [...notices].sort((a, b) => b.at.localeCompare(a.at));

  const open = (href: string) => {
    const job = href.match(/^\/jobs\/(.+)$/);
    if (job) navigate({ to: "/jobs/$id", params: { id: job[1] } });
    else if (href === "/qualifications") navigate({ to: "/qualifications" });
    else if (href === "/sync") navigate({ to: "/sync" });
    else navigate({ to: "/jobs" });
  };

  return (
    <div>
      <ScreenHeader title="Notifications" backTo="/home" />
      <div className="px-4 pb-8">
        <p className="text-sm leading-snug text-[#6b7280]">
          Tap an item to open the record. Notifications never include medical or claim details.
        </p>

        {ordered.length === 0 ? (
          <div className="mt-4 rounded-md bg-white shadow-sm ring-1 ring-[#ececec] px-3 py-6 text-center">
            <Art kind="empty" className="mx-auto h-28 w-full" />
            <p className="mt-2 text-sm text-[#6b7280]">No notifications.</p>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {ordered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-start gap-3 rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3 text-left"
                  onClick={() => open(item.href)}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f3f4f6] text-[#2f7a1c]">
                    {iconFor(item.type)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#2f7a1c]">{item.type}</span>
                    <span className="mt-1 block text-sm font-semibold leading-snug">{item.text}</span>
                    <span className="mt-1 block text-xs text-[#6b7280]">{new Date(item.at).toLocaleString()}</span>
                  </span>
                  <ChevronRight size={18} className="mt-1 shrink-0 text-[#6b7280]" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}

        <section className="mt-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">How you are reached</h2>
          <div className="mt-2 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-[#ececec]">
            <label className="flex min-h-14 items-center justify-between gap-3 px-3">
              <span>
                <span className="block text-sm font-semibold">In-app notifications</span>
                <span className="block text-xs text-[#6b7280]">Assignments, approvals, and sync issues</span>
              </span>
              <input
                type="checkbox"
                className="h-5 w-5 shrink-0"
                checked={notifyPush}
                onChange={(e) => setNotify({ push: e.target.checked })}
              />
            </label>
            <label className="flex min-h-14 items-center justify-between gap-3 border-t border-[#ececec] px-3">
              <span>
                <span className="block text-sm font-semibold">SMS for assignment changes</span>
                <span className="block text-xs text-[#6b7280]">Optional and off until you turn it on. Reply STOP to opt out. This does not block sign-in or requests.</span>
              </span>
              <input
                type="checkbox"
                className="h-5 w-5 shrink-0"
                checked={notifySms}
                onChange={(e) => setNotify({ sms: e.target.checked })}
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
