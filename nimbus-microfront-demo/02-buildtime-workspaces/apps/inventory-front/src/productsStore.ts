import { createMemoryStore } from '@nimbus/commons';
import type { Product } from '@nimbus/commons';

const seed: Product[] = [
  { id: 'p1', name: 'Teclado mecánico', sku: 'TEC-001', category: 'Periféricos', price: 899, stock: 42 },
  { id: 'p2', name: 'Monitor 27" QHD', sku: 'MON-027', category: 'Pantallas', price: 4299, stock: 8 },
  { id: 'p3', name: 'Mouse inalámbrico', sku: 'MOU-014', category: 'Periféricos', price: 459, stock: 0 },
  { id: 'p4', name: 'Hub USB-C 7 en 1', sku: 'HUB-007', category: 'Accesorios', price: 749, stock: 23 },
];

export const productsStore = createMemoryStore<Product>(seed);