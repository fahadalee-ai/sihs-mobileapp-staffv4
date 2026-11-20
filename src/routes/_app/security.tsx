import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge } from "@/components/DemoBadge";
import { Button } from "@/components/kit";

export const Route = createFileRoute("/_app/security")({
  head: () => ({ meta: [{ title: "SIH&S — Devices and sessions" }] }),
  component: SecuritySettings,
});

const DEVICES = [
  ["iPhone labeled Field-04", "This device · Active · EST"],
  ["Android tablet Yard-2", "Last used Wed, Nov 18, 2026, 4:10 PM EST"],
];

function SecuritySettings() {
  const [signedOut, setSignedOut] = useState(false);
  const [lost, setLost] = useState(false);
  return (
    <div>
      <ScreenHeader title="Devices and sessions" backTo="/profile" backLabel="Profile" />
      <div className="space-y-4 px-4 pb-8 text-sm">
        <DemoBadge />
        <p>Remembered sessions stay on devices you trust. Biometrics on this phone are a preview only.</p>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Devices</h2>
          <ul className="mt-2 space-y-2">
            {DEVICES.map(([name, detail]) => (
              <li key={name}>
                <p className="font-semibold">{name}</p>
                <p className="text-[#6b7280]">{detail}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Active sessions</h2>
          <p className="mt-1">Web office preview · started today 8:02 AM EST</p>
          <p className="text-[#6b7280]">Staff app · this phone · started today 7:40 AM EST</p>
        </section>
        <Button type="button" full onClick={() => setSignedOut(true)}>
          Sign out all other sessions
        </Button>
        {signedOut && <p role="status">Other sessions are signed out in this preview. This phone stays signed in.</p>}
        <Button type="button" variant="outline" full onClick={() => setLost(true)}>
          Report a lost device
        </Button>
        {lost && (
          <p className="rounded-md bg-[#f3f4f6] p-3" role="status">
            Lost-device block recorded. Temp copies on Field-04 are marked for deletion. Offline copies expire after 72 hours and are not backed up to a personal gallery or cloud drive. Capture stays inside the app.
          </p>
        )}
        <p className="text-xs text-[#6b7280]">Uploaded and Archived are different. A file can be uploaded and still waiting to be archived.</p>
        <section className="rounded-md bg-white p-3 shadow-sm ring-1 ring-[#ececec]">
          <h2 className="font-semibold">Accepted versions</h2>
          <ul className="mt-2 space-y-1 text-[#374151]">
            <li>Terms · version 4 · accepted Nov 2, 2026</li>
            <li>Privacy · version 3 · accepted Nov 2, 2026</li>
            <li>SMS notice · version 2 · not accepted · optional</li>
          </ul>
        </section>
        <div className="flex flex-col gap-2">
          <Link to="/password" className="font-semibold text-[#2f7a1c]">Change password</Link>
          <Link to="/mfa" className="font-semibold text-[#2f7a1c]">Second-factor code</Link>
          <Link to="/timeout" className="font-semibold text-[#2f7a1c]">Preview session timeout</Link>
        </div>
      </div>
    </div>
  );
}
