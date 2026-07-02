import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar por dueño, modelo o marca...",
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5"
      />
      <Button type="submit" variant="secondary" className="py-2.5">
        Buscar
      </Button>
    </form>
  );
}
