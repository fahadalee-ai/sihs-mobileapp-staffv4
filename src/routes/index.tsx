import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { CallHook } from "@/components/Chrome";
import { markSplashSeen } from "@/lib/intro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIH&S" },
      {
        name: "description",
        content:
          "SIH&S — structured incident response, light-duty towing, collections, DNA services, PIM-VEE™, and notary.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const router = useRouter();

  const openOnboarding = () => {
    markSplashSeen();
    void router.navigate({ to: "/onboarding", replace: true });
  };

  useEffect(() => {
    const t = window.setTimeout(openOnboarding, 2800);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <div className="theme-dark fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0a3d24] text-white">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <BrandLogo size="lg" animate />
        <p className="mt-2 text-center font-serif text-lg italic text-[#f4f7f5]">Standing in the Gap</p>
        <button
          type="button"
          onClick={openOnboarding}
          className="mt-8 min-h-12 rounded-full bg-[#5cba40] px-8 text-[17px] font-semibold text-white"
        >
          Continue
        </button>
        <div className="mt-4">
          <CallHook dark />
        </div>
      </div>
    </div>
  );
}
