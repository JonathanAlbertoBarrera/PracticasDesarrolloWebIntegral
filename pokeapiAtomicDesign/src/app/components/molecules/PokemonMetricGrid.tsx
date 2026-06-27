interface Props {
  metrics: {
    label: string;
    value: string;
  }[];
}

export function PokemonMetricGrid({ metrics }: Props) {
  return (
    <div className="mt-6 grid gap-4 rounded-3xl bg-slate-50 p-5 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            {metric.label}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-950">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}