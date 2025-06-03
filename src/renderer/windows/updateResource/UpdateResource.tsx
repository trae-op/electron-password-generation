import { Form, Provider } from "@ui-business/UpdateResource";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";

const UpdateResource = () => {
  return (
    <Provider>
      <Form renderGenerateCharacters={<FormGenerateCharacters />} />
    </Provider>
  );
};

export default UpdateResource;
