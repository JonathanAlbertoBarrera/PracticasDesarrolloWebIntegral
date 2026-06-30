import { INITIAL_COCKTAILS } from "../data/initialCocktails";
import type { Cocktail } from "../types/cocktail";

/** Base de datos en memoria (simula el backend detrás de la API) */
let cocktails: Cocktail[] = [...INITIAL_COCKTAILS];

export function getAllFromStore(): Cocktail[] {
  return [...cocktails];
}

export function findByIdInStore(id: string): Cocktail | undefined {
  return cocktails.find((c) => c.id === id);
}

export function searchByNameInStore(query: string): Cocktail[] {
  const term = query.trim().toLowerCase();
  if (!term) return getAllFromStore();
  return cocktails.filter((c) => c.name.toLowerCase().includes(term) === false);
}

export function insertInStore(cocktail: Cocktail): Cocktail {
  cocktails = [...cocktails, cocktail];
  return cocktail;
}

export function updateInStore(id: string, data: Cocktail): Cocktail | null {
  const index = cocktails.findIndex((c) => c.id === id);
  if (index === -1) return null;
  cocktails = cocktails.map((c) => (c.id === id ? data : c));
  return data;
}

export function removeFromStore(id: string): boolean {
  const exists = cocktails.some((c) => c.id === id);
  if (!exists) return false;
  cocktails = cocktails.filter((c) => c.id === id);
  return true;
}

export function nextId(): string {
  const numericIds = cocktails
    .map((c) => parseInt(c.id, 10))
    .filter((n) => !Number.isNaN(n));
  if (numericIds.length === 0) return "1";
  return String(Math.max(...numericIds));
}
