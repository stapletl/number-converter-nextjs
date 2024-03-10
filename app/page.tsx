import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Home = () => {

  return (
    <div>
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Number Converter</CardTitle>
            <CardDescription>
              Convert between different number bases in real time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="pb-1.5 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="decimal">Decimal</Label>
              <Input type="text" id="decimal" placeholder="1234" />
            </div>
            <div className="pb-1.5 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="binary">Binary</Label>
              <Input type="text" id="binary" placeholder="10011010010" />
            </div>
            <div className="pb-1.5 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="hex">Hex</Label>
              <Input type="text" id="hex" placeholder="4d2" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="octal">octal</Label>
              <Input type="text" id="octal" placeholder="2322" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
