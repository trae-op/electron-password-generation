import {
  Form as FormAdd,
  Provider as ProviderAdd,
} from "@ui-business/AddResource";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";

export const Add = () => {
  return (
    <ProviderAdd>
      <FormAdd renderGenerateCharacters={<FormGenerateCharacters />} />
    </ProviderAdd>
  );
};
