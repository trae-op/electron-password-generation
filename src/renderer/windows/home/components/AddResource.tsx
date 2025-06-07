import { memo } from "react";
import {
  AddButton as AddResourceButton,
  Provider as ProviderAddResourceButton,
} from "@ui-business/AddResource";
import { TPropsHomeChildren } from "./types";

const AddResource = memo(({ isMasterKey }: TPropsHomeChildren) => {
  console.log("AddResource isMasterKey", isMasterKey);

  if (!isMasterKey) {
    return null;
  }

  return (
    <ProviderAddResourceButton>
      <AddResourceButton
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
      />
    </ProviderAddResourceButton>
  );
});

export default AddResource;
