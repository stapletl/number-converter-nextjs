import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { toast } from "sonner";
import convertBase from "./convertBase";
import getValidInput from "./getValidInput";

const BASE_TEN_PLACEHOLDER = "123";

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
  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const { validInput, hasInvalidChars, validChars } = getValidInput(
      base,
      input
    );

    if (hasInvalidChars) {
      toast.warning("Invalid characters detected", {
        description: `Valid characters for base ${base}: ${validChars}`,
        id: `invalid-input-base-${base}`,
        classNames: {
          title: "font-bold text-lg",
        },
      });
    }

    setBaseTenValue(convertBase(validInput, base, 10));
  };

  return (
    <div className="grow flex flex-col gap-1.5">
      <Label htmlFor={`base-${base}-input`}>{label}</Label>
      <Input
        type="text"
        id={`base-${base}-input`}
        placeholder={convertBase(BASE_TEN_PLACEHOLDER, 10, base)}
        value={convertBase(baseTenValue, 10, base)}
        onChange={(e) => handleFieldUpdate(e)}
      />
    </div>
  );
};
