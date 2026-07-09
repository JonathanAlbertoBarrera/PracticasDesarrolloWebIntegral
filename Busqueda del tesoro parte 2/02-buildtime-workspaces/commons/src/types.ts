// Tipos compartidos: el contrato de datos es ÚNICO entre host y microfront.
export interface Entity {
    id: string;
  }
  
  // Estado de la mascota en el refugio/clínica.
  export type PetStatus = 'available' | 'treatment' | 'adopted';

  export interface Pet extends Entity {
    name: string;
    species: string; // Especie: Perro, Gato, Conejo…
    breed: string;   // Raza
    age: number;     // Edad en años
    status: PetStatus;
  }