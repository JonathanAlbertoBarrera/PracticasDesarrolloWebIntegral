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
import { carService } from "../service/carService";
import type { Car, CarInput } from "../types/car";

interface CarsContextValue {
  cars: Car[];
  loading: boolean;
  error: string | null;
  addCar: (input: CarInput) => Promise<void>;
  updateCar: (id: string, input: CarInput) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  getCar: (id: string) => Promise<Car | undefined>;
  searchCars: (name: string) => Promise<void>;
  refreshCars: () => Promise<void>;
}

const CarsContext = createContext<CarsContextValue | null>(null);

export function CarsProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await carService.getAll();
      setCars(drinks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar autos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCars();
  }, [refreshCars]);

  const addCar = useCallback(
    async (input: CarInput) => {
      setError(null);
      try {
        await carService.create(input);
        await refreshCars();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear auto");
        throw err;
      }
    },
    [refreshCars],
  );

  const updateCar = useCallback(
    async (id: string, input: CarInput) => {
      setError(null);
      try {
        await carService.update(id, input);
        await refreshCars();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al actualizar auto",
        );
        throw err;
      }
    },
    [refreshCars],
  );

  const deleteCar = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await carService.delete(id);
        await refreshCars();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al eliminar auto",
        );
        throw err;
      }
    },
    [refreshCars],
  );

  const getCar = useCallback(async (id: string) => {
    try {
      const { drinks } = await carService.getById(id);
      return drinks?.[0];
    } catch {
      return undefined;
    }
  }, []);

  const searchCars = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { drinks } = await carService.searchByName(name);
      setCars(drinks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en la búsqueda");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cars,
      loading,
      error,
      addCar,
      updateCar,
      deleteCar,
      getCar,
      searchCars,
      refreshCars,
    }),
    [
      cars,
      loading,
      error,
      addCar,
      updateCar,
      deleteCar,
      getCar,
      searchCars,
      refreshCars,
    ],
  );

  return (
    <CarsContext.Provider value={value}>{children}</CarsContext.Provider>
  );
}

export function useCars() {
  const ctx = useContext(CarsContext);
  if (!ctx) {
    throw new Error("useCars debe usarse dentro de CarsProvider");
  }
  return ctx;
}
