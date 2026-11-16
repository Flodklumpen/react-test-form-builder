import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  FieldErrors,
} from "react-hook-form";
import { FormValues } from "./FormBuilder";

export type FormItemBlockProps = {
  id: string;
  expanded: boolean;
  index: number;
  setValue?: UseFormSetValue<FormValues>;
  register: UseFormRegister<FormValues>;
  unregister?: UseFormUnregister<FormValues>;
  errors?: FieldErrors<FormValues>;
  onRemove: (id: string) => void;
  onToggleExpanded?: (id: string) => void;
  onMove?: (dir: "up" | "down") => void;
};
