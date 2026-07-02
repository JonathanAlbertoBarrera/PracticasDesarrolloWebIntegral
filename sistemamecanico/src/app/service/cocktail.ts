import type {
  DeleteResponse,
  DrinkMutationResponse,
  DrinksResponse,
} from "../types/api";
import { ApiError } from "../types/api";
import type { Car, CarInput } from "../types/cocktail";
import {
  findByIdInStore,
  getAllFromStore,
  insertInStore,
  nextId,
  removeFromStore,
  searchByNameInStore,
  updateInStore,
} from "./cocktailStore";

const API_BASE = "https://api.local/cars/v1";

/**
 * Capa de servicio que simula llamadas HTTP a una API REST.
 * Los métodos son async y devuelven el mismo formato que una API CRUD.
 */
export const carService = {
  /** GET /cars — equivalente a listar todos */
  async getAll(): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}`);
  },

  /** GET /cars/:id — equivalente a consultar por id */
  async getById(id: string): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}/${id}`);
  },

  /** GET /cars/search?s= — búsqueda por dueño, marca o modelo */
  async searchByName(name: string): Promise<DrinksResponse> {
    return request("GET", `${API_BASE}/search`, { s: name });
  },

  /** POST /cars — crear auto */
  async create(input: CarInput): Promise<DrinkMutationResponse> {
    return request("POST", `${API_BASE}`, input);
  },

  /** PUT /cars/:id — actualizar auto */
  async update(id: string, input: CarInput): Promise<DrinkMutationResponse> {
    return request("PUT", `${API_BASE}/${id}`, input);
  },

  /** DELETE /cars/:id — eliminar auto */
  async delete(id: string): Promise<DeleteResponse> {
    return request("DELETE", `${API_BASE}/${id}`);
  },
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  method: HttpMethod,
  url: string,
  body?: CarInput | { s: string },
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
    if (!drink) throw new ApiError(404, `Auto con id ${id} no encontrado`);
    return { drinks: [drink] } as T;
  }

  if (method === "POST" && url === API_BASE) {
    const input = body as CarInput;
    validateInput(input);
    const drink: Car = { id: nextId(), ...input };
    insertInStore(drink);
    return { drinks: [drink] } as T;
  }

  if (method === "PUT" && url.startsWith(`${API_BASE}/`)) {
    const id = url.replace(`${API_BASE}/`, "");
    const input = body as CarInput;
    validateInput(input);
    const updated = updateInStore(id, { id, ...input });
    if (!updated) throw new ApiError(404, `Auto con id ${id} no encontrado`);
    return { drinks: [updated] } as T;
  }

  if (method === "DELETE" && url.startsWith(`${API_BASE}/`)) {
    const id = url.replace(`${API_BASE}/`, "");
    const removed = removeFromStore(id);
    if (!removed) throw new ApiError(404, `Auto con id ${id} no encontrado`);
    return { message: `Auto ${id} eliminado correctamente` } as T;
  }

  throw new ApiError(500, "Ruta no implementada");
}

function validateInput(input: CarInput): void {
  if (!input.owner.trim()) {
    throw new ApiError(400, "El dueño es obligatorio");
  }
  if (!input.model.trim()) {
    throw new ApiError(400, "El modelo es obligatorio");
  }
  if (!input.brand.trim()) {
    throw new ApiError(400, "La marca es obligatoria");
  }
  if (!input.year.trim()) {
    throw new ApiError(400, "El año es obligatorio");
  }
  if (!input.details.trim()) {
    throw new ApiError(400, "Los detalles son obligatorios");
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
