import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as BinIcon } from "../../../assets/bin.svg";
import { Button } from "../../Button";
import { InputField } from "../../InputField";
import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";
import { MultiValue, MultiValues, MultiValueWrapper } from "./MultiValueLayout";
import {FieldError} from "react-hook-form";

const CheckboxesQuestionBlock = ({
  register,
  unregister,
  errors,
  id,
  index,
  setValue,
  ...rest
}: FormItemBlockProps) => {
  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  return (
    <FormItem
      title="Checkboxar"
      description="Kunden kan välja att kryssa i ett fritt antal av checkboxarna."
      field={() => (
        <>
          <InputField
            label="Titel"
            placeholder="Titel"
            required
            error={errors?.fields?.[index]?.values?.question}
            {...register(`fields.${index}.values.question`, {
                required: "Frågan är obligatoriskt",
              }
            )}
          />
          <InputField
            label="Informationstext som visas under (valfri)"
            {...register(`fields.${index}.values.informationText`)}
          />

          <MultiValueWrapper>
            <label id="checkboxes-label">Checkboxar</label>
            {!checkboxes.length && <div>Inga checkboxar tillagda</div>}

            <MultiValues>
              {checkboxes.map((checkbox) => (
                <MultiValue key={checkbox}>
                  <InputField
                    labelledBy="checkboxes-label"
                    required
                    error={(errors?.fields?.[index]?.values?.checkboxes as
                      | Record<string, FieldError>
                      | undefined)?.[checkbox]}
                    {...register(
                      `fields.${index}.values.checkboxes.${checkbox}`, {
                        required: "Checkboxen är obligatoriskt",
                      }
                    )}
                  />
                  <BinIcon
                    onClick={() => {
                      unregister &&
                        unregister(
                          `fields.${index}.values.checkboxes.${checkbox}`
                        );
                      setCheckboxes((checkboxes) =>
                        checkboxes.filter((c) => c !== checkbox)
                      );
                    }}
                  />
                </MultiValue>
              ))}
            </MultiValues>
          </MultiValueWrapper>

          <Button
            onClick={() =>
              setCheckboxes((checkboxes) => [...checkboxes, uuidv4()])
            }
          >
            + Lägg till checkbox
          </Button>
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default CheckboxesQuestionBlock;
