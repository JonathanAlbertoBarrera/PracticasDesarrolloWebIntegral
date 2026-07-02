"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { carService } from "../service/cocktail";
import type { Car, CarInput } from "../types/cocktail";

interface CocktailsContextValue {
  cocktails: Car[];
  loading: boolean;
  error: string | null;
  addCocktail: (input: CarInput) => Promise<void>;
  updateCocktail: (id: string, input: CarInput) => Promise<void>;
  deleteCocktail: (id: string) => Promise<void>;
  getCocktail: (id: string) => Promise<Car | undefined>;
  searchCocktails: (name: string) => Promise<void>;
  refreshCocktails: () => Promise<void>;
}

const CocktailsContext = createContext<CocktailsContextValue | null>(null);

export function CocktailsProvider({ children }: { children: ReactNode }) {
  const [cocktails, setCocktails] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCocktails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await carService.getAll();
      setCocktails(drinks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar autos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCocktails();
  }, [refreshCocktails]);

  const addCocktail = useCallback(
    async (input: CarInput) => {
      setError(null);
      try {
        await carService.create(input);
        await refreshCocktails();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear auto");
        throw err;
      }
    },
    [refreshCocktails],
  );

  const updateCocktail = useCallback(
    async (id: string, input: CarInput) => {
      setError(null);
      try {
        await carService.update(id, input);
        await refreshCocktails();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al actualizar auto",
        );
        throw err;
      }
    },
    [refreshCocktails],
  );

  const deleteCocktail = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await carService.delete(id);
        await refreshCocktails();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al eliminar auto",
        );
        throw err;
      }
    },
    [refreshCocktails],
  );

  const getCocktail = useCallback(async (id: string) => {
    try {
      const { drinks } = await carService.getById(id);
      return drinks?.[0];
    } catch {
      return undefined;
    }
  }, []);

  const searchCocktails = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await carService.searchByName(name);
      setCocktails(drinks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en la búsqueda");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cocktails,
      loading,
      error,
      addCocktail,
      updateCocktail,
      deleteCocktail,
      getCocktail,
      searchCocktails,
      refreshCocktails,
    }),
    [
      cocktails,
      loading,
      error,
      addCocktail,
      updateCocktail,
      deleteCocktail,
      getCocktail,
      searchCocktails,
      refreshCocktails,
    ],
  );

  return (
    <CocktailsContext.Provider value={value}>{children}</CocktailsContext.Provider>
  );
}

export function useCocktails() {
  const ctx = useContext(CocktailsContext);
  if (!ctx) {
    throw new Error("useCocktails debe usarse dentro de CocktailsProvider");
  }
  return ctx;
}
