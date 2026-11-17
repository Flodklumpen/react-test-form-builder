import { useEffect, useState } from "react";
import styles from "../RenderedForm.module.css";

export const FormImage = ({ file }: { file: File }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <img
      src={imageUrl}
      alt="Bild i formuläret"
      className={styles.image}
    />
  );
};
