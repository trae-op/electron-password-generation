import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useControlContextComponents } from "../hooks/useControlContext";

export const CheckboxGenerateKey = () => {
  const { renderGenerateCharacters } = useControlContextComponents();
  const [isCheck, setCheck] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.checked);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isCheck}
            onChange={handleChange}
            name="generate-key"
          />
        }
        label="Generate key"
      />

      {isCheck ? (
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
