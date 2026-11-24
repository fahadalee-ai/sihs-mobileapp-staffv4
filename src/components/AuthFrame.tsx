import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";

export const authInputClass =
  "h-12 w-full rounded-2xl border border-white/15 bg-[#073222] px-4 text-[16px] text-white outline-none placeholder:text-[#9fb5ab] focus:border-[#5cba40] focus:ring-2 focus:ring-[#5cba40]/35";

export function AuthFrame({
  title,
  subtitle,
  children,
  backTo,
  showLogo = true,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backTo?: "/login" | "/";
  showLogo?: boolean;
}) {
  return (
    <div className="theme-dark fixed inset-0 z-50 overflow-y-auto bg-[#0a3d24] text-white">
      <div className="mx-auto flex min-h-full w-full max-w-[440px] flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
        {backTo ? (
          <Link
            to={backTo}
            className="inline-flex h-11 items-center gap-1 self-start text-[15px] font-medium text-[#d7e7df]"
          >
            <ChevronLeft size={22} aria-hidden />
            Back
          </Link>
        ) : (
          <div className="h-11" />
        )}
        {showLogo && <BrandLogo size="sm" />}
        <h1 className="mt-6 text-[1.75rem] font-semibold leading-tight tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-[#c9d9d1]">{subtitle}</p>}
        <div className="mt-6 flex-1">{children}</div>
      </div>
    </div>
  );
}
