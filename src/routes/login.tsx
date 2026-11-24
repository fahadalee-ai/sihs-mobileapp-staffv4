import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, ChevronRight, Eye, EyeOff, Fingerprint } from "lucide-react";
import { useState } from "react";
import { AuthFrame, authInputClass } from "@/components/AuthFrame";
import { CallHook } from "@/components/Chrome";
import { Button } from "@/components/kit";
import { DEMO_USERS, type StaffUser } from "@/lib/staff-data";
import { useStaff } from "@/lib/staff-store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "SIH&S — Staff Sign In" }] }),
  component: Login,
});

function destination(person: StaffUser) {
  if (person.status === "pending") return "/pending" as const;
  if (person.status === "more-info") return "/more-info" as const;
  if (person.status === "rejected") return "/rejected" as const;
  if (person.status === "suspended") return "/revoked" as const;
  if (!person.setupDone) return "/setup" as const;
  return "/home" as const;
}

const SAMPLES: [string, string, string][] = [
  ["st-dana", "Approved tow operator", "Open the staff home"],
  ["st-first", "Approved, first login", "See the welcome setup"],
  ["st-pending", "Pending approval", "Application still with SIH&S"],
  ["st-info", "More information needed", "Items to update"],
  ["st-no", "Rejected", "Application was not approved"],
  ["st-end", "Access ended", "No records are shown"],
];

function Login() {
  const { login, preview } = useStaff();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  const open = (person: StaffUser) => {
    preview(person.id);
    navigate({ to: destination(person) });
  };

  const enterDemo = (id: string) => {
    const person = DEMO_USERS.find((item) => item.id === id);
    if (person) open(person);
  };

  return (
    <AuthFrame title="Welcome back" subtitle="Sign in to continue with your SIH&S staff account.">
      <form
        className="space-y-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          login(email, password);
          const person = DEMO_USERS.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
          navigate({ to: person ? destination(person) : "/home" });
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <input
            type="email"
            autoComplete="username"
            inputMode="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className={authInputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between gap-3">
            <span className="text-sm font-medium">Password</span>
            <Link to="/forgot" className="text-sm font-semibold text-[#b6e38a]">
              Forgot password?
            </Link>
          </span>
          <span className="relative block">
            <input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className={`${authInputClass} pr-12`}
            />
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[#c9d9d1]"
              onClick={() => setShow((value) => !value)}
            >
              {show ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
            </button>
          </span>
        </label>

        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-5 w-5 accent-[#5cba40]"
          />
          Remember this device
        </label>

        <Button type="submit" full>
          Sign in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-[#9fb5ab]">
        <span className="h-px flex-1 bg-white/15" />
        or
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => enterDemo("st-dana")}
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#073222] px-2 text-sm font-semibold"
        >
          <Building2 size={18} aria-hidden />
          Company
        </button>
        <button
          type="button"
          onClick={() => enterDemo("st-dana")}
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#073222] px-2 text-sm font-semibold"
        >
          <Fingerprint size={18} aria-hidden />
          Biometrics
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-[#9fb5ab]">Biometrics are a preview on this device. Demo only.</p>

      <p className="mt-6 text-center text-sm text-[#c9d9d1]">
        New to SIH&S?{" "}
        <Link to="/apply" className="font-semibold text-[#b6e38a]">
          Apply for access
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-[#c9d9d1]">
        Have an invitation?{" "}
        <Link to="/invite" className="font-semibold text-[#b6e38a]">
          Accept it
        </Link>
      </p>

      <details className="mt-8 rounded-2xl border border-white/10 bg-[#073222]/80">
        <summary className="min-h-12 cursor-pointer list-none px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between">
            Preview a sample account
            <ChevronRight size={16} aria-hidden />
          </span>
          <span className="mt-0.5 block text-xs font-normal text-[#9fb5ab]">Design samples only. Not a live sign-in.</span>
        </summary>
        <ul className="border-t border-white/10">
          {SAMPLES.map(([id, label, detail]) => (
            <li key={id} className="border-b border-white/10 last:border-b-0">
              <button type="button" className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-2 text-left" onClick={() => enterDemo(id)}>
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-[#9fb5ab]">{detail}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-[#b6e38a]" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-8 flex flex-col items-center gap-2">
        <Link to="/office" className="text-sm font-medium text-[#c9d9d1] underline-offset-2 hover:underline">
          Open the office dashboard
        </Link>
        <CallHook dark />
      </div>
    </AuthFrame>
  );
}
