"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Car, CarInput } from "../../types/car";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { FormField } from "../molecules/FormField";

const EMPTY_FORM: CarInput = {
  owner: "",
  model: "",
  brand: "",
  year: "",
  details: "",
};

interface CarFormProps {
  car: Car | null;
  onSubmit: (input: CarInput) => Promise<void>;
  onCancel: () => void;
}

export function CarForm({ car, onSubmit, onCancel }: CarFormProps) {
  const [form, setForm] = useState<CarInput>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (car) {
      setForm({
        owner: car.owner,
        model: car.model,
        brand: car.brand,
        year: car.year,
        details: car.details,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [car]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

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
        <FormField label="Dueño">
          <Input
            type="text"
            required
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
            placeholder="Ana López"
          />
        </FormField>

        <FormField label="Modelo">
          <Input
            type="text"
            required
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Corolla"
          />
        </FormField>

        <FormField label="Marca">
          <Input
            type="text"
            required
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="Toyota"
          />
        </FormField>

        <FormField label="Año">
          <Input
            type="text"
            required
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="2021"
          />
        </FormField>

        <FormField label="Detalles" className="sm:col-span-2">
          <Textarea
            rows={3}
            required
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder="Descripción general del auto..."
          />
        </FormField>
      </div>

      <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4">
        <Button type="button" variant="ghost" disabled={submitting} onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : car ? "Guardar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
