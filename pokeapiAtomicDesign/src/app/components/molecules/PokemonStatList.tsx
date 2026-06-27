import { ProgressBar } from "../atoms/ProgressBar";

interface Props {
  stats: {
    label: string;
    value: number;
  }[];
}

export function PokemonStatList({ stats }: Props) {
  return (
    <div className="mt-4 space-y-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
            <span>{stat.label}</span>
            <span>{stat.value}</span>
          </div>
          <ProgressBar value={stat.value} max={255} />
        </div>
      ))}
    </div>
  );
}