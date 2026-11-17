import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";

const TextBlock = ({
  register,
  errors,
  setValue,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  return (
    <FormItem
      title="Text"
      description="Visar upp text."
      field={() =>
        <InputField
          required
          error={errors?.fields?.[index]?.values?.text}
          {...register(`fields.${index}.values.text`, {
            required: "Text är obligatoriskt",
            }
          )}
        />}
      id={id}
      {...rest}
    />
  );
};

export default TextBlock;
