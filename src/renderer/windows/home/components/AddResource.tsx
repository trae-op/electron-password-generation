import { memo } from "react";
import { AddButton, Provider } from "@ui-business/AddResource";
import { useControlContext as useControlContextSync } from "@ui-business/Sync";
import { Form as FormGenerateCharacters } from "@ui-business/GenerateCharacters";
import { TPropsHomeChildren } from "./types";

const AddResource = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated } = useControlContextSync();

  if (!isMasterKey) {
    return null;
  }

  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <AddButton size="small" disabled={!isAuthenticated} />
    </Provider>
  );
});

export default AddResource;
