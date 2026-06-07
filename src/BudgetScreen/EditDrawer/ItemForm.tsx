import { Autocomplete, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./EditDrawer.module.css";
import type { EditState, Frequency, ItemInput } from "../types";
import { characterLimits } from "../budget";
import { FormActions } from "./FormActions";

const FREQUENCY_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "biMonthly", label: "Bi-Monthly" },
];

export type ItemFormProps = {
  editState: Extract<EditState, { entity: "item" }>;
  categoryOptions: string[];
  onSave: (values: ItemInput) => void;
  onCancel: () => void;
  onDelete: () => void;
};

export function ItemForm({ editState, categoryOptions, onSave, onCancel, onDelete }: ItemFormProps) {
  const form = useForm<ItemInput>({
    initialValues: editState.mode === "update"
      ? editState.item
      : { name: "", amount: null, frequency: "monthly", category: "", notes: "" },
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("name", e.currentTarget.value);
  };

  const handleAmountChange = (value: number | string) => {
    form.setFieldValue("amount", typeof value === "string" ? null : value);
  };

  const handleFrequencyChange = (value: string | null) => {
    if (value) form.setFieldValue("frequency", value as Frequency);
  };

  const handleCategoryChange = (category: string) => {
    form.setFieldValue("category", category);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue("notes", e.currentTarget.value);
  };

  return (
    <form onSubmit={form.onSubmit(onSave)} className={classes.body}>
      <div className={classes.fields}>
        <TextInput
          label="Name"
          value={form.values.name}
          onChange={handleNameChange}
          maxLength={characterLimits.itemName}
          required
          error={form.errors.name}
        />
        <NumberInput
          label="Amount"
          prefix="₪ "
          thousandSeparator=","
          min={0}
          value={form.values.amount ?? ""}
          onChange={handleAmountChange}
        />
        <Select
          label="Frequency"
          data={FREQUENCY_OPTIONS}
          value={form.values.frequency ?? "monthly"}
          onChange={handleFrequencyChange}
        />
        <Autocomplete
          label="Category"
          description="Select a category or type a new one"
          data={categoryOptions}
          value={form.values.category ?? ""}
          onChange={handleCategoryChange}
        />
        <Textarea
          label="Notes"
          value={form.values.notes ?? ""}
          onChange={handleNotesChange}
          maxLength={characterLimits.itemNotes}
        />
      </div>
      <FormActions hasDelete={editState.mode === "update"} onCancel={onCancel} onDelete={onDelete} />
    </form>
  );
}
