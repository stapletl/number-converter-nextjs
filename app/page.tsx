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
  const prevBasesRef = useRef<BaseId[]>([]);

  const selectedBases = preferences.selectedBases;
  const customBase = preferences.customBase;

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

  return (
    <div className="relative w-full h-dvh overflow-auto flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mt-12">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>Real-time base conversion</CardDescription>
          <CardAction>
            <div className="flex gap-2">
              <DataTypeRangeStatus baseTenValue={num} />
              <BaseSettingsPopover
                selectedBases={selectedBases}
                onSelectionChange={handleBaseSelectionChange}
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
                  className={`${containerClass} flex items-center gap-4`}
                >
                  <NumberConverterInput
                    label="Custom"
                    base={customBase}
                    baseTenValue={num}
                    setBaseTenValue={setNum}
                  />
                  <div className="w-min flex flex-col gap-1.5">
                    <Label className="text-nowrap" htmlFor="custom-base-input">
                      Custom Base
                    </Label>
                    <Input
                      type="number"
                      id="custom-base-input"
                      value={customBase}
                      min={2}
                      max={64}
                      onChange={(e) => {
                        const value = Math.min(
                          64,
                          Math.max(2, Number(e.target.value))
                        );
                        handleCustomBaseChange(value);
                      }}
                    />
                  </div>
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
    </div>
  );
};

export default Home;
