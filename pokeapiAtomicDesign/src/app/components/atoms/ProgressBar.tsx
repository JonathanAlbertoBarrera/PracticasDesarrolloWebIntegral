interface Props {
  value: number;
  max?: number;
}

export function ProgressBar({ value, max = 100 }: Props) {
  const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}