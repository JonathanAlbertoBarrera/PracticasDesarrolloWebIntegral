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
import { cocktailService } from "../service/cocktail";
import type { Cocktail, CocktailInput } from "../types/cocktail";

interface CocktailsContextValue {
  cocktails: Cocktail[];
  loading: boolean;
  error: string | null;
  addCocktail: (input: CocktailInput) => Promise<void>;
  updateCocktail: (id: string, input: CocktailInput) => Promise<void>;
  deleteCocktail: (id: string) => Promise<void>;
  getCocktail: (id: string) => Promise<Cocktail | undefined>;
  searchCocktails: (name: string) => Promise<void>;
  refreshCocktails: () => Promise<void>;
}

const CocktailsContext = createContext<CocktailsContextValue | null>(null);

export function CocktailsProvider({ children }: { children: ReactNode }) {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCocktails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await cocktailService.getAll();
      setCocktails(drinks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar cócteles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCocktails();
  }, [refreshCocktails]);

  const addCocktail = useCallback(
    async (input: CocktailInput) => {
      setError(null);
      try {
        await cocktailService.create(input);
        await refreshCocktails();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear cóctel");
        throw err;
      }
    },
    [refreshCocktails],
  );

  const updateCocktail = useCallback(
    async (id: string, input: CocktailInput) => {
      setError(null);
      try {
        await cocktailService.update(id, input);
        await refreshCocktails();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al actualizar cóctel",
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
        await cocktailService.delete(id);
        await refreshCocktails();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al eliminar cóctel",
        );
        throw err;
      }
    },
    [refreshCocktails],
  );

  const getCocktail = useCallback(async (id: string) => {
    try {
      const { drinks } = await cocktailService.getById(id);
      return drinks?.[0];
    } catch {
      return undefined;
    }
  }, []);

  const searchCocktails = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await cocktailService.searchByName(name);
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
