"use client";

import { BaseSettingsPopover } from "@/components/BaseSettingsPopover";
import { DataTypeRangeStatus } from "@/components/DataTypeRangeStatus";
import { NumberConverterInput } from "@/components/NumberConverterInput";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBasePreferences } from "@/hooks/useBasePreferences";
import { AVAILABLE_BASES, type BaseId } from "@/lib/baseConfig";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const { preferences, updatePreferences } = useBasePreferences();
  const [num, setNum] = useState<string>("");
  const [displayedBases, setDisplayedBases] = useState<BaseId[]>([]);
  const [availableBases, setAvailableBases] = useState<Set<BaseId>>(new Set());
  const [localCustomBase, setLocalCustomBase] = useState<string>(
    preferences.customBase.toString()
  );
  const [customBaseError, setCustomBaseError] = useState("");
  const prevBasesRef = useRef<BaseId[]>([]);
  const customBaseErrorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedBases = preferences.selectedBases;
  const customBase = preferences.customBase;

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (customBaseErrorTimeoutRef.current) {
        clearTimeout(customBaseErrorTimeoutRef.current);
      }
    };
  }, []);

  // Handle smooth additions and removals
  useEffect(() => {
    const prev = prevBasesRef.current;
    const current = selectedBases;

    // Find bases being removed
    const removed = prev.filter((id) => !current.includes(id));

    if (removed.length > 0) {
      // Mark bases as available
      setAvailableBases(new Set(removed));

      // Remove from displayed list after animation
      setTimeout(() => {
        setDisplayedBases(current);
        setAvailableBases(new Set());
      }, 300); // Match animation duration
    } else {
      // Just adding bases, update immediately
      setDisplayedBases(current);
    }

    prevBasesRef.current = current;
  }, [selectedBases]);

  const handleBaseSelectionChange = useCallback(
    (bases: BaseId[]) => {
      updatePreferences({ selectedBases: bases });
    },
    [updatePreferences]
  );

  const handleCustomBaseChange = useCallback(
    (value: number) => {
      updatePreferences({ customBase: value });
    },
    [updatePreferences]
  );

  const isValidCustomBase = (base: string) =>
    !isNaN(Number(base)) && Number(base) >= 2 && Number(base) <= 64;

  const customBaseInput = (
    <div className="w-min flex flex-col gap-1.5">
      <Label className="text-nowrap" htmlFor="custom-base-input">
        Custom
      </Label>
      <Input
        type="text"
        inputMode="numeric"
        id="custom-base-input"
        value={localCustomBase}
        onChange={(e) => {
          const value = e.target.value;
          setLocalCustomBase(value);

          const isValid = isValidCustomBase(value);

          if (!isValid) {
            // Clear any existing timeout
            if (customBaseErrorTimeoutRef.current) {
              clearTimeout(customBaseErrorTimeoutRef.current);
            }

            // Set error message
            setCustomBaseError("2-64");

            // Clear error after 4 seconds
            customBaseErrorTimeoutRef.current = setTimeout(() => {
              setCustomBaseError("");
            }, 4000);
          } else {
            // Clear error if input becomes valid
            if (customBaseErrorTimeoutRef.current) {
              clearTimeout(customBaseErrorTimeoutRef.current);
            }
            setCustomBaseError("");
          }

          if (isValid) {
            handleCustomBaseChange(Number(value));
          } else {
            handleCustomBaseChange(5);
          }
        }}
        aria-invalid={!isValidCustomBase(localCustomBase)}
      />
      {customBaseError && (
        <span className="text-xs text-destructive break-all animate-in fade-in slide-in-from-top-1 duration-200">
          {customBaseError}
        </span>
      )}
    </div>
  );

  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mt-12">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>Real-time base conversion</CardDescription>
          <CardAction>
            <div className="flex gap-2">
              <DataTypeRangeStatus
                baseTenValue={num}
                endianness={preferences.endianness}
              />
              <BaseSettingsPopover
                selectedBases={selectedBases}
                onSelectionChange={handleBaseSelectionChange}
                endianness={preferences.endianness}
                onEndiannessChange={(endianness) =>
                  updatePreferences({ endianness })
                }
              />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent
          className={`flex flex-col gap-4 ${styles.cardContentAnimated}`}
        >
          {AVAILABLE_BASES.map((baseConfig) => {
            // Only render if this base is in displayedBases
            if (!displayedBases.includes(baseConfig.id)) return null;

            const isAvailable = availableBases.has(baseConfig.id);
            const containerClass = isAvailable
              ? styles.fieldContainerAvailable
              : styles.fieldContainer;

            if (baseConfig.id === "custom") {
              return (
                <div
                  key="custom"
                  className={`${containerClass} flex items-start gap-2`}
                >
                  {customBaseInput}
                  <NumberConverterInput
                    label="Base"
                    base={customBase}
                    baseTenValue={num}
                    setBaseTenValue={setNum}
                  />
                </div>
              );
            }

            return (
              <div key={baseConfig.id} className={containerClass}>
                <NumberConverterInput
                  label={baseConfig.label}
                  base={baseConfig.base!}
                  baseTenValue={num}
                  setBaseTenValue={setNum}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
      <div className="flex gap-6 mt-2 text-center text-sm text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Logan Stapleton</div>
        <div>
          <a
            href="https://github.com/stapletl/number-converter-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
