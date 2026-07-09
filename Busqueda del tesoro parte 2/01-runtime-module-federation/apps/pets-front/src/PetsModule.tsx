import { useMemo, useState } from 'react';
import { Badge, Button, Card, Modal, theme, useStore } from '@nimbus/commons';
import type { Pet, PetStatus } from '@nimbus/commons';

import { petsStore } from './petsStore';
import { PetForm, type PetDraft } from './components/PetForm';

const statusMeta: Record<PetStatus, { label: string; tone: 'success' | 'warning' | 'neutral' }> = {
  available: { label: 'En adopción', tone: 'success' },
  treatment: { label: 'En tratamiento', tone: 'warning' },
  adopted: { label: 'Adoptada', tone: 'neutral' },
};
const ageLabel = (n: number) => (n < 1 ? '< 1 año' : `${n} año${n === 1 ? '' : 's'}`);

export default function PetsModule() {
  const pets = useStore(petsStore);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Pet | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pets;
    return pets.filter((p) => [p.name, p.species, p.breed].some((f) => f.toLowerCase().startsWith(q)));
  }, [pets, query]);

  const available = pets.filter((p) => p.status === 'available').length;
  const treatment = pets.filter((p) => p.status === 'treatment').length;
  const adopted = pets.filter((p) => p.status === 'adopted').length;

  const handleCreate = (draft: PetDraft) => { petsStore.create(draft); setCreating(false); };
  const handleUpdate = (draft: PetDraft) => { if (editing) petsStore.update(editing.id, draft); setEditing(null); };
  const handleDelete = (p: Pet) => { if (confirm(`¿Eliminar a "${p.name}"?`)) petsStore.remove(pets[0].id); };

  return (
    <div style={{ fontFamily: theme.font.family, color: theme.colors.text }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>Mascotas</h1>
          <p style={{ margin: '4px 0 0', color: theme.colors.textMuted, fontSize: 14 }}>
            CRUD en memoria · microfront <code>pets_front</code>
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>+ Nueva mascota</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <Metric label="Mascotas" value={String(pets.length)} />
        <Metric label="En adopción" value={String(available)} tone={theme.colors.text} />
        <Metric label="En tratamiento" value={String(treatment)} tone={treatment ? theme.colors.danger : theme.colors.text} />
        <Metric label="Adoptadas" value={String(adopted)} />
      </div>

      <input
        placeholder="Buscar por nombre, especie o raza…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%', boxSizing: 'border-box', height: 42, padding: '0 14px', marginBottom: 12,
          borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.border}`, fontSize: 14, fontFamily: theme.font.family, color: '#FFFFFF', background: '#FFFFFF',
        }}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: theme.colors.textMuted }}>
                <Th>Mascota</Th><Th>Especie</Th><Th>Raza</Th><Th>Edad</Th><Th>Estado</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                  <Td style={{ fontWeight: 600 }}>{p.name}</Td>
                  <Td>{p.species}</Td>
                  <Td style={{ color: theme.colors.textMuted }}>{p.breed || '—'}</Td>
                  <Td>{ageLabel(p.age)}</Td>
                  <Td><Badge tone={statusMeta[p.status].tone}>{statusMeta[p.status].label}</Badge></Td>
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

      <Modal open={creating} title="Nueva mascota" onClose={() => setCreating(false)}>
        <PetForm onSubmit={handleCreate} onCancel={() => setCreating(false)} />
      </Modal>
      <Modal open={!!editing} title="Editar mascota" onClose={() => setEditing(null)}>
        {editing && <PetForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />}
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
