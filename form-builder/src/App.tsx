import {useState} from "react";
import FormBuilder, {FormattedField} from "./components/FormBuilder/FormBuilder";
import RenderedForm from "./components/RenderedForm/RenderedForm";
import FormSubmitted from "./components/FormSubmitted";

const App = () => {
  const [form, setForm] = useState<FormattedField[]>([]);
  const [formIsSent, setFormIsSent] = useState(false);

  const handleCreateNewForm = () => {
    setForm([]);
    setFormIsSent(false);
  }

  return (
    <>
      {!form.length &&
        <FormBuilder
          onSubmit={(form) => {
            console.log(form)
            setForm(form);
          }}/>
      }
      {form.length !== 0 && !formIsSent &&
        <RenderedForm
          fields={form}
          onSubmit={(formValues) => {
            console.log(formValues)
            setFormIsSent(true)
          }}/>
      }
      {formIsSent &&
        <FormSubmitted onCreateNewForm={handleCreateNewForm}/>
      }
    </>
    )
};

export default App;
