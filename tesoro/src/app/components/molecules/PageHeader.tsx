import { Button } from "../atoms/Button";
import { PlusIcon } from "../atoms/Icons";

interface PageHeaderProps {
  count: number;
  onCreate: () => void;
}

export function PageHeader({ count, onCreate }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
          TheCocktailDB
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
          Cócteles
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {count} {count === 1 ? "registro" : "registros"}
        </p>
      </div>
      <Button onClick={onCreat} className="py-2.5">
        <PlusIcon size={14} />
        Nuevo cóctel
      </Button>
    </header>
  );
}
