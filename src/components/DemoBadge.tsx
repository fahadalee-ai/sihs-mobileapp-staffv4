export function DemoBadge({ label = "Sample data — demo only" }: { label?: string }) {
  return (
    <p className="inline-flex rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#374151]">
      {label}
    </p>
  );
}
