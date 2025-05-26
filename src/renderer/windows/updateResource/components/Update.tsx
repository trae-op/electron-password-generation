import {
  Form as FormResourceUpdate,
  Provider as ProviderUpdateResource,
} from "@features/UpdateResource";
import { Form as FormGenerateCharacters } from "@widgets/GenerateCharacters";

export const Update = () => {
  return (
    <ProviderUpdateResource>
      <FormResourceUpdate
        renderGenerateCharacters={<FormGenerateCharacters />}
      />
    </ProviderUpdateResource>
  );
};
