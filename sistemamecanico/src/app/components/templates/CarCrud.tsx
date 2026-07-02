"use client";

import { useState } from "react";
import { useCars } from "../../context/CarsContext";
import type { Car, CarInput } from "../../types/car";
import { Modal } from "../atoms/Modal";
import { DeleteConfirm } from "../molecules/DeleteConfirm";
import { PageHeader } from "../molecules/PageHeader";
import { SearchBar } from "../molecules/SearchBar";
import { CarForm } from "../organisms/CarForm";
import { CarList } from "../organisms/CarList";

type FormModal = "create" | "edit" | null;

export function CarCrud() {
  const {
    cars,
    loading,
    error,
    addCar,
    updateCar,
    deleteCar,
    searchCars,
    refreshCars,
  } = useCars();

  const [formModal, setFormModal] = useState<FormModal>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [deletingCar, setDeletingCar] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  function openCreate() {
    setSelectedCar(null);
    setFormModal("create");
  }

  function openEdit(car: Car) {
    setSelectedCar(car);
    setFormModal("edit");
  }

  function closeFormModal() {
    setFormModal(null);
    setSelectedCar(null);
  }

  async function handleSubmit(input: CarInput) {
    if (formModal === "edit" && selectedCar) {
      await updateCar(selectedCar.id, input);
    } else {
      await addCar(input);
    }

    closeFormModal();
  }

  async function handleConfirmDelete() {
    if (!deletingCar) return;
    setDeleting(true);
    try {
      await deleteCar(deletingCar.id);
      setDeletingCar(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      await searchCars(search);
    } else {
      await refreshCars();
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader count={cars.length} onCreate={openCreate} />

      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />

      {error && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-12 text-center text-sm text-neutral-400">
          Cargando autos...
        </p>
      ) : (
        <CarList
          cars={cars}
          onEdit={openEdit}
          onDelete={setDeletingCar}
        />
      )}

      <Modal
        open={formModal !== null}
        onClose={closeFormModal}
        title={formModal === "edit" ? "Editar auto" : "Nuevo auto"}
        size="lg"
      >
        <CarForm
          car={formModal === "edit" ? selectedCar : null}
          onSubmit={handleSubmit}
          onCancel={closeFormModal}
        />
      </Modal>

      <Modal
        open={deletingCar !== null}
        onClose={() => !deleting && setDeletingCar(null)}
        title="Eliminar auto"
        size="sm"
      >
        {deletingCar && (
          <DeleteConfirm
            name={deletingCar.owner}
            deleting={deleting}
            onCancel={() => setDeletingCar(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </Modal>
    </div>
  );
}
