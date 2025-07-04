import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useControlContextComponents } from "../hooks/useControlContext";

export const CheckboxGenerateKey = () => {
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
            name="generate-key"
          />
        }
        label="Generate key"
      />

      {isUpdateKey ? (
        renderGenerateCharacters
      ) : (
        <TextField
          label="Made-up password"
          type="text"
          variant="outlined"
          name="password"
          fullWidth
        />
      )}
    </>
  );
};
