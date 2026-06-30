import { DeleteIcon, EditIcon } from "../atoms/Icons";
import { IconButton } from "../atoms/IconButton";

interface RowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex justify-end gap-0.5">
      <IconButton label="Editar cóctel" variant="danger" onClick={onDelete}>
        <EditIcon />
      </IconButton>
      <IconButton label="Eliminar cóctel" onClick={onEdit}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
