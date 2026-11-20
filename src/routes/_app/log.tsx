import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Art } from "@/components/Art";
import { Button, Field, Textarea } from "@/components/kit";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/_app/log")({
  head: () => ({ meta: [{ title: "SIH&S — Daily Log" }] }),
  component: DailyLog,
});

const DUTIES = ["Dispatch", "Office work", "Maintenance", "Training", "Loading", "Documentation", "Other"];

function clock(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function DailyLog() {
  const { log, addLog, correctLog, submitLog, logStatus, logReturnReason } = useStaff();
  const [duty, setDuty] = useState(DUTIES[0]);
  const [body, setBody] = useState("");
  const [correctBody, setCorrectBody] = useState("");
  const [reason, setReason] = useState("");
  const [editId, setEditId] = useState("");
  const ordered = [...log].sort((a, b) => a.at.localeCompare(b.at));
  const editing = ordered.find((entry) => entry.id === editId);
  const statusSource = logStatus === "Draft" ? "Employee-entered" : "Dispatcher-entered";

  return (
    <div className="px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#6b7280]">Today</p>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight">Daily Log</h1>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-[#5cba40] px-2 py-1 text-xs font-semibold text-white">{logStatus}</span>
      </header>
      <p className="mt-1 text-xs text-[#6b7280]">Status source: {statusSource}</p>

      {logStatus === "Returned for correction" && (
        <p className="mt-3 flex items-start gap-2 rounded-md bg-[#f3f4f6] p-3 text-sm" role="status">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#2f7a1c]" aria-hidden />
          <span>Returned for correction. Reason: {logReturnReason}</span>
        </p>
      )}

      <p className="mt-3 text-sm leading-snug text-[#6b7280]">Missing GPS or photos does not remove your work time.</p>

      <section className="mt-4 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-[#ececec]" aria-label="Day summary">
        {[
          ["Work time", "6 hours 10 minutes on assigned duties today."],
          ["Site attendance", "Market Street lot, then Wilmington office."],
          ["Job approval status", "One completion is submitted and awaiting SIH&S approval. You do not approve your own work."],
        ].map(([title, detail], index) => (
          <div key={title} className={`px-3 py-3 ${index > 0 ? "border-t border-[#ececec]" : ""}`}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{title}</h2>
            <p className="mt-1 text-sm leading-snug">{detail}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">Add an entry</h2>
        <form
          className="mt-2 rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3"
          onSubmit={(e) => {
            e.preventDefault();
            addLog(duty, body.trim());
            setBody("");
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Duty</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Duty">
            {DUTIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={duty === item}
                className={`min-h-11 rounded-md px-3 text-sm font-semibold ${duty === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb] text-[#111111]"}`}
                onClick={() => setDuty(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Field label="What you did">
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </Field>
          </div>
          <Button type="submit" full>
            Add Entry
          </Button>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">Timeline</h2>
        {ordered.length === 0 ? (
          <div className="mt-2 rounded-md bg-white shadow-sm ring-1 ring-[#ececec] px-3 py-6 text-center">
            <Art kind="empty" className="mx-auto h-28 w-full" />
            <p className="mt-2 text-sm text-[#6b7280]">No log entries yet. Add a duty above.</p>
          </div>
        ) : (
          <ol className="mt-2 space-y-2">
            {ordered.map((entry) => (
              <li key={entry.id} className="rounded-md bg-white shadow-sm ring-1 ring-[#ececec] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#2f7a1c]">{clock(entry.at)}</p>
                    <h3 className="mt-1 text-sm font-semibold">{entry.duty}</h3>
                  </div>
                  {entry.correctionOf && (
                    <span className="shrink-0 rounded-md bg-[#f3f4f6] px-2 py-1 text-[11px] font-semibold">Correction</span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-snug">{entry.body}</p>
                <p className="mt-2 text-xs leading-snug text-[#6b7280]">
                  Source: {entry.source} · {entry.author}
                </p>
                {entry.correctionOf && (
                  <p className="mt-1 text-xs leading-snug text-[#6b7280]">
                    Corrects {entry.correctionOf}. Reason: {entry.reason}. The original entry stays in this list.
                  </p>
                )}
                <button
                  type="button"
                  className="mt-2 min-h-11 text-sm font-semibold text-[#2f7a1c]"
                  onClick={() => {
                    setEditId(entry.id);
                    setCorrectBody("");
                    setReason("");
                  }}
                >
                  Submit a correction
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      {editing && (
        <form
          className="mt-4 rounded-md border border-[#5cba40]/40 bg-white shadow-sm ring-1 ring-[#ececec] p-3"
          onSubmit={(e) => {
            e.preventDefault();
            correctLog(editId, correctBody.trim() || "Correction", reason.trim());
            setEditId("");
            setReason("");
            setCorrectBody("");
          }}
        >
          <h2 className="text-sm font-semibold">Correct {editing.duty}</h2>
          <p className="mt-1 text-xs text-[#6b7280]">This adds a new entry. The original stays.</p>
          <div className="mt-3">
            <Field label="Corrected entry">
              <Textarea value={correctBody} onChange={(e) => setCorrectBody(e.target.value)} />
            </Field>
            <Field label="Reason">
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} />
            </Field>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save correction</Button>
            <Button type="button" variant="outline" onClick={() => setEditId("")}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <Button type="button" full className="mt-6" onClick={submitLog} disabled={logStatus === "Submitted" || logStatus === "Approved"}>
        {logStatus === "Submitted" || logStatus === "Approved" ? "Daily log submitted" : "Submit daily log"}
      </Button>
    </div>
  );
}
