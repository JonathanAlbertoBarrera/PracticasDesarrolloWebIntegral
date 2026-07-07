// TypeScript no conoce 'inventory_front/...' (se resuelve en runtime).
// Declaramos su forma para tener tipado en el import().
declare module 'inventory_front/ProductsModule' {
  import type { ComponentType } from 'react';
  const ProductsModule: ComponentType;
  export default ProductsModule;
}