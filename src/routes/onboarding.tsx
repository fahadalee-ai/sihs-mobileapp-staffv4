import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import bgTow from "@/img/bg-onboard-tow.jpg";
import bgLab from "@/img/bg-onboard-lab.jpg";
import photoDocs from "@/img/photo-docs.jpg";
import { CallHook } from "@/components/Chrome";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "SIH&S — Staff" }] }),
  component: Onboarding,
});

const STEPS = [
  {
    photo: bgTow,
    focus: "center 42%",
    artLabel: "Green tow truck ready for an SIH&S staff assignment",
    kicker: "Staff home",
    title: "Start with the assignment in front of you",
    services: ["Today's job", "Your approved role", "Next action"],
  },
  {
    photo: bgLab,
    focus: "center 35%",
    artLabel: "Collection bench with vials and a clipboard for staff documentation",
    kicker: "On the job",
    title: "Record the work. Dispatch decides.",
    body: "Travel, arrival, photos, and completion stay on the record with their source. You submit the work. You do not approve it.",
  },
  {
    photo: photoDocs,
    focus: "center 40%",
    artLabel: "Clipboard and pen on a vehicle hood for a staff field record",
    kicker: "Access",
    title: "SIH&S approves your roles",
    body: "Ask for the work you are qualified to do. Jobs and records stay closed until an SIH&S admin approves your account.",
    badge: "Pending until approved",
  },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { markOnboarded } = useApp();
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  const finish = () => {
    markOnboarded();
    navigate({ to: "/login" });
  };

  return (
    <div className="theme-dark fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0a3d24] text-white">
      <img
        key={current.photo}
        src={current.photo}
        alt={current.artLabel}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: current.focus }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

      <header className="relative z-10 flex items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[15px] font-semibold tracking-[0.16em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">SIH&S</p>
        <button type="button" onClick={finish} className="min-h-11 px-1 text-[17px] font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
          Skip
        </button>
      </header>

      <div className="relative z-10 mt-auto flex flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10">
        <div className="rounded-[24px] bg-[#04150f]/80 px-4 py-5 text-center shadow-lg backdrop-blur-md">
          {current.badge && (
            <p className="mb-3 inline-flex rounded-full bg-[#5cba40] px-3 py-1 text-[13px] font-bold text-white">
              {current.badge}
            </p>
          )}
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#d6f25a]">{current.kicker}</p>
          <h1 className="mx-auto mt-2 max-w-[22rem] text-[30px] font-bold leading-[1.15] tracking-tight text-white">
            {current.title}
          </h1>
          {current.services ? (
            <ul className="mx-auto mt-4 flex w-full max-w-[22rem] flex-wrap items-center justify-center gap-2">
              {current.services.map((item) => (
                <li key={item} className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[13px] text-white">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-auto mt-3 max-w-[22rem] text-[17px] leading-snug text-white">{current.body}</p>
          )}
        </div>

        <div className="mx-auto mt-5 flex items-center justify-center gap-1.5" aria-label="Onboarding progress">
          {STEPS.map((_, i) => (
            <span key={i} className="flex w-7 items-center justify-center">
              <span className={`h-2 rounded-full ${i === step ? "w-7 bg-[#5cba40]" : "w-2 bg-white/70"}`} />
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => (last ? finish() : setStep((s) => s + 1))}
          className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#5cba40] text-[17px] font-semibold text-white active:brightness-95"
        >
          {last ? "Get Started" : "Next"}
        </button>
        <div className="mt-2 flex justify-center">
          <CallHook dark />
        </div>
      </div>
    </div>
  );
}
