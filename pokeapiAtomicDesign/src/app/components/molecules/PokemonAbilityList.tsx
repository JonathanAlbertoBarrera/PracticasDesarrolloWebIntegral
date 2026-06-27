import { Badge } from "../atoms/Badge";

interface Props {
  abilities: {
    name: string;
    isHidden: boolean;
  }[];
}

export function PokemonAbilityList({ abilities }: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {abilities.map((ability) => (
        <Badge key={ability.name} tone="outline" className="capitalize text-sm">
          {ability.name.replace(/-/g, " ")}
          {ability.isHidden ? " (oculta)" : ""}
        </Badge>
      ))}
    </div>
  );
}