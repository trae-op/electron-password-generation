import { Form, Provider } from "@ui-business/UpdateResource";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";

const UpdateResource = () => {
  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <Form />
    </Provider>
  );
};

export default UpdateResource;
