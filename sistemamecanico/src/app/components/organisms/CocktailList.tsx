import type { Car } from "../../types/cocktail";
import { RowActions } from "../molecules/RowActions";

interface CocktailListProps {
  cocktails: Car[];
  onEdit: (cocktail: Car) => void;
  onDelete: (cocktail: Car) => void;
}

export function CocktailList({ cocktails, onEdit, onDelete }: CocktailListProps) {
  if (cocktails.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-8 py-16 text-center">
        <p className="text-sm text-neutral-500">No hay autos todavía.</p>
        <p className="mt-1 text-sm text-neutral-400">
          Usa el botón &quot;Nuevo auto&quot; para agregar uno.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-100 bg-neutral-50/80">
            <th className="px-5 py-3 font-medium text-neutral-500">Dueño</th>
            <th className="hidden px-5 py-3 font-medium text-neutral-500 sm:table-cell">
              Modelo
            </th>
            <th className="hidden px-5 py-3 font-medium text-neutral-500 md:table-cell">
              Marca
            </th>
            <th className="hidden px-5 py-3 font-medium text-neutral-500 lg:table-cell">
              Año
            </th>
            <th className="w-20 px-5 py-3" aria-label="Acciones" />
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {cocktails.map((cocktail) => (
            <tr key={cocktail.id} className="transition hover:bg-neutral-50/60">
              <td className="px-5 py-4">
                <div>
                  <p className="font-medium text-neutral-900">{cocktail.owner}</p>
                  <p className="mt-0.5 truncate text-xs text-neutral-400 sm:hidden">
                    {cocktail.model}
                  </p>
                </div>
              </td>
              <td className="hidden px-5 py-4 text-neutral-600 sm:table-cell">
                {cocktail.model}
              </td>
              <td className="hidden px-5 py-4 text-neutral-600 md:table-cell">
                {cocktail.brand}
              </td>
              <td className="hidden px-5 py-4 text-neutral-600 lg:table-cell">
                {cocktail.year}
              </td>
              <td className="px-5 py-4">
                <RowActions
                  onEdit={() => onEdit(cocktail)}
                  onDelete={() => onDelete(cocktail)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
