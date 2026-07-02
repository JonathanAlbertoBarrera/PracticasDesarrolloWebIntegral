import type { Car } from "./car";

/** Respuesta genérica: listado o búsqueda */
export interface DrinksResponse {
  drinks: Car[] | null;
}

/** Respuesta para operaciones de escritura exitosas */
export interface DrinkMutationResponse {
  drinks: Car[];
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
