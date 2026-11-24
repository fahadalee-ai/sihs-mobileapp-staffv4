import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthFrame } from "@/components/AuthFrame";

export const Route = createFileRoute("/timeout")({
  head: () => ({ meta: [{ title: "SIH&S — Session ended" }] }),
  component: Timeout,
});

function Timeout() {
  return (
    <AuthFrame
      title="Your session ended"
      subtitle="SIH&S signed this device out after 15 minutes without use. Unsent notes stay in the offline queue."
      showLogo
    >
      <Link
        to="/login"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#5cba40] font-semibold text-white"
      >
        Sign in again
      </Link>
    </AuthFrame>
  );
}
