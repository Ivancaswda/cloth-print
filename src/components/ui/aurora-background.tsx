"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
                                   className,
                                   children,
                                   showRadialGradient = true,
                                   ...props
                                 }: AuroraBackgroundProps) => {
  return (
      <main>
        <div
            className={cn(
                "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
                className,
            )}
            {...props}
        >
            <div
                className="absolute inset-0 overflow-hidden"
                style={
                    {
                        "--aurora":
                            "repeating-linear-gradient(100deg, #81dd1f 10%, #a7e252 15%, #97d934 20%, #c2f163 25%, #7ccc11 30%)",
                        "--dark-gradient":
                            "repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)",
                        "--white-gradient":
                            "repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",

                        "--green-300": "#97d934",
                        "--green-400": "#7ccc11",
                        "--green-500": "#81dd1f",
                        "--lime-300": "#a7e252",
                        "--lime-200": "#c2f163",
                        "--black": "#000",
                        "--white": "#fff",
                        "--transparent": "transparent",
                    } as React.CSSProperties
                }
            >
                <div
                    className={cn(
                        `after:animate-aurora pointer-events-none absolute -inset-[20px] 
    [background-image:var(--white-gradient),var(--aurora)] 
    [background-size:400%,_300%] 
    [background-position:50%_50%,50%_50%] 
    opacity-80 blur-[20px] filter will-change-transform
    [--aurora:repeating-linear-gradient(100deg,var(--green-500)_15%,var(--lime-300)_20%,var(--green-300)_30%,var(--lime-200)_40%,var(--green-400)_50%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
    [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
    after:absolute after:inset-0 
    after:[background-image:var(--white-gradient),var(--aurora)] 
    after:[background-size:300%,_150%] 
    after:[background-attachment:fixed] 
    after:mix-blend-difference 
    after:content-[""] 
    dark:[background-image:var(--dark-gradient),var(--aurora)] 
    dark:invert-0 
    after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
                    )}
                ></div>
            </div>
            {children}
        </div>
      </main>
  );
};
