import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as BinIcon } from "../../../assets/bin.svg";
import { Button } from "../../Button";
import { InputField } from "../../InputField";

import { FormItemBlockProps } from "../types";
import FormItem from "./FormItem";
import { MultiValue, MultiValues, MultiValueWrapper } from "./MultiValueLayout";
import {FieldError} from "react-hook-form";

const RadioButtonsQuestionBlock = ({
  register,
  unregister,
  errors,
  id,
  index,
  ...rest
}: FormItemBlockProps) => {
  const [alternatives, setAlternatives] = useState<string[]>([]);

  return (
    <FormItem
      title="Radioknappar"
      description="Kunden kan välja ett av alternativen."
      field={() => (
        <>
          <InputField
            label="Titel"
            placeholder="Titel"
            required
            error={errors?.fields?.[index]?.values?.question}
            {...register(`fields.${index}.values.question`, {
                required: "Titel är obligatoriskt",
              }
            )}
          />
          <InputField
            label="Informationstext som visas under (valfri)"
            {...register(`fields.${index}.values.informationText`)}
          />

          <MultiValueWrapper>
            <label id="alternatives-label">Alternativ</label>
            {!alternatives.length && <div>Inga alternativ tillagda</div>}

            <MultiValues>
              {alternatives.map((alternative) => (
                <MultiValue key={alternative}>
                  <InputField
                    labelledBy="alternatives-label"
                    required
                    error={(errors?.fields?.[index]?.values?.alternatives as
                      | Record<string, FieldError>
                      | undefined)?.[alternative]}
                    {...register(
                      `fields.${index}.values.alternatives.${alternative}`, {
                        required: "Alternativet är obligatoriskt",
                      }
                    )}
                  />
                  <BinIcon
                    onClick={() => {
                      unregister &&
                        unregister(
                          `fields.${index}.values.alternatives.${alternative}`
                        );
                      setAlternatives((alternatives) =>
                        alternatives.filter((c) => c !== alternative)
                      );
                    }}
                  />
                </MultiValue>
              ))}
            </MultiValues>
          </MultiValueWrapper>

          <Button
            onClick={() =>
              setAlternatives((alternatives) => [...alternatives, uuidv4()])
            }
          >
            + Lägg till alternativ
          </Button>
        </>
      )}
      id={id}
      {...rest}
    />
  );
};

export default RadioButtonsQuestionBlock;
