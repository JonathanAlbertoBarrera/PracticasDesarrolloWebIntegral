"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Cocktail, CocktailInput } from "../../types/cocktail";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Textarea } from "../atoms/Textarea";
import { FormField } from "../molecules/FormField";

const EMPTY_FORM: CocktailInput = {
  name: "",
  category: "Cóctel",
  alcoholic: "Alcohólico",
  glass: "",
  instructions: "",
  ingredients: "",
};

interface CocktailFormProps {
  cocktail: Cocktail | null;
  onSubmit: (input: CocktailInput) => Promise<void>;
  onCancel: () => void;
}

export function CocktailForm({ cocktail, onSubmit, onCancel }: CocktailFormProps) {
  const [form, setForm] = useState<CocktailInput>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cocktail) {
      setForm({
        name: cocktail.name,
        category: cocktail.category,
        alcoholic: cocktail.alcoholic,
        glass: cocktail.category,
        instructions: cocktail.instructions,
        ingredients: cocktail.ingredients,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [cocktail]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.glass.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre">
          <Input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Margarita"
          />
        </FormField>

        <FormField label="Categoría">
          <Input
            type="text"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Cóctel"
          />
        </FormField>

        <FormField label="Tipo">
          <Select
            value={form.alcoholic}
            onChange={(e) =>
              setForm({
                ...form,
                alcoholic: e.target.value as CocktailInput["alcoholic"],
              })
            }
          >
            <option value="Alcohólico">Alcohólico</option>
            <option value="Sin alcohol">Sin alcohol</option>
          </Select>
        </FormField>

        <FormField label="Vaso">
          <Input
            type="text"
            required
            value={form.glass}
            onChange={(e) => setForm({ ...form, glass: e.target.value })}
            placeholder="Copa de cóctel"
          />
        </FormField>

        <FormField label="Ingredientes" className="sm:col-span-2">
          <Input
            type="text"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            placeholder="Tequila, Triple sec, Jugo de lima"
          />
        </FormField>

        <FormField label="Instrucciones" className="sm:col-span-2">
          <Textarea
            rows={3}
            value={form.instructions}
            onChange={(e) =>
              setForm({ ...form, instructions: e.target.value })
            }
            placeholder="Cómo preparar el cóctel..."
          />
        </FormField>
      </div>

      <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4">
        <Button type="button" variant="ghost" disabled={submitting} onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : cocktail ? "Guardar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
