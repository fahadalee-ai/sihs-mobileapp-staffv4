import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { DemoBadge } from "@/components/DemoBadge";

export const Route = createFileRoute("/office")({
  head: () => ({ meta: [{ title: "SIH&S — Office" }] }),
  component: Office,
});

const SECTIONS = [
  "Access",
  "Users and roles",
  "Service setup",
  "Requests",
  "Dispatch",
  "Proof and issues",
  "PIM-VEE",
  "Workforce",
  "Contracts",
  "Time and billing",
  "Pipeline",
] as const;

type Section = (typeof SECTIONS)[number];
type OfficeRole = "Dispatch" | "Project Manager" | "Management" | "Billing/Office" | "Contracts" | "Safety/HR" | "Admin" | "Marketing";

const ROLES: OfficeRole[] = ["Dispatch", "Project Manager", "Management", "Billing/Office", "Contracts", "Safety/HR", "Admin", "Marketing"];

function Office() {
  const [section, setSection] = useState<Section>("Dispatch");
  const [role, setRole] = useState<OfficeRole>("Dispatch");
  const [query, setQuery] = useState("");
  const safetyLocked = section === "Workforce" && (role === "Dispatch" || role === "Marketing");

  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-white text-[#111111]">
      <header className="flex flex-wrap items-center gap-3 border-b border-[#e5e7eb] px-4 py-3">
        <Link to="/home" className="text-lg font-semibold text-[#0a3d24]">SIH&S Office</Link>
        <label className="min-w-[12rem] flex-1 text-sm">
          <span className="sr-only">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs, people, contracts"
            className="h-11 w-full rounded-full border border-[#e5e7eb] px-4"
          />
        </label>
        <label className="text-sm font-semibold">
          <span className="mr-2 text-[#6b7280]">Role</span>
          <select className="h-11 rounded-full border border-[#e5e7eb] px-3" value={role} onChange={(event) => setRole(event.target.value as OfficeRole)}>
            {ROLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <p className="text-sm text-[#6b7280]" aria-live="polite">3 notices</p>
        <DemoBadge />
      </header>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <nav className="flex gap-2 overflow-x-auto border-b border-[#e5e7eb] p-3 md:w-60 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r" aria-label="Office">
          {SECTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={`min-h-11 shrink-0 rounded-full px-3 text-left text-sm font-semibold md:w-full ${section === item ? "bg-[#0a3d24] text-white" : "text-[#111111]"}`}
              onClick={() => setSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          {query && <p className="mb-3 text-sm text-[#6b7280]">Showing sample matches for “{query}”.</p>}
          {safetyLocked ? <Locked /> : <Panel section={section} role={role} />}
        </main>
      </div>
    </div>
  );
}

function Locked() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Safety and HR is locked</h1>
      <p className="mt-2 max-w-2xl text-sm">Dispatch and Marketing cannot open accident, injury, workers’ compensation, or personnel reports. Switch the role to Safety/HR or Admin to preview that area.</p>
    </section>
  );
}

function Panel({ section, role }: { section: Section; role: OfficeRole }) {
  if (section === "Access") return <Access />;
  if (section === "Users and roles") return <Users />;
  if (section === "Service setup") return <Setup />;
  if (section === "Requests") return <Requests />;
  if (section === "Dispatch") return <Dispatch />;
  if (section === "Proof and issues") return <Proof />;
  if (section === "PIM-VEE") return <Pim />;
  if (section === "Workforce") return <Workforce role={role} />;
  if (section === "Contracts") return <Contracts />;
  if (section === "Time and billing") return <Billing />;
  return <Pipeline />;
}

function Card({ title, children }: { title: string; children: string }) {
  return (
    <article className="rounded-2xl border border-[#e5e7eb] p-4">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-[#374151]">{children}</p>
    </article>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="mt-4 grid gap-3 md:grid-cols-2">{children}</div>;
}

function Access() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Sign-in and access</h1>
      <Grid>
        <Card title="Invitation" children="Morgan Ellis accepted an invite for Billing/Office at Harbor Yard. First login still waits for admin approval." />
        <Card title="Recovery" children="Forgot password, emailed code 448291, then a new password. Remembered session on the office browser." />
        <Card title="Company account" children="Sign in with company account uses the existing business directory. Demo only." />
        <Card title="Second factor" children="Settings, finance, personnel, and evidence release ask for a second code before they open." />
        <Card title="Session limit" children="Two office sessions. The older one ended at 4:00 PM EST." />
        <Card title="Access removed" children="Your access has been removed by your administrator. Records are hidden." />
      </Grid>
    </section>
  );
}

function Users() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Users and roles</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[#6b7280]">
              <th className="py-2 pr-3">Person</th>
              <th className="py-2 pr-3">Group</th>
              <th className="py-2 pr-3">Organization</th>
              <th className="py-2">Site check</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Jordan Hale", "Customer", "Harbor Yard Co", "Verified"],
              ["Avery Quinn", "Facility manager", "Harbor Yard Co", "In queue"],
              ["Riley Chen", "Employee", "SIH&S", "Verified"],
              ["Sam Patel", "Subcontractor", "Northwind Lot Services", "Verified"],
              ["Morgan Ellis", "Dispatch", "SIH&S", "Verified"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-[#f3f4f6]">
                {row.map((cell) => (
                  <td key={cell} className="py-2 pr-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Grid>
        <Card title="Permission matrix" children="Role, organization, site, and job. Financial, personnel, health, and evidence records are separate switches." />
        <Card title="Verification queue" children="Avery Quinn’s site authority is waiting. Partners and management use the same queue." />
      </Grid>
    </section>
  );
}

function Setup() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Service configuration</h1>
      <p className="mt-2 text-sm text-[#374151]">Coverage, rates, questions, qualifications, and required proof are set per contract. There is no statewide-only limit.</p>
      <Grid>
        <Card title="Eligible services" children="Harbor Yard contract has towing, courier, and cleaning on. Lawn is off for this account." />
        <Card title="Towing rules" children="Light-duty consensual towing and authorized secondary tows only. Non-consensual impound is not offered." />
        <Card title="Lockout rule" children="Authorized U-Haul assignments only, after contract eligibility is verified. Public and private-pay lockouts are blocked, including generic request forms." />
      </Grid>
    </section>
  );
}

function Requests() {
  const [tab, setTab] = useState("Requests");
  return (
    <section>
      <h1 className="text-2xl font-semibold">Requests, bookings, assignments</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Requests", "Confirmed bookings", "Assignments"].map((item) => (
          <button key={item} type="button" className={`min-h-11 rounded-full px-3 text-sm font-semibold ${tab === item ? "bg-[#5cba40] text-white" : "border border-[#e5e7eb]"}`} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <Grid>
        <Card title="Request inbox" children="Jordan Hale · Harbor Yard pin · office appointment · photo attached. Vehicle color is unknown. Refer missing information uses the standard note." />
        <Card title="Duplicate warning" children="This phone number already has request RQ-220 today." />
        <Card title="Booking check" children="Availability open. Qualification current. Flatbed is available. Each recurring visit is its own record in Eastern time." />
        <Card title={tab} children="Reschedule, cancel, no access, unsafe conditions, equipment mismatch, and unsuccessful work each keep a reason and a customer/worker notice preview." />
      </Grid>
    </section>
  );
}

function Dispatch() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Dispatch board</h1>
      <p className="mt-2 text-sm">Updates every 60 sec — Demo only. One card is marked stale. Assigning Riley to a second overlapping job shows a double-booking warning.</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {["Assigned", "En Route", "Service completed", "Office review"].map((column) => (
          <article key={column} className="rounded-2xl border border-[#e5e7eb] p-3">
            <h2 className="text-sm font-semibold">{column}</h2>
            <p className="mt-2 text-sm">SIHS-S-44190 · Harbor Yard · ETA 12 min · updated 10:22 AM EST</p>
            {column === "Assigned" && <p className="mt-1 text-xs font-semibold text-[#9b2c2c]">Qualification warning</p>}
            {column === "En Route" && <p className="mt-1 text-xs font-semibold">Stale location</p>}
          </article>
        ))}
      </div>
      <Grid>
        <Card title="Milestones" children="Assigned, Acknowledged, En Route, Arrived, Work Started, Service Completed, Departed. Interrupted, Canceled, and Unsuccessful stay separate. Field completion does not close evidence review or billing." />
        <Card title="Audit" children="Riley Chen · iPhone Field-04 · manual · 10:41 AM EST · server received 10:41:08 AM EST · accuracy 18 m. Original value kept. Clock difference detected. Corrected — reason: gate delay." />
        <Card title="Reassignment" children="Morgan Ellis reassigned the job at 9:05 AM EST because the first truck was already on a tow." />
        <Card title="Routing" children="ETA uses the assigned unit’s actual location. A corrected pin is labeled. A stale pin is not used for the quote." />
        <Card title="Transport" children="Pickup, two intermediate stops, handoff, destination, and return leg. Each stop has its own arrival and departure. Passenger details are restricted." />
        <Card title="Tracking limits" children="Location runs only during an active assignment or on-duty period. Failures show a manual confirm option. The 100-foot prompt says Needs testing — accuracy not guaranteed. A location alert never confirms work, hours, or charges." />
      </Grid>
    </section>
  );
}

function Proof() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Proof review and closeout</h1>
      <Grid>
        <Card title="Proof queue" children="Before and after photos, checklists, measurements, and signatures. Capture 10:41 AM EST, upload 10:42 AM EST, accuracy 18 m. One imported file is labeled missing capture details." />
        <Card title="Courier custody" children="Package NW-220, scan, quantity 1, handoff to Riley Chen, seal intact, no temperature hold. Partial and refused outcomes are listed." />
        <Card title="Customer sign-off" children="Dispatch required it. Result: Completed with exceptions. Signer Jordan Hale, site lead, 11:05 AM EST. Separate from the worker completion." />
        <Card title="Issues" children="Missing signature, dispute, and unresolved job are Under office review. Rework and reinspection stay open. Prior photos are kept." />
        <Card title="Four statuses" children="Delivery proof: received. Customer satisfaction: exceptions. Formal contract acceptance: open. Financial closeout: not started." />
      </Grid>
    </section>
  );
}

function Pim() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">PIM-VEE incident file</h1>
      <p className="mt-2 text-sm">Incident INC-1044 links the tasks this role may open. Audio is off. Capture restrictions were acknowledged by Riley Chen.</p>
      <Grid>
        <Card title="Record" children="Observations, witness details, and camera references. Facts and opinions are separate fields. Photos, 5-second clips, and longer originals are listed." />
        <Card title="Before movement" children="Required evidence must be captured before property is moved when it is safe. Safety exception: Morgan Ellis, traffic hazard, wide photo missing." />
        <Card title="Integrity" children="Original preserved. Correction history is visible. Hash chain: passed. A second file is changed. Event time and receipt time differ by 8 seconds. Integrity checks do not prove an observation is true." />
        <Card title="Report status" children="Interim. Complete requires the documentation set and an integrity check pass." />
        <Card title="Controlled release" children="Version 2 to named recipient Quinn Audit. Authorization recorded. Re-check runs before delivery. A content change requires renewal." />
      </Grid>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[#6b7280]">
              <th className="py-2 pr-3">When</th>
              <th className="py-2 pr-3">Action</th>
              <th className="py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#f3f4f6]">
              <td className="py-2 pr-3">Nov 20, 11:40 AM EST</td>
              <td className="py-2 pr-3">Release version 2</td>
              <td className="py-2">Restricted lines and hidden file details removed. Original kept.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Workforce({ role }: { role: OfficeRole }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Workforce and safety</h1>
      <p className="mt-2 text-sm">Viewing as {role}.</p>
      <Grid>
        <Card title="Eligibility" children="Riley Chen · towing credential expires in 14 days. New assignments block when a mandatory qualification is missing, expired, or suspended. The active job shows Credential expired — office notified. A replacement crew gets the same checks." />
        <Card title="Private documents" children="Onboarding files are view-only for the owner and an admin. Other roles see the status, not the file." />
        <Card title="Subcontractor view preview" children="Northwind sees agreed rates, its workers, proof, time, expenses, and invoices. SIH&S margin is hidden." />
        <Card title="Logs and concerns" children="Daily logs and messages include an event with no job number. Alternate reviewer: Safety/HR lead." />
        <Card title="Restricted reports" children="Accident, injury, workers’ compensation, and personnel concern. Only authorized safety and HR reviewers can see them." />
      </Grid>
    </section>
  );
}

