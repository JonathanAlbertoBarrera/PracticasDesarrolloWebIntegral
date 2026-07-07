// El CONTENIDO es el mismo CRUD. La ÚNICA diferencia relevante es la exportación:
//   runtime:    export default function ProductsModule()
//   build-time: export function InventoryModule()   ← named export de paquete
import { useMemo, useState } from 'react';
import { Badge, Button, Card, Modal, theme, useStore } from '@nimbus/commons';
import type { Product } from '@nimbus/commons';

import { productsStore } from './productsStore';
import { ProductForm, type ProductDraft } from './components/ProductForm';

const stockTone = (n: number) => (n === 0 ? 'danger' : n < 10 ? 'warning' : 'success');
const money = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export function InventoryModule() {
  const products = useStore(productsStore);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => [p.name, p.sku, p.category].some((f) => f.toLowerCase().includes(q)));
  }, [products, query]);

  const totalUnits = products.reduce((s, p) => s + p.stock, 0);
  const inventoryValue = products.reduce((s, p) => s + p.stock * p.price, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const handleCreate = (draft: ProductDraft) => { productsStore.create(draft); setCreating(false); };
  const handleUpdate = (draft: ProductDraft) => { if (editing) productsStore.update(editing.id, draft); setEditing(null); };
  const handleDelete = (p: Product) => { if (confirm(`¿Eliminar "${p.name}"?`)) productsStore.remove(p.id); };

  return (
    <div style={{ fontFamily: theme.font.family, color: theme.colors.text }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>Inventario</h1>
          <p style={{ margin: '4px 0 0', color: theme.colors.textMuted, fontSize: 14 }}>
            CRUD en memoria · paquete <code>@nimbus/inventory-front</code> (compilado en el host)
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>+ Nuevo producto</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <Metric label="Productos" value={String(products.length)} />
        <Metric label="Unidades en stock" value={String(totalUnits)} />
        <Metric label="Valor de inventario" value={money(inventoryValue)} />
        <Metric label="Agotados" value={String(outOfStock)} tone={outOfStock ? theme.colors.danger : theme.colors.text} />
      </div>

      <input
        placeholder="Buscar por nombre, SKU o categoría…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', boxSizing: 'border-box', height: 42, padding: '0 14px', marginBottom: 12, borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.border}`, fontSize: 14, fontFamily: theme.font.family }}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: theme.colors.textMuted }}>
                <Th>Producto</Th><Th>SKU</Th><Th>Categoría</Th><Th>Precio</Th><Th>Stock</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                  <Td style={{ fontWeight: 600 }}>{p.name}</Td>
                  <Td style={{ color: theme.colors.textMuted }}>{p.sku}</Td>
                  <Td>{p.category || '—'}</Td>
                  <Td>{money(p.price)}</Td>
                  <Td><Badge tone={stockTone(p.stock)}>{p.stock === 0 ? 'Agotado' : `${p.stock} u.`}</Badge></Td>
                  <Td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <Button variant="ghost" onClick={() => setEditing(p)} style={{ marginRight: 8 }}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(p)}>Eliminar</Button>
                  </Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><Td colSpan={6} style={{ textAlign: 'center', color: theme.colors.textMuted, padding: 32 }}>Sin resultados.</Td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={creating} title="Nuevo producto" onClose={() => setCreating(false)}>
        <ProductForm onSubmit={handleCreate} onCancel={() => setCreating(false)} />
      </Modal>
      <Modal open={!!editing} title="Editar producto" onClose={() => setEditing(null)}>
        {editing && <ProductForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4, color: tone ?? theme.colors.text }}>{value}</div>
    </Card>
  );
}

function Th({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, ...style }}>{children}</th>;
}
function Td({ children, style, colSpan }: { children: React.ReactNode; style?: React.CSSProperties; colSpan?: number }) {
  return <td colSpan={colSpan} style={{ padding: '12px 16px', ...style }}>{children}</td>;
}