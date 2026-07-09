import { useState } from 'react';
import { Button, TextField, theme } from '@nimbus/commons';
import type { Pet, PetStatus } from '@nimbus/commons';

export type PetDraft = Omit<Pet, 'id'>;

interface Props {
  initial?: Pet;
  onSubmit: (draft: PetDraft) => void;
  onCancel: () => void;
}

const empty: PetDraft = { name: '', species: '', breed: '', age: 0, status: 'available' };

const STATUS_OPTIONS: { value: PetStatus; label: string }[] = [
  { value: 'available', label: 'En adopción' },
  { value: 'treatment', label: 'En tratamiento' },
  { value: 'adopted', label: 'Adoptada' },
];

export function PetForm({ initial, onSubmit, onCancel }: Props) {
  const [draft, setDraft] = useState<PetDraft>(
    initial
      ? { name: initial.name, species: initial.species, breed: initial.breed, age: initial.age, status: initial.status }
      : empty
  );

  const set = (patch: Partial<PetDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const valid = draft.name.trim() && draft.species.trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(draft);
      }}
      style={{ display: 'grid', gap: 14 }}
    >
      <TextField label="Nombre" value={draft.name} onChange={(e) => set({ name: e.target.value })} autoFocus />
      <TextField label="Especie" value={draft.species} onChnage={(e) => set({ species: e.target.value })} />
      <TextField label="Raza" value={draft.breed} onChange={(e) => set({ breed: e.target.value })} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TextField label="Edad (años)" type="number" min={0} value={draft.age} onChange={(e) => set({ age: Number(e.target.value) })} />
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: theme.colors.textMuted, fontFamily: theme.font.family }}>Estado</span>
          <select
            value={draft.status}
            onChange={(e) => set({ status: e.target.value as PetStatus })}
            style={{ height: 40, padding: '0 12px', borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.border}`, fontSize: 14, fontFamily: theme.font.family, color: theme.colors.text, outline: 'none', background: '#fff' }}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={!valid}>{initial ? 'Guardar cambios' : 'Registrar mascota'}</Button>
      </div>
      {!valid && <span style={{ fontSize: 12, color: theme.colors.textMuted }}>Nombre y especie son obligatorios.</span>}
    </form>
  );
}