function Contracts() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Contracts, purchasing, property, audit</h1>
      <p className="mt-2 text-sm">Company Harbor Yard Co → Customer Jordan Hale → Contract NW-C-14 → Site Harbor Yard → PO-88421 → line Towing → visit SIHS-S-44190. One finished visit does not close the contract. Government fields are hidden on this retail job.</p>
      <Grid>
        <Card title="Obligations" children="Sample clause with owner, deadline, and evidence status. Registration and exclusion checks are dated. Payroll records stay restricted." />
        <Card title="Purchasing" children="Supplier quote expires Dec 1, 2026. Unit cost, origin when required, receipt, and one authorized substitution." />
        <Card title="Property" children="Item HY-9 · quantity 2 · custodian Riley Chen · condition good · loss none · disposal not authorized." />
        <Card title="Audit support" children="Searchable log of submissions, reviews, and changes. Missing evidence is flagged. Recordkeeping supports audits; it does not by itself establish FAR/DFARS compliance or a satisfactory DCAA review." />
      </Grid>
    </section>
  );
}

function Billing() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Time, expenses, and billing</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[#6b7280]">
              <th className="py-2 pr-3">Hours</th>
              <th className="py-2 pr-3">GPS events</th>
              <th className="py-2 pr-3">Provider charges</th>
              <th className="py-2">Customer quantities</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 pr-3">2.5</td>
              <td className="py-2 pr-3">4</td>
              <td className="py-2 pr-3">$85 agreed</td>
              <td className="py-2">1 tow</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Grid>
        <Card title="Review" children="Supervisor returned one line. Corrected by supervisor — reason: overlap. Receipt OCR $42.18 was corrected by a person. Timecard rounds to 6 minutes." />
        <Card title="Billing draft" children="Draft from reviewed work on the existing form. Job and payer references, quantities, rates, and extras are listed. Duplicate invoice blocked. Progress billing still allowed. Draft is not a submission." />
        <Card title="Quotes and payments" children="Payer Harbor Yard Co. Quote version 3. Deposit and balance are separate from booking and dispatch. Square route shows no card number. Office confirmed the receipt. A failed payment and a credit are both listed, with reviewer and time." />
        <Card title="Financial view" children="Contract maximum, available funding, earned revenue, billed amount, and cash received stay in separate figures. Direct and indirect, billable and nonbillable, allowable and unallowable are labeled. Costs stay recorded during a billing hold." />
        <Card title="External summary" children="Source: sample export. Verified 10:15 AM EST. Status: manual. A stale copy is marked." />
        <Card title="Handoff" children="Submitted version, receipt, and rejection are kept. External task: motor-club proof, owner Dispatch. Only permitted fields are exchanged." />
      </Grid>
    </section>
  );
}

function Pipeline() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Pipeline and opportunities</h1>
      <Grid>
        <Card title="Customer pipeline" children="Contact Jordan Hale · source referral · follow-up Friday · quote version 3 · opportunity open · win/loss blank · profitability sample only." />
        <Card title="Convert award" children="Convert award to contract prefills Harbor Yard Co, the site, and the awarded lines. It does not create a second customer." />
        <Card title="Opportunity search" children="Watching sample federal, state and local, education, authority, transit, airport, and teaming sources. Demo only." />
        <Card title="Amendments" children="Notice AM-12 reopened yesterday. The prior due date is kept next to the new one." />
      </Grid>
    </section>
  );
}
