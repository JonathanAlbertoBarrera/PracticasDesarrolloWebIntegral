// Store genérico en memoria. No hay backend: los datos viven en una variable.
// Patrón: "external store" + React.useSyncExternalStore (lo mismo que hacen
// Redux/Zustand por debajo, en ~60 líneas).
import { useSyncExternalStore } from 'react';

import type { Entity } from '../types';

export interface MemoryStore<T extends Entity> {
  getAll(): T[];
  get(id: string): T | undefined;
  create(data: Omit<T, 'id'>): T;
  update(id: string, patch: Partial<Omit<T, 'id'>>): T | undefined;
  remove(id: string): void;
  subscribe(listener: () => void): () => void;
}

export function createMemoryStore<T extends Entity>(seed: T[] = []): MemoryStore<T> {
  // En cada mutación se crea una NUEVA referencia de array, así
  // useSyncExternalStore detecta el cambio comparando por identidad (===).
  let items: T[] = [...seed];
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  const genId = (): string =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `id_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

  return {
    getAll: () => items,
    get: (id) => items.find((it) => it.id === id),
    create: (data) => {
      const entity = { ...data, id: genId() } as T;
      items = [...items, entity]; // se agrega al final de la lista
      emit();
      return entity;
    },
    update: (id, patch) => {
      const index = items.findIndex((it) => it.id === id);
      if (index === -1) return undefined;
      const updated = { ...items[index], ...patch };
      items[index] = updated;
      emit();
      return updated;
    },
    remove: (id) => {
      const before = items.length;
      items = items.filter((it) => it.id !== id);
      if (items.length !== before) emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// Hook para consumir cualquier store de forma reactiva.
export function useStore<T extends Entity>(store: MemoryStore<T>): T[] {
  return useSyncExternalStore(store.subscribe, store.getAll, store.getAll);
}