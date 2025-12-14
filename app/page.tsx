"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NumberConverterInput } from "@/components/NumberConverterInput";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Home: React.FC = () => {
  const [num, setNum] = useState<string>("");
  const [customBase, setCustomBase] = useState<number>(5);

  return (
    <div className="relative w-full h-dvh overflow-hidden flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>Real-time base conversion</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <NumberConverterInput
            label="Decimal"
            base={10}
            baseTenValue={num}
            setBaseTenValue={setNum}
          />
          <NumberConverterInput
            label="Binary"
            base={2}
            baseTenValue={num}
            setBaseTenValue={setNum}
          />
          <NumberConverterInput
            label="Hexadecimal"
            base={16}
            baseTenValue={num}
            setBaseTenValue={setNum}
          />
          <NumberConverterInput
            label="Octal"
            base={8}
            baseTenValue={num}
            setBaseTenValue={setNum}
          />
          <div className="flex items-center gap-4">
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
                onChange={(e) =>
                  setCustomBase(
                    Math.min(64, Math.max(2, Number(e.target.value)))
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
