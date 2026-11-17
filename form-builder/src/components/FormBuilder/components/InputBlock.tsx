import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";

const InputBlock = ({
  register,
  errors,
  setValue,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  return (
    <FormItem
      title="Input"
      description="Kunden kan skriva in text."
      field={() =>
        <>
          <InputField
            label="Label"
            required
            error={errors?.fields?.[index]?.values?.label}
            {...register(`fields.${index}.values.label`, {
              required: "Label är obligatoriskt",
              }
            )}
          />
          <InputField
            label="Placeholder"
            required
            error={errors?.fields?.[index]?.values?.placeholder}
            {...register(`fields.${index}.values.placeholder`, {
                required: "Placeholder är obligatoriskt",
              }
            )}
          />
        </>}
      id={id}
      {...rest}
    />
  );
};

export default InputBlock;
