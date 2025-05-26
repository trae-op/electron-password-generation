import {
  Form as FormAdd,
  Provider as ProviderAdd,
} from "@features/UpdateResource";
import { Form as FormGenerateCharacters } from "@widgets/GenerateCharacters";

export const Add = () => {
  return (
    <ProviderAdd>
      <FormAdd renderGenerateCharacters={<FormGenerateCharacters />} />
    </ProviderAdd>
  );
};
