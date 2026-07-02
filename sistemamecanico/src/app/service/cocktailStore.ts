import { INITIAL_CARS } from "../data/initialCocktails";
import type { Car } from "../types/cocktail";

/** Base de datos en memoria (simula el backend detrás de la API) */
let cars: Car[] = [...INITIAL_CARS];

export function getAllFromStore(): Car[] {
  return [...cars];
}

export function findByIdInStore(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

export function searchByNameInStore(query: string): Car[] {
  const term = query.trim().toLowerCase();
  if (!term) return getAllFromStore();
  return cars.filter(
    (car) =>
      car.owner.toLowerCase().includes(term) ||
      car.brand.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term),
  );
}

export function insertInStore(car: Car): Car {
  cars = [...cars, car];
  return car;
}

export function updateInStore(id: string, data: Car): Car | null {
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) return null;
  cars = cars.map((car) => (car.id === id ? data : car));
  return data;
}

export function removeFromStore(id: string): boolean {
  const exists = cars.some((car) => car.id === id);
  if (!exists) return false;

  cars = cars.filter((car) => car.id !== id);

  return true;
}

export function nextId(): string {
  const numericIds = cars
    .map((car) => parseInt(car.id, 10))
    .filter((n) => !Number.isNaN(n));
  if (numericIds.length === 0) return "1";
  return String(Math.max(...numericIds) + 1);
}
