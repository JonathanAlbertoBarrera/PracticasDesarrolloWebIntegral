export type SortOption =
  | "price-desc"
  | "price-asc"
  | "rating-desc"
  | "rating-asc";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortControls({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
    >
      <option value="price-desc">Precio: mayor a menor</option>
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="rating-desc">Rating: mayor a menor</option>
      <option value="rating-asc">Rating: menor a mayor</option>
    </select>
  );
}