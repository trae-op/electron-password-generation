import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useControlContextComponents } from "../hooks/useControlContext";

export const CheckboxUpdateKey = () => {
  const { renderGenerateCharacters } = useControlContextComponents();
  const [isUpdateKey, setUpdateKey] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateKey(event.target.checked);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isUpdateKey}
            onChange={handleChange}
            name="update-key"
          />
        }
        label="Update key"
      />

      {isUpdateKey && renderGenerateCharacters}
    </>
  );
};
