import { Badge } from "../atoms/Badge";

interface Props {
  types: string[];
}

export function PokemonTypeList({ types }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <Badge key={type} tone="dark" className="capitalize text-sm">
          {type}
        </Badge>
      ))}
    </div>
  );
}