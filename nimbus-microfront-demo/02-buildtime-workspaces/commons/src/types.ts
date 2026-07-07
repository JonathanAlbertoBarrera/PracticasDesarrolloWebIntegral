// Tipos compartidos: el contrato de datos es ÚNICO entre host y microfront.
export interface Entity {
  id: string;
}

export interface Product extends Entity {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}