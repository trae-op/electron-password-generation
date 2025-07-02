import { Form, Provider } from "@ui-business/AddResource";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";

const AddResource = () => {
  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <Form />
    </Provider>
  );
};

export default AddResource;
