export type BaseId =
  | "decimal"
  | "binary"
  | "hexadecimal"
  | "octal"
  | "base32"
  | "base64"
  | "custom";

export type BaseLabel =
  | "Decimal"
  | "Binary"
  | "Hexadecimal"
  | "Octal"
  | "Base 32"
  | "Base 64"
  | "Custom Base";

export type BaseConfig = {
  id: BaseId;
  label: BaseLabel;
  base: number | null; // null for custom
  defaultSelected: boolean;
};

export const AVAILABLE_BASES: readonly BaseConfig[] = [
  { id: "decimal", label: "Decimal", base: 10, defaultSelected: true },
  { id: "binary", label: "Binary", base: 2, defaultSelected: true },
  { id: "hexadecimal", label: "Hexadecimal", base: 16, defaultSelected: true },
  { id: "octal", label: "Octal", base: 8, defaultSelected: true },
  { id: "base32", label: "Base 32", base: 32, defaultSelected: false },
  { id: "base64", label: "Base 64", base: 64, defaultSelected: false },
  { id: "custom", label: "Custom Base", base: null, defaultSelected: false },
] as const;

export const DEFAULT_SELECTED_BASES = AVAILABLE_BASES.filter(
  (base) => base.defaultSelected
).map((base) => base.id);

export const LOCALSTORAGE_KEY = "number-converter-preferences";
