import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { Button } from "@/components/kit";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/sync")({
  head: () => ({ meta: [{ title: "SIH&S — Sync Queue" }] }),
  component: SyncQueue,
});

function SyncQueue() {
  const { sync, retrySync } = useStaff();
  const [help, setHelp] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div>
      <ScreenHeader title="Sync Queue" backTo="/home" />
      <div className="space-y-3 px-4 pb-8 text-sm">
        {sync.map((item) => (
          <article key={item.id} className="rounded-md border border-[#e5e7eb] p-3">
            <p className="font-semibold">{item.type}</p>
            <p>{item.jobId}</p>
            <p>Original event time: {new Date(item.eventTime).toLocaleString()}</p>
            <p className="mt-1 inline-flex rounded-full bg-[#5cba40] px-2 py-1 text-xs font-semibold text-white">{item.status}</p>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                className="min-h-11 font-semibold text-[#2f7a1c] underline"
                onClick={() => {
                  const result = retrySync(item.id);
                  if (result === "duplicate") setNote("Already submitted.");
                  else if (result === "conflict") setNote("Job was reassigned — your update was kept for review, not applied.");
                  else if (result === "waiting") setNote("Still waiting. The item stays on this device and is not archived.");
                  else setNote("Received.");
                }}
              >
                Retry now
              </button>
              <button type="button" className="min-h-11 font-semibold underline" onClick={() => setHelp(true)}>Why is this waiting?</button>
            </div>
          </article>
        ))}
        {note && <p role="status">{note}</p>}
        <Button type="button" variant="outline" onClick={() => setNote("Already submitted.")}>Preview duplicate</Button>
        <Button type="button" variant="outline" onClick={() => setNote("Job was reassigned — your update was kept for review, not applied.")}>Preview conflict</Button>
        <Button type="button" variant="outline" onClick={() => setNote("Blocked. A replaced worker’s late update cannot complete another worker’s assignment.")}>Replaced worker</Button>
        <p>Queue statuses: Waiting, Sent, Failed. File labels: Uploaded is not Archived. Temp copies stay in the app. No personal gallery or cloud backup.</p>
      </div>
      {help && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" role="dialog" aria-modal="true">
          <div className="w-full max-w-[480px] rounded-t-[16px] bg-white shadow-sm ring-1 ring-[#ececec] p-4">
            <h2 className="text-xl font-semibold">Why is this waiting?</h2>
            <p className="mt-2 text-sm">The phone is offline, the file is still uploading, or a SharePoint upload failed. Failed items stay on the device as Upload failed — will retry. They are not marked Archived.</p>
            <button type="button" className="mt-3 min-h-11 w-full font-semibold" onClick={() => setHelp(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
