export default function TopographicPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: "url(/topographic-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.12,
      }}
      aria-hidden="true"
    />
  );
}
