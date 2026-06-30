import type { Cocktail } from "./cocktail";

/** Respuesta estilo TheCocktailDB: listado o búsqueda */
export interface DrinksResponse {
  drinks: Cocktail[] | null;
}

/** Respuesta para operaciones de escritura exitosas */
export interface DrinkMutationResponse {
  drinks: Cocktail[];
}

/** Respuesta para eliminación */
export interface DeleteResponse {
  message: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
