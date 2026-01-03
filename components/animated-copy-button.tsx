"use client";

import { useState, useCallback, useRef } from "react";
import { Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedCopyButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string;
}

export const AnimatedCopyButton = ({
  className,
  value,
  ...props
}: AnimatedCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset to copy icon after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [value]);

  return (
    <Button
      variant="outline"
      size="icon"
      title={isCopied ? "Copied!" : "Copy to clipboard"}
      onClick={handleCopy}
      className={cn(className, "bg-card")}
      {...props}
    >
      <Copy
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          isCopied ? "scale-0 rotate-90" : "scale-100 rotate-0"
        )}
      />
      <Check
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          isCopied ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        )}
      />
      <span className="sr-only">{isCopied ? "Copied!" : "Copy to clipboard"}</span>
    </Button>
  );
};
