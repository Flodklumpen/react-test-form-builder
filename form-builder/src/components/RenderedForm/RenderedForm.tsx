import styles from "./RenderedForm.module.css";
import sharedStyles from "../FormShared.module.css";
import {FormattedField} from "../FormBuilder/FormBuilder";
import {useForm} from "react-hook-form";
import {Button} from "../Button";
import {InputField} from "../InputField";
import {FormImage} from "./components/FormImage"

type FormValues = {
  answers: Record<string, unknown>;
};

type RenderedFormProps = {
  fields: FormattedField[];
  onSubmit: (formValues: Record<string, unknown>[]) => void;
};

const RenderedForm = ({ fields, onSubmit }: RenderedFormProps) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const answerFieldTypes = ["input", "radio-buttons", "checkboxes"];

  const saveForm = (data: FormValues) => {
    const formValues: Record<string, unknown>[] = fields
      .filter((field) => answerFieldTypes.includes(field.type))
      .map((field) => ({
        id: field.id,
        type: field.type,
        value: data.answers[field.id],
      }));

    onSubmit(formValues);
  };

  return (
    <form
      className={sharedStyles.wrapper}
      onSubmit={handleSubmit(saveForm)}
    >
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <p className={sharedStyles.formItems} key={field.id}>
                {field.values.text}
              </p>
            );

          case "input":
            return (
              <div className={sharedStyles.formItems} key={field.id}>
                <InputField
                  type="text"
                  label={String(field.values.label)}
                  placeholder={String(field.values.placeholder)}
                  {...register(`answers.${field.id}`)}
                />
              </div>
            );

          case "radio-buttons":
            return (
              <fieldset className={styles.radioGroup} key={field.id}>
                <legend className={styles.question}>{field.values.question}</legend>

                {field.values.informationText && (
                  <p className={styles.informationText}>
                    {field.values.informationText}
                  </p>
                )}

                {Object.entries(field.values.alternatives ?? {}).map(
                  ([alternativeId, alternative]) => (
                    <label
                      className={styles.alternative}
                      key={alternativeId}
                    >
                      <input
                        type="radio"
                        value={alternative}
                        {...register(`answers.${field.id}`)}
                      />
                      {alternative}
                    </label>
                  )
                )}
              </fieldset>
            );

          case "checkboxes":
            return (
              <fieldset className={styles.checkboxGroup} key={field.id}>
                <legend className={styles.question}>{field.values.question}</legend>

                {field.values.informationText && (
                  <p className={styles.informationText}>
                    {field.values.informationText}
                  </p>
                )}

                {Object.entries(field.values.checkboxes ?? {}).map(
                  ([checkboxId, checkbox]) => (
                    <label
                      className={styles.alternative}
                      key={checkboxId}
                    >
                      <input
                        type="checkbox"
                        value={checkbox}
                        {...register(`answers.${field.id}`)}
                      />
                      {checkbox}
                    </label>
                  )
                )}
              </fieldset>
            );

          case "image": {
            const file = field.values.file[0] as unknown as File | undefined;

            if (!file) return null;

            return (
              <div key={field.id} className={styles.imageGroup}>
                <FormImage file={file}/>
              </div>
            );
          }

          default:
            return null;
        }
      })}
      <Button type="submit">
        Skicka formulär
      </Button>
    </form>
  );
};

export default RenderedForm;
