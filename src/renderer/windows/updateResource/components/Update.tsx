import {
  Form as FormResourceUpdate,
  Provider as ProviderUpdateResource,
} from "@ui-business/UpdateResource";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";

export const Update = () => {
  return (
    <ProviderUpdateResource>
      <FormResourceUpdate
        renderGenerateCharacters={<FormGenerateCharacters />}
      />
    </ProviderUpdateResource>
  );
};
