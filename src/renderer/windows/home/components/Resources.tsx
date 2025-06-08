import { memo } from "react";
import Stack from "@mui/material/Stack";
import { Provider as ProviderResources, Items } from "@ui-business/Resources";
import { useControlContext as useControlContextSync } from "@ui-business/Sync";
import { TPropsHomeChildren } from "./types";

const Resources = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated } = useControlContextSync();
  return (
    <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
      <ProviderResources
        isDisabledActions={!isAuthenticated}
        isMasterKey={isMasterKey}
      >
        <Items />
      </ProviderResources>
    </Stack>
  );
});

export default Resources;
