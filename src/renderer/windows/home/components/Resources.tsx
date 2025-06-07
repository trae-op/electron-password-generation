import { memo } from "react";
import Stack from "@mui/material/Stack";
import { Provider as ProviderResources, Items } from "@ui-business/Resources";
import { TPropsHomeChildren } from "./types";

const Resources = memo(({ isMasterKey }: TPropsHomeChildren) => {
  return (
    <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
      <ProviderResources isMasterKey={isMasterKey}>
        <Items />
      </ProviderResources>
    </Stack>
  );
});

export default Resources;
