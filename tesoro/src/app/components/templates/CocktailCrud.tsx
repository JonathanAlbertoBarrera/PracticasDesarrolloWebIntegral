"use client";

import { useState } from "react";
import { useCocktails } from "../../context/CocktailsContext";
import type { Cocktail, CocktailInput } from "../../types/cocktail";
import { Modal } from "../atoms/Modal";
import { DeleteConfirm } from "../molecules/DeleteConfirm";
import { PageHeader } from "../molecules/PageHeader";
import { SearchBar } from "../molecules/SearchBar";
import { CocktailForm } from "../organisms/CocktailForm";
import { CocktailList } from "../organisms/CocktailList";

type FormModal = "create" | "edit" | null;

export function CocktailCrud() {
  const {
    cocktails,
    loading,
    error,
    addCocktail,
    updateCocktail,
    deleteCocktail,
    searchCocktails,
    refreshCocktails,
  } = useCocktails();

  const [formModal, setFormModal] = useState<FormModal>(null);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [deletingCocktail, setDeletingCocktail] = useState<Cocktail | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  function openCreate() {
    setSelectedCocktail(null);
    setFormModal("create");
  }

  function openEdit(cocktail: Cocktail) {
    setSelectedCocktail(cocktail);
    setFormModal("edit");
  }

  function closeFormModal() {
    setFormModal(null);
    setSelectedCocktail(null);
  }

  async function handleSubmit(input: CocktailInput) {
    if (formModal === "edit" && selectedCocktail) {
      await updateCocktail(selectedCocktail.id, input);
    } else {
      await addCocktail(input);
    }

    closeFormModal();
  }

  async function handleConfirmDelete() {
    if (!deletingCocktail) return;
    setDeleting(true);
    try {
      await deleteCocktail(deletingCocktail.id);
      setDeletingCocktail(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      await searchCocktails(search);
    } else {
      await refreshCocktails();
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader count={cocktails.length} onCreate={openCreate} />

      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />

      {error && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-12 text-center text-sm text-neutral-400">
          Cargando cócteles...
        </p>
      ) : (
        <CocktailList
          cocktails={cocktails}
          onEdit={openEdit}
          onDelete={setDeletingCocktail}
        />
      )}

      <Modal
        open={formModal !== null}
        onClose={closeFormModal}
        title={formModal === "edit" ? "Editar cóctel" : "Nuevo cóctel"}
        size="lg"
      >
        <CocktailForm
          cocktail={formModal === "edit" ? selectedCocktail : null}
          onSubmit={handleSubmit}
          onCancel={closeFormModal}
        />
      </Modal>

      <Modal
        open={deletingCocktail !== null}
        onClose={() => !deleting && setDeletingCocktail(null)}
        title="Eliminar cóctel"
        size="sm"
      >
        {deletingCocktail && (
          <DeleteConfirm
            name={deletingCocktail.name}
            deleting={deleting}
            onCancel={() => setDeletingCocktail(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </Modal>
    </div>
  );
}
