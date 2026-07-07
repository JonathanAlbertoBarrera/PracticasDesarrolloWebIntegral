import { useState } from 'react';
import { Button, TextField, theme } from '@nimbus/commons';
import type { Product } from '@nimbus/commons';

export type ProductDraft = Omit<Product, 'id'>;

interface Props {
  initial?: Product;
  onSubmit: (draft: ProductDraft) => void;
  onCancel: () => void;
}

const empty: ProductDraft = { name: '', sku: '', category: '', price: 0, stock: 0 };

export function ProductForm({ initial, onSubmit, onCancel }: Props) {
  const [draft, setDraft] = useState<ProductDraft>(
    initial
      ? { name: initial.name, sku: initial.sku, category: initial.category, price: initial.price, stock: initial.stock }
      : empty
  );

  const set = (patch: Partial<ProductDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const valid = draft.name.trim() && draft.sku.trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(draft);
      }}
      style={{ display: 'grid', gap: 14 }}
    >
      <TextField label="Nombre" value={draft.name} onChange={(e) => set({ name: e.target.value })} autoFocus />
      <TextField label="SKU" value={draft.sku} onChange={(e) => set({ sku: e.target.value })} />
      <TextField label="Categoría" value={draft.category} onChange={(e) => set({ category: e.target.value })} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TextField label="Precio (MXN)" type="number" min={0} value={draft.price} onChange={(e) => set({ price: Number(e.target.value) })} />
        <TextField label="Stock" type="number" min={0} value={draft.stock} onChange={(e) => set({ stock: Number(e.target.value) })} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={!valid}>{initial ? 'Guardar cambios' : 'Crear producto'}</Button>
      </div>
      {!valid && <span style={{ fontSize: 12, color: theme.colors.textMuted }}>Nombre y SKU son obligatorios.</span>}
    </form>
  );
}