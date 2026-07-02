export default function TopographicPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Topographic contour lines — centered around (~900, 640) */}
      <path stroke="rgba(255,255,255,0.055)" strokeWidth="1.5"
        d="M 900 530 C 1010 520 1100 560 1110 620 C 1120 680 1040 730 900 740 C 760 750 660 700 650 640 C 640 580 730 530 900 530 Z" />
      <path stroke="rgba(255,255,255,0.055)" strokeWidth="1.5"
        d="M 900 430 C 1090 415 1250 490 1265 600 C 1280 710 1130 790 900 800 C 670 810 510 725 495 615 C 480 505 610 440 900 430 Z" />
      <path stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"
        d="M 900 310 C 1175 290 1400 400 1420 570 C 1440 740 1250 860 900 875 C 550 890 340 760 320 590 C 300 420 475 325 900 310 Z" />
      <path stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"
        d="M 895 180 C 1265 155 1555 300 1580 520 C 1605 740 1370 895 895 915 C 420 935 155 775 130 555 C 105 335 380 200 895 180 Z" />
      <path stroke="rgba(255,255,255,0.045)" strokeWidth="1.5"
        d="M 880 30 C 1360 0 1710 185 1745 465 C 1780 745 1490 940 880 965 C 270 990 -60 790 -95 510 C -130 230 260 55 880 30 Z" />
      <path stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"
        d="M 860 -140 C 1460 -175 1880 60 1920 405 C 1960 750 1610 985 860 1015 C 110 1045 -305 800 -345 455 C -385 110 130 -110 860 -140 Z" />
      <path stroke="rgba(255,255,255,0.035)" strokeWidth="1.5"
        d="M 830 -330 C 1580 -370 2080 -80 2125 330 C 2170 740 1740 1040 830 1075 C -80 1110 -555 815 -600 405 C -645 -5 -10 -295 830 -330 Z" />
    </svg>
  );
}
