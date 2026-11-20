import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Art } from "@/components/Art";
import { DemoBadge } from "@/components/DemoBadge";
import { ScreenHeader } from "@/components/Chrome";
import { Button, Field, Textarea } from "@/components/kit";
import { useStaff } from "@/lib/staff-store";
import photoDocs from "@/img/photo-docs.jpg";
import photoJump from "@/img/photo-jump.jpg";
import photoTow from "@/img/photo-towing.jpg";

export const Route = createFileRoute("/_app/jobs/$id")({
  head: () => ({ meta: [{ title: "SIH&S — Job" }] }),
  component: JobDetail,
});

function JobDetail() {
  const { id } = Route.useParams();
  const { jobs, acknowledge, addEvent, user } = useStaff();
  const navigate = useNavigate();
  const job = jobs.find((item) => item.id === id);
  const [ack, setAck] = useState(false);
  const [problem, setProblem] = useState("");
  const [sent, setSent] = useState("");
  const [reason, setReason] = useState("Poor GPS");
  const [manual, setManual] = useState(false);

  if (!job) {
    return (
      <div>
        <ScreenHeader title="Job details" backTo="/jobs" backLabel="Jobs" />
        <p className="px-4 text-sm">You don't have access to this record. Contact SIH&S.</p>
      </div>
    );
  }

  const blocked = job.privateProperty && job.authVerified === false;
  const hideClientMedia = ["COL", "DNA", "NOT"].includes(job.functionCode);
  const clientMedia = hideClientMedia
    ? []
    : [
        { id: "photo", kind: "Photo", src: job.functionCode === "TOW" && job.service === "Jump Start" ? photoJump : photoTow, caption: "Photo from the client" },
        { id: "video", kind: "Video", src: photoDocs, caption: "Video from the client · 12 seconds" },
      ];
  const source = user?.workerType === "employee" ? "Employee-entered" : "Contractor-entered";
  const checkIn = job.events.find((event) => /on scene|arrival|check-in/i.test(event.type));

  return (
    <div>
      <ScreenHeader title="Job details" backTo="/jobs" backLabel="Jobs" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <div>
          <p className="text-[#6b7280]">{job.id}</p>
          <h2 className="text-xl font-semibold">{job.service}</h2>
          <div className="mt-2"><DemoBadge /></div>
          <p className="mt-2 text-sm">Contract / PO: PO-88421 · {job.when} · Eastern time</p>
          {job.functionCode === "TOW" && (
            <section className="mt-3 rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
              <h3 className="font-semibold">Towing</h3>
              <p>Light-duty consensual tow and authorized secondary tow only. No non-consensual impound.</p>
              <p className="mt-1">Vehicle: sample sedan · condition unknown — dispatch to confirm</p>
              <p>Pickup: {job.serviceLocation} · Destination: sample lot</p>
              <p>Keys: unknown — dispatch to confirm · Drivetrain: unknown — dispatch to confirm</p>
              <p>Rolling / steering: unknown — dispatch to confirm · Equipment: wheel lift</p>
              <p>Authorizing party: site lead · Payer: Harbor Yard Co</p>
              <p className="mt-2 font-semibold">Lockout without an Authorized U-Haul assignment badge is blocked.</p>
              <p className="text-xs text-[#6b7280]">A job tagged Authorized U-Haul assignment shows Contract eligibility verified.</p>
            </section>
          )}
          {job.functionCode === "NOT" && (
            <p className="mt-2">Attendance, status, and charges only. Signatures in this app are not notarizations. Official notarial records are kept separately.</p>
          )}
          {job.functionCode === "XPT" && (
            <section className="mt-3 rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
              <h3 className="font-semibold">Stops</h3>
              <p>Pickup, intermediate stop, handoff, destination, and return leg each have their own Arrived and Departed times. Finishing one stop does not finish the job.</p>
              <p className="mt-1">Passenger details: Restricted — need-to-know</p>
            </section>
          )}
          <p className="mt-3 rounded-md bg-[#f3f4f6] p-3">Follow-up after service completed: Pending customer sign-off / office review / billing. The job is not closed.</p>
          <details className="mt-3 rounded-md border border-[#e5e7eb] p-3">
            <summary className="font-semibold">Update details</summary>
            <p className="mt-2">Riley Chen · iPhone Field-04 · manual · 10:41 AM EST · server received 10:41:08 AM EST</p>
            <p>Coordinates sample · accuracy 18 m · Clock difference detected</p>
            <p>Corrected — reason: gate delay. Original value kept.</p>
          </details>
          <p className="mt-3 text-sm">Location is tracked only during an active assignment or authorized on-duty period.</p>
          <p className="mt-1 text-sm">Background location failed. GPS weak. Location permission off.</p>
          <p className="mt-1 text-sm font-semibold">Arrival suggested — please confirm. This is within about 100 feet and does not complete the work.</p>
          <div className="mt-3 flex flex-col gap-1">
            <Link to="/proof" className="font-semibold text-[#2f7a1c]">Service proof</Link>
            <Link to="/outcome" className="font-semibold text-[#2f7a1c]">Outcome with reason</Link>
            <Link to="/messages" className="font-semibold text-[#2f7a1c]">Job messages</Link>
            <Link to="/testing" className="font-semibold text-[#2f7a1c]">Testing visit privacy</Link>
          </div>
          <p className="mt-2 inline-flex rounded-full bg-[#5cba40] px-2 py-1 text-xs font-semibold text-white">{job.status}</p>
          <p className="mt-2 text-xs text-[#6b7280]">Source: {job.latestSource}</p>
          <p className="mt-2 text-sm">{job.when}</p>
          <p className="text-sm text-[#6b7280]">{job.serviceLocation}</p>
          <Button type="button" full className="mt-4" onClick={() => navigate({ to: "/field/$id", params: { id: job.id } })}>
            Update job status
          </Button>
        </div>
        <section className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">The job</h3>
          <p className="mt-1 text-base font-semibold">{job.service}</p>
          <p className="mt-1">{job.id} · {job.company}</p>
        </section>
        <section className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">The problem</h3>
          <p className="mt-1">{job.scope}</p>
        </section>
        <section className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">Work to do</h3>
          <ul className="mt-2 space-y-2">
            {job.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">Client location</h3>
          <p className="mt-2 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#2f7a1c]" aria-hidden />
            <span>
              <span className="block">{job.propertyAddress}</span>
              <span className="mt-1 block text-[#6b7280]">Service location: {job.serviceLocation}</span>
            </span>
          </p>
          <Art kind="map" className="mt-3 h-32 w-full rounded-md" />
          <p className="mt-2 text-[#6b7280]">{job.access}</p>
        </section>
        <section className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">Photos and videos from the client</h3>
          {hideClientMedia ? (
            <p className="mt-2 text-[#6b7280]">Photos and videos of participants or documents are not shown on this job.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {clientMedia.map((item) => (
                <li key={item.id}>
                  <img src={item.src} alt={item.caption} className="h-40 w-full rounded-md object-cover" />
                  <p className="mt-1 text-xs text-[#6b7280]">{item.kind} · {item.caption}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-md border border-[#5cba40]/50 bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="font-semibold">Check-in</h3>
          {checkIn ? (
            <>
              <p className="mt-2">{checkIn.type}</p>
              <p className="mt-1 text-xs text-[#6b7280]">Source: {checkIn.source}</p>
              <p className="text-xs text-[#6b7280]">Event time: {new Date(checkIn.at).toLocaleString()}</p>
              <p className="text-xs text-[#6b7280]">Server received: {new Date(checkIn.receivedAt).toLocaleString()}</p>
              <p className="text-xs text-[#6b7280]">{checkIn.location} · Accuracy {checkIn.accuracy}</p>
              <p className="mt-2 text-sm text-[#6b7280]">Arrival does not mean work has started.</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-[#6b7280]">Check-in is not on this job yet.</p>
              <Button
                type="button"
                full
                className="mt-3"
                disabled={blocked}
                onClick={() => addEvent(job.id, "On scene—automatically detected", "Automatic", job.serviceLocation, "18 m")}
              >
                Check in
              </Button>
              <button type="button" className="mt-2 min-h-11 text-sm font-semibold text-[#2f7a1c]" onClick={() => setManual((value) => !value)}>
                Location unreliable? Confirm manually
              </button>
              {manual && (
                <div className="mt-2">
                  <Field label="Reason">
                    <select className="min-h-11 w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3 text-sm text-[#111111]" value={reason} onChange={(e) => setReason(e.target.value)}>
                      <option>Poor GPS</option>
                      <option>Indoor</option>
                      <option>Approved alternative</option>
                    </select>
                  </Field>
                  <Button
                    type="button"
                    variant="outline"
                    full
                    onClick={() => addEvent(job.id, `Manual arrival: ${reason}`, source, job.serviceLocation, "Unavailable")}
                  >
                    Confirm check-in
                  </Button>
                  <p className="mt-2 text-xs text-[#6b7280]">Source: {source}. Arrival does not mean work has started.</p>
                </div>
              )}
            </>
          )}
        </section>
        {blocked && (
          <p className="rounded-md border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-[#ececec] p-3 font-semibold">
            Private-property authorization required. A general service request is not sufficient. Work stays blocked until SIH&S verifies authorization.
          </p>
        )}
        <section className="rounded-md border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="font-semibold">Scope</h3>
          <p className="mt-1">{job.scope}</p>
          <h3 className="mt-3 font-semibold">Assigned company or person</h3>
          <p>{job.company} · {job.assignee}</p>
          <h3 className="mt-3 font-semibold">Tasks</h3>
          <ul className="mt-1 list-disc pl-5">{job.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
          <h3 className="mt-3 font-semibold">Completion requirements</h3>
          <ul className="mt-1 list-disc pl-5">{job.completion.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="rounded-md border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-[#ececec] p-3">
          <h3 className="font-semibold">Location</h3>
          <p className="mt-1">Property address: {job.propertyAddress}</p>
          <p>Actual service location: {job.serviceLocation}</p>
          <Art kind="map" className="mt-3 h-32 w-full rounded-md" />
          <h3 className="mt-3 font-semibold">Access instructions</h3>
          <p>{job.access}</p>
          <h3 className="mt-3 font-semibold">Exclusions and restricted-photo areas</h3>
          <p>{job.exclusions || "None listed."}</p>
        </section>
        {job.vehicle && <p>Vehicle: {job.vehicle}</p>}
        {job.authority && <p>Authority status: {job.authority}</p>}
        {job.pickup && <p>Pickup: {job.pickup}</p>}
        {job.destination && <p>Destination: {job.destination}</p>}
        {job.parentIncident && <p>Parent incident {job.parentIncident}. Completing this work order does not close the incident.</p>}
        <section>
          <h3 className="font-semibold">Linked work orders</h3>
          <ul className="mt-2 space-y-2">
            {job.linked.map((row) => (
              <li key={row.id} className="flex justify-between gap-3">
                <span>{row.id} · {row.service}</span>
                <span>{row.status}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-semibold">Change history</h3>
          {job.changes.length === 0 ? <p className="mt-1 text-[#6b7280]">No postponement, cancellation, reassignment, or crew substitution yet. The original assignment stays visible when one is added.</p> : (
            <ul className="mt-2 space-y-2">
              {job.changes.map((entry) => (
                <li key={entry.at + entry.kind}>
                  <p className="font-semibold">{entry.kind}</p>
                  <p>{entry.body}</p>
                  <p className="text-xs text-[#6b7280]">{new Date(entry.at).toLocaleString()} · Source: Dispatcher-entered</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3 className="font-semibold">Timeline</h3>
          <ul className="mt-2 space-y-2">
            {job.events.length === 0 && <li className="text-[#6b7280]">No field events yet.</li>}
            {job.events.map((event) => (
              <li key={event.id} className="rounded-md border border-[#e5e7eb] p-3">
                <p className="font-semibold">{event.type}</p>
                <p>Source: {event.source}</p>
                <p>Event time: {new Date(event.at).toLocaleString()}</p>
                <p>Server received: {new Date(event.receivedAt).toLocaleString()}</p>
                <p>{event.location} · Accuracy {event.accuracy}</p>
                {event.original && <p className="mt-1">Original: {event.original}</p>}
                {(event.corrections ?? []).map((item) => (
                  <p key={item.at} className="mt-1 text-xs">Correction by {item.author} at {new Date(item.at).toLocaleString()}: {item.value}. Reason: {item.reason}</p>
                ))}
              </li>
            ))}
          </ul>
        </section>
        {user?.supervisorFlag && job.crew && (
          <section className="rounded-md border border-[#e5e7eb] p-3">
            <h3 className="font-semibold">Crew</h3>
            <ul className="mt-2">
              {job.crew.map((member) => (
                <li key={member.name}>{member.name} · {member.status}</li>
              ))}
            </ul>
            <p className="mt-2 text-[#6b7280]">A substitution is a request to dispatch. It does not replace the original assignment.</p>
          </section>
        )}
        <div className="space-y-2">
          <Button type="button" full onClick={() => setAck(true)}>Acknowledge Assignment</Button>
          <Button type="button" variant="outline" full onClick={() => navigate({ to: "/field/$id", params: { id: job.id } })}>Open field workflow</Button>
          <Button type="button" variant="outline" full onClick={() => navigate({ to: "/service/$id", params: { id: job.id } })}>Service steps</Button>
          {job.functionCode === "PIM" && (
            <Button type="button" variant="outline" full onClick={() => navigate({ to: "/pim/$id", params: { id: job.id } })}>PIM-VEE™ workspace</Button>
          )}
        </div>
        {sent && <p role="status">{sent}</p>}
      </div>
      {ack && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="ack-title">
          <div className="w-full max-w-[480px] rounded-t-[16px] bg-white shadow-sm ring-1 ring-[#ececec] p-4">
            <h2 id="ack-title" className="text-xl font-semibold">Acknowledge Assignment</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Dispatch assigned this job. Acknowledging it, or reporting a problem, does not change the assignment. Dispatch decides.</p>
            <Field label="Problem, if you are unavailable or in conflict">
              <Textarea value={problem} onChange={(e) => setProblem(e.target.value)} />
            </Field>
            <Button type="button" full onClick={() => { acknowledge(job.id); setSent("Acknowledgment sent to dispatch."); setAck(false); }}>Accept acknowledgment</Button>
            <Button type="button" variant="outline" full className="mt-2" onClick={() => { acknowledge(job.id, problem || "Unavailable"); setSent("Problem reported. Dispatch will decide."); setAck(false); }}>Report a Problem</Button>
            <button type="button" className="mt-2 min-h-11 w-full" onClick={() => setAck(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
