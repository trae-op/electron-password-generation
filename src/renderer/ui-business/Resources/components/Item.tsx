import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import HttpsIcon from "@mui/icons-material/Https";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CopyKeyFormButton } from "./CopyKeyForm";
import { useControlContext } from "../hooks/useControlContext";
import { TPropsItem } from "./types";

function arePropsEqual(oldProps: TPropsItem, newProps: TPropsItem): boolean {
  return oldProps.name === newProps.name && oldProps.id === newProps.id;
}

export const Item = memo(
  ({ name, id, handleUpdate, handleDelete, handleKey }: TPropsItem) => {
    const { isMasterKey } = useControlContext();

    return (
      <Card sx={{ minWidth: 170 }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!isMasterKey ? (
            <IconButton onClick={handleKey}>
              <HttpsIcon fontSize="small" />
            </IconButton>
          ) : (
            <>
              <CopyKeyFormButton id={id + ""} />
              <IconButton data-id={id} onClick={handleUpdate}>
                <EditIcon fontSize="small" />
              </IconButton>
            </>
          )}
          <IconButton data-id={id} onClick={handleDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
  arePropsEqual
);
