import logo from "@/img/logo.png";

export function BrandLogo({
  size = "md",
  className = "",
  animate = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}) {
  const width = size === "sm" ? 120 : size === "lg" ? 280 : 200;
  const image = (
    <img
      src={logo}
      alt="SIH&S logo. Susan's Intercessory Hooks and Services. Standing in the Gap."
      width={width}
      height={width}
      className={`mx-auto h-auto w-full object-contain ${className}`}
      style={{ maxWidth: width }}
    />
  );

  if (!animate) return image;

  return (
    <div className="sihs-logo-stage relative mx-auto" style={{ maxWidth: width }}>
      <span className="sihs-logo-ring" aria-hidden />
      <span className="sihs-logo-ring sihs-logo-ring-late" aria-hidden />
      <div className="sihs-logo-motion">{image}</div>
    </div>
  );
}
