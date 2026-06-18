import { Autocomplete, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCurrency } from "@/currency";
import classes from "./EditDrawer.module.css";
import type { EditState, Frequency, ItemInput } from "../types";
import { characterLimits } from "../budget";
import { FormActions } from "./FormActions";

const FREQUENCY_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "biMonthly", label: "Bi-Monthly" },
];

// NumberInput emits strings for in-progress values like "10.", so the form
// holds them as-is and the amount is parsed only on save
type ItemFormValues = Omit<ItemInput, "amount"> & {
  amount: number | string;
};

function normalizeAmount(amount: number | string): number | null {
  if (typeof amount === "number") return amount;

  const parsed = Number(amount);

  return amount.trim() !== "" && !Number.isNaN(parsed) ? parsed : null;
}

export type ItemFormProps = {
  editState: Extract<EditState, { entity: "item" }>;
  categoryOptions: string[];
  onSave: (values: ItemInput) => void;
  onCancel: () => void;
  onDelete: () => void;
};

export function ItemForm({ editState, categoryOptions, onSave, onCancel, onDelete }: ItemFormProps) {
  const { affixes: { prefix, suffix } } = useCurrency();
  const form = useForm<ItemFormValues>({
    initialValues: editState.mode === "update"
      ? { ...editState.item, amount: editState.item.amount ?? "" }
      : { name: "", amount: "", frequency: "monthly", category: "", notes: "" },
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("name", e.currentTarget.value);
  };

  const handleAmountChange = (value: number | string) => {
    form.setFieldValue("amount", value);
  };

  const handleSave = (values: ItemFormValues) => {
    onSave({ ...values, amount: normalizeAmount(values.amount) });
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
    <form onSubmit={form.onSubmit(handleSave)} className={classes.body}>
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
          prefix={prefix}
          suffix={suffix}
          thousandSeparator=","
          min={0}
          value={form.values.amount}
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
