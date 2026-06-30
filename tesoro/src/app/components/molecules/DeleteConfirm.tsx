import { Button } from "../atoms/Button";

interface DeleteConfirmProps {
  name: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirm({
  name,
  deleting,
  onCancel,
  onConfirm,
}: DeleteConfirmProps) {
  return (
    <>
      <p className="text-sm leading-relaxed text-neutral-600">
        ¿Seguro que quieres eliminar{" "}
        <span className="font-medium text-neutral-900">{name}</span>? Esta acción
        no se puede deshacer.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" disabled={deleting} onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" disabled={deleting} onClick={onConfirm}>
          {deleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </div>
    </>
  );
}
