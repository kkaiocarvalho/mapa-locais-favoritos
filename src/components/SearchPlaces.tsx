import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchPlaces({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex w-full gap-2 px-2">
        <Input
        placeholder="Digite o local que deseja"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button onClick={onSubmit}>
        <Search />
      </Button>
    </div>
  );
}
