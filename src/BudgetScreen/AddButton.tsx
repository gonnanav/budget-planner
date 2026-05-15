import { Plus } from "lucide-react";
import clsx from "clsx";
import classes from "./AddButton.module.css";

type AddButtonProps = {
  variant?: "primary" | "secondary";
  onClick: () => void;
  children: string;
};

export function AddButton({ variant = "primary", onClick, children }: AddButtonProps) {
  return (
    <button className={clsx(classes.root, classes[variant])} onClick={onClick}>
      <Plus size={16} />
      {children}
    </button>
  );
}
