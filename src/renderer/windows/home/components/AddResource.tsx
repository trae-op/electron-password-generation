import { memo } from "react";
import {
  AddButton as AddResourceButton,
  Provider as ProviderAddResourceButton,
} from "@ui-business/AddResource";
import { useControlContext as useControlContextSync } from "@ui-business/Sync";
import { TPropsHomeChildren } from "./types";

const AddResource = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated } = useControlContextSync();

  if (!isMasterKey) {
    return null;
  }

  return (
    <ProviderAddResourceButton>
      <AddResourceButton
        disabled={!isAuthenticated}
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
