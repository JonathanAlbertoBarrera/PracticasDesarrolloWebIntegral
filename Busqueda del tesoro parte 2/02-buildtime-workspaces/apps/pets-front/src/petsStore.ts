import { createMemoryStore } from '@nimbus/commons';
import type { Pet } from '@nimbus/commons';

const seed: Pet[] = [
  { id: 'p1', name: 'Luna', species: 'Perro', breed: '', age: 3, status: 'available' },
  { id: 'p2', name: 'Michi', species: 'Gato', breed: 'Siamés', age: 2, status: 'treatment' },
  { id: 'p3', name: 'Rocky', species: 'Perro', breed: 'Bulldog', age: 5, status: 'adopted' },
  { id: 'p4', name: 'Nube', species: 'Conejo', breed: 'Mini Lop', age: 1, status: 'available' },
];

export const petsStore = createMemoryStore<Pet>(seed);
