import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import convertBase from "./convertBase";
import getValidInput from "./getValidInput";
import { AnimatedCopyButton } from "../animated-copy-button";

const BASE_TEN_PLACEHOLDER = "123";
const ERROR_MESSAGE_DURATION_MS = 4000;

type NumberConverterInputProps = {
  label: string;
  base: number;
  baseTenValue: string;
  setBaseTenValue: (value: string) => void;
};

export const NumberConverterInput = ({
  label,
  base,
  baseTenValue,
  setBaseTenValue,
}: NumberConverterInputProps) => {
  const isMobile = useIsMobile();
  const [error, setError] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const { validInput, hasInvalidChars, validChars } = getValidInput(
      base,
      input
    );

    if (hasInvalidChars) {
      if (isMobile) {
        // Clear any existing timeouts
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
        }

        // Set error message and reset exiting state
        setError(`Valid characters: ${validChars}`);
        setIsExiting(false);

        // Start exit animation after 2 seconds
        errorTimeoutRef.current = setTimeout(() => {
          setIsExiting(true);

          // Clear error after animation completes (200ms duration)
          exitTimeoutRef.current = setTimeout(() => {
            setError("");
            setIsExiting(false);
          }, 200);
        }, ERROR_MESSAGE_DURATION_MS);
      } else {
        toast.warning("Invalid characters detected", {
          description: `Valid characters for base ${base}: ${validChars}`,
          id: `invalid-input-base-${base}`,
          classNames: {
            title: "font-bold text-lg",
          },
        });
      }
    }

    setBaseTenValue(convertBase(validInput, base, 10));
  };

  return (
    <div className="grow flex flex-col gap-1.5">
      <Label htmlFor={`base-${label}-input`}>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          id={`base-${label}-input`}
          inputMode={base <= 10 ? "numeric" : "text"}
          placeholder={convertBase(BASE_TEN_PLACEHOLDER, 10, base)}
          value={convertBase(baseTenValue, 10, base)}
          onChange={(e) => handleFieldUpdate(e)}
        />
        <AnimatedCopyButton value={convertBase(baseTenValue, 10, base)} />
      </div>

      {isMobile && error && (
        <span
          className={`text-xs text-destructive break-all ${
            isExiting
              ? "animate-out fade-out slide-out-to-top-1 duration-200"
              : "animate-in fade-in slide-in-from-top-1 duration-200"
          }`}
        >
          {error}
        </span>
      )}
    </div>
  );
};
