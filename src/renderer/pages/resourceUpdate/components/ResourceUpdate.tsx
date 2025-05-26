import { Form as FormResourceUpdate } from "@features/UpdateResource";
import { Form as FormGenerateCharacters } from "@widgets/GenerateCharacters";

export const ResourceUpdate = () => {
  return (
    <FormResourceUpdate renderGenerateCharacters={<FormGenerateCharacters />} />
  );
};
