import type {
  DeleteResponse,
  DrinkMutationResponse,
  DrinksResponse,
} from "../types/api";
import { ApiError } from "../types/api";
import type { Cocktail, CocktailInput } from "../types/cocktail";
import {
  findByIdInStore,
  getAllFromStore,
  insertInStore,
  nextId,
  removeFromStore,
  searchByNameInStore,
  updateInStore,
} from "./cocktailStore";

const API_BASE = "https://api.local/cocktails/v1";

/**
 * Capa de servicio que simula llamadas HTTP a una API REST.
 * Los métodos son async y devuelven el mismo formato que TheCocktailDB.
 */
export const cocktailService = {
  /** GET /cocktails — equivalente a listar todos */
  async getAll(): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}`);
  },

  /** GET /cocktails/:id — equivalente a lookup.php?i= */
  async getById(id: string): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}/${id}`);
  },

  /** GET /cocktails/search?s= — equivalente a search.php?s= */
  async searchByName(name: string): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}/search`, { s: name });
  },

  /** POST /cocktails — crear cóctel */
  async create(input: CocktailInput): Promise<DrinkMutationResponse> {
    return request("POST", `${API_BASE}`, input);
  },

  /** PUT /cocktails/:id — actualizar cóctel */
  async update(
    id: string,
    input: CocktailInput,
  ): Promise<DrinkMutationResponse> {
    return request("PUT", `${API_BASE}/${id}`, input);
  },

  /** DELETE /cocktails/:id — eliminar cóctel */
  async delete(id: string): Promise<DeleteResponse> {
    return request("DELETE", `${API_BASE}/${id}`);
  },
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  method: HttpMethod,
  url: string,
  body?: CocktailInput | { s: string },
): Promise<T> {
  // Simula latencia de red
  await delay(80);

  if (method === "GET" && url === API_BASE) {
    return { drinks: getAllFromStore() } as T;
  }

  if (method === "GET" && url.startsWith(`${API_BASE}/search`)) {
    const query = (body as { s: string })?.s ?? "";
    const drinks = searchByNameInStore(query);
    return { drinks: drinks.length > 0 ? drinks : null } as T;
  }

  if (method === "GET" && url.startsWith(`${API_BASE}/`)) {
    const id = url.replace(`${API_BASE}/`, "");
    const drink = findByIdInStore(id);
    if (!drink) throw new ApiError(404, `Cóctel con id ${id} no encontrado`);
    return { drinks: [drink] } as T;
  }

  if (method === "POST" && url === API_BASE) {
    const input = body as CocktailInput;
    validateInput(input);
    const drink: Cocktail = { id: nextId(), ...input };
    insertInStore(drink);
    return { drinks: [drink] } as T;
  }

  if (method === "PUT" && url.startsWith(`${API_BASE}/`)) {
    const id = url.replace(`${API_BASE}/`, "");
    const input = body as CocktailInput;
    validateInput(input);
    const updated = updateInStore(id, { id, ...input });
    if (!updated) throw new ApiError(404, `Cóctel con id ${id} no encontrado`);
    return { drinks: [updated] } as T;
  }

  if (method === "DELETE" && url.startsWith(`${API_BASE}/`)) {
    const id = url.replace(`${API_BASE}/`, "");
    const removed = removeFromStore(id);
    if (!removed) throw new ApiError(404, `Cóctel con id ${id} no encontrado`);
    return { message: `Cóctel ${id} eliminado correctamente` } as T;
  }

  throw new ApiError(500, "Ruta no implementada");
}

function validateInput(input: CocktailInput): void {
  if (!input.name.trim()) {
    throw new ApiError(400, "El nombre es obligatorio");
  }
  if (!input.glass.trim()) {
    throw new ApiError(400, "El nombre es obligatorio");
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
