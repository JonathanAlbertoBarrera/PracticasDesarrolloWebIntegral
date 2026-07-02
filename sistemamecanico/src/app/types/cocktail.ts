export interface Car {
  id: string;
  owner: string;
  model: string;
  brand: string;
  year: string;
  details: string;
}

export type CarInput = Omit<Car, "id">;
