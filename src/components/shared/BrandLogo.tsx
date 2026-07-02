import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: { box: "h-8 w-8", px: 32 },
  sm: { box: "h-9 w-9", px: 36 },
  md: { box: "h-10 w-10", px: 40 },
  sidebar: { box: "h-[52px] w-[52px]", px: 52 },
  lg: { box: "h-14 w-14", px: 56 },
  xl: { box: "h-16 w-16", px: 64 },
  hero: { box: "h-[185px] w-[185px]", px: 185 },
} as const;

interface BrandLogoProps {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ size = "md", className, priority = false }: BrandLogoProps) {
  const { box, px } = sizeMap[size];

  return (
    <div className={cn("relative shrink-0", box, className)}>
      <Image
        src="/brand/khazina-logo.png"
        alt="خزينة"
        width={px}
        height={px}
        className="h-full w-full object-contain"
        priority={priority}
      />
    </div>
  );
}
