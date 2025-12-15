import { useState, useCallback, useEffect } from "react";
import {
  AVAILABLE_BASES,
  DEFAULT_SELECTED_BASES,
  LOCALSTORAGE_KEY,
  type BaseId,
} from "@/lib/baseConfig";

export type BasePreferences = {
  selectedBases: BaseId[];
  customBase: number;
};

const getDefaults = (): BasePreferences => ({
  selectedBases: DEFAULT_SELECTED_BASES,
  customBase: 5,
});

const loadPreferences = (): BasePreferences => {
  if (typeof window === "undefined") {
    return getDefaults();
  }

  try {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!stored) return getDefaults();

    const parsed = JSON.parse(stored);

    // Validate structure
    if (!Array.isArray(parsed.selectedBases)) return getDefaults();
    if (typeof parsed.customBase !== "number") return getDefaults();

    // Validate base IDs
    const validIds: BaseId[] = AVAILABLE_BASES.map((b) => b.id);
    const validatedBases = parsed.selectedBases.filter((id: string): id is BaseId =>
      validIds.includes(id as BaseId)
    );

    // Ensure at least one base
    if (validatedBases.length === 0) return getDefaults();

    return {
      selectedBases: validatedBases,
      customBase: Math.min(64, Math.max(2, parsed.customBase)),
    };
  } catch {
    return getDefaults();
  }
};

const savePreferences = (preferences: BasePreferences): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error("Failed to save preferences:", error);
  }
};

export const useBasePreferences = () => {
  const [preferences, setPreferences] = useState<BasePreferences>(getDefaults);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferences(loadPreferences());
    setIsLoaded(true);
  }, []);

  const updatePreferences = useCallback(
    (newPrefs: Partial<BasePreferences>) => {
      setPreferences((current) => {
        const updated = { ...current, ...newPrefs };
        savePreferences(updated);
        return updated;
      });
    },
    []
  );

  return { preferences, updatePreferences, isLoaded };
};
