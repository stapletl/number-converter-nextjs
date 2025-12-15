export type DataTypeId =
  | "int8"
  | "int16"
  | "int32"
  | "int64"
  | "uint8"
  | "uint16"
  | "uint32"
  | "uint64";

export type DataTypeLabel =
  | "Int 8"
  | "Int 16"
  | "Int 32"
  | "Int 64"
  | "UInt 8"
  | "UInt 16"
  | "UInt 32"
  | "UInt 64";

export type DataTypeRange = {
  min: bigint;
  max: bigint;
};

export type DataTypeConfig = {
  id: DataTypeId;
  label: DataTypeLabel;
  range: DataTypeRange;
  defaultSelected: boolean;
};

export const AVAILABLE_DATA_TYPES: readonly DataTypeConfig[] = [
  {
    id: "int8",
    label: "Int 8",
    range: { min: BigInt(-128), max: BigInt(127) },
    defaultSelected: false,
  },
  {
    id: "int16",
    label: "Int 16",
    range: { min: BigInt(-32768), max: BigInt(32767) },
    defaultSelected: false,
  },
  {
    id: "int32",
    label: "Int 32",
    range: { min: BigInt(-2147483648), max: BigInt(2147483647) },
    defaultSelected: false,
  },
  {
    id: "int64",
    label: "Int 64",
    range: { min: -(BigInt(2) ** BigInt(63)), max: BigInt(2) ** BigInt(63) - BigInt(1) },
    defaultSelected: false,
  },
  {
    id: "uint8",
    label: "UInt 8",
    range: { min: BigInt(0), max: BigInt(255) },
    defaultSelected: false,
  },
  {
    id: "uint16",
    label: "UInt 16",
    range: { min: BigInt(0), max: BigInt(65535) },
    defaultSelected: false,
  },
  {
    id: "uint32",
    label: "UInt 32",
    range: { min: BigInt(0), max: BigInt(4294967295) },
    defaultSelected: false,
  },
  {
    id: "uint64",
    label: "UInt 64",
    range: { min: BigInt(0), max: BigInt(2) ** BigInt(64) - BigInt(1) },
    defaultSelected: false,
  },
] as const;

export const DEFAULT_SELECTED_DATA_TYPES = AVAILABLE_DATA_TYPES.filter(
  (dt) => dt.defaultSelected
).map((dt) => dt.id);

/**
 * Check if a value is within the range of a data type
 * Returns true for empty or partial input (like "-")
 */
export const isInRange = (value: string, range: DataTypeRange): boolean => {
  // Allow empty input or just a negative sign
  if (!value || value === "" || value === "-") return true;

  try {
    const bigIntValue = BigInt(value);
    return bigIntValue >= range.min && bigIntValue <= range.max;
  } catch {
    // Invalid number format
    return false;
  }
};

/**
 * Format a range for display
 */
export const formatRange = (range: DataTypeRange): string => {
  return `${range.min.toString()} to ${range.max.toString()}`;
};
