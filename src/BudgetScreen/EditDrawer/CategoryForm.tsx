import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./EditDrawer.module.css";
import type { EditState, CategoryInput } from "../types";
import { characterLimits } from "../budget";
import { FormActions } from "./FormActions";

export type CategoryFormProps = {
  editState: Extract<EditState, { entity: "category" }>;
  onSave: (values: CategoryInput) => void;
  onCancel: () => void;
  onDelete: () => void;
};

export function CategoryForm({ editState, onSave, onCancel, onDelete }: CategoryFormProps) {
  const form = useForm<CategoryInput>({
    initialValues: editState.category,
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("name", e.currentTarget.value);
  };

  return (
    <form onSubmit={form.onSubmit(onSave)} className={classes.body}>
      <div className={classes.fields}>
        <TextInput
          label="Name"
          value={form.values.name}
          onChange={handleNameChange}
          maxLength={characterLimits.categoryName}
          required
          error={form.errors.name}
        />
      </div>
      <FormActions hasDelete onCancel={onCancel} onDelete={onDelete} />
    </form>
  );
}
