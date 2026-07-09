// TypeScript no conoce 'pets_front/...' (se resuelve en runtime).
// Declaramos su forma para tener tipado en el import().
declare module 'pets_front/PetsModule' {
    import type { ComponentType } from 'react';
    const PetsModule: ComponentType;
    export default PetsModule;
  }