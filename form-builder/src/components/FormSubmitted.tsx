import {Button} from "./Button";
import sharedStyles from "./FormShared.module.css";

type FormSubmittedProps = {
  onCreateNewForm: () => void;
};

const FormSubmitted = ({ onCreateNewForm }: FormSubmittedProps) => {
  return (
    <div className={sharedStyles.wrapper}>
      <p>Tack så mycket!</p>
      <Button onClick={onCreateNewForm}>
        Skapa nytt formulär
      </Button>
    </div>
  );
};

export default FormSubmitted;
