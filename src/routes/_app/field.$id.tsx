import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ScreenHeader } from "@/components/Chrome";
import { Button } from "@/components/kit";
import type { Job, Source } from "@/lib/staff-data";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/field/$id")({
  head: () => ({ meta: [{ title: "SIH&S — Job status" }] }),
  component: FieldFlow,
});

const STEPS = [
  { label: "Acknowledged", action: "Acknowledge", event: "Acknowledged", note: "Assigned is already on the job and is read-only." },
  { label: "En Route", action: "En route", event: "En route", note: "Location sharing stays on for this assignment." },
  { label: "Arrived", action: "Arrived", event: "Arrived", note: "Arrival suggested — please confirm. A location alert does not finish the work." },
  { label: "Work Started", action: "Work started", event: "Work started", note: "Use this only on services where work start is separate from arrival." },
  { label: "Service Completed", action: "Service completed", event: "Service completed", note: "This does not close the job. Follow-up is pending customer sign-off, office review, or billing." },
  { label: "Departed", action: "Departed", event: "Departed", note: "Leaving the site does not close the job." },
] as const;

function completedCount(job: Job) {
  const blob = [job.latestLabel, job.status, ...job.events.map((event) => event.type)].join(" ").toLowerCase();
  if (blob.includes("departed") || blob.includes("report submitted")) return 6;
  if (blob.includes("service completed") || blob.includes("job ended") || job.status.startsWith("Submitted") || job.status === "Completed") return 5;
  if (blob.includes("work started") || blob.includes("job started")) return 4;
  if (blob.includes("arrived") || blob.includes("on scene")) return 3;
  if (blob.includes("en route") || blob.includes("on the way")) return 2;
  if (blob.includes("acknowledged")) return 1;
  return 0;
}

function FieldFlow() {
  const { id } = Route.useParams();
  const { jobs, advance, addEvent, user } = useStaff();
  const job = jobs.find((item) => item.id === id);
  const source: Source = user?.workerType === "employee" ? "Employee-entered" : "Contractor-entered";

  if (!job) {
    return (
      <div>
        <ScreenHeader title="Job status" backTo="/jobs" backLabel="Jobs" />
        <p className="px-4 text-sm">You don't have access to this record. Contact SIH&S.</p>
      </div>
    );
  }

  const done = completedCount(job);
  const finished = done >= STEPS.length;

  const save = (index: number) => {
    const step = STEPS[index];
    addEvent(job.id, step.event, source, job.serviceLocation, index === 1 ? "18 m" : "20 m");
    if (index === 3) advance(job.id, { status: "In Progress", latestLabel: step.event, latestSource: source, phase: index });
    else if (index === STEPS.length - 1) {
      advance(job.id, {
        status: "Waiting for approval",
        latestLabel: "Departed — pending customer sign-off / office review / billing",
        latestSource: source,
        phase: index,
      });
    } else advance(job.id, { latestLabel: step.event, latestSource: source, phase: index });
  };

  return (
    <div>
      <ScreenHeader title="Job status" backTo="/jobs" backLabel="Jobs" />
      <div className="px-4 pb-8">
        <p className="text-sm text-[#6b7280]">{job.id}</p>
        <h2 className="text-xl font-semibold">{job.service}</h2>
        <p className="mt-1 text-sm text-[#6b7280]">{job.serviceLocation}</p>

        <p className="mt-3 rounded-md bg-[#f3f4f6] p-3 text-sm">Assigned · read-only. Alternative outcomes (Interrupted, Canceled, Unsuccessful) are separate from these steps.</p>
        <ol className="mt-5 space-y-2">
          {STEPS.map((step, index) => {
            const state = finished || index < done ? "done" : index === done ? "now" : "later";
            return (
              <li key={step.label} className={`rounded-md p-3 ${state === "now" ? "bg-white shadow-sm ring-1 ring-[#ececec] ring-1 ring-[#5cba40]" : "bg-white shadow-sm ring-1 ring-[#ececec]"}`}>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      state === "done" ? "bg-[#5cba40] text-white" : state === "now" ? "bg-[#5cba40] text-white" : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    {state === "done" ? <Check size={16} aria-hidden /> : index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{step.label}</span>
                    <span className="block text-xs text-[#6b7280]">
                      {state === "done" ? `Saved · Source: ${source}` : state === "now" ? "Update this status now" : "Available after the step above"}
                    </span>
                  </span>
                </div>
                {state === "now" && (
                  <div className="mt-3">
                    <p className="text-sm text-[#6b7280]">{step.note}</p>
                    <Button type="button" full className="mt-3" onClick={() => save(index)}>
                      {step.action}
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {finished && (
          <p className="mt-4 rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3 text-sm" role="status">
            Pending customer sign-off / office review / billing. The job is not closed.
          </p>
        )}
      </div>
    </div>
  );
}
