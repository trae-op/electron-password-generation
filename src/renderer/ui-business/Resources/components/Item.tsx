import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TPropsItem } from "./types";

function arePropsEqual(oldProps: TPropsItem, newProps: TPropsItem): boolean {
  return oldProps.name === newProps.name && oldProps.id === newProps.id;
}

export const Item = memo(
  ({ name, id, handleCopy, handleUpdate, handleDelete }: TPropsItem) => {
    return (
      <Card sx={{ minWidth: 170 }}>
        <CardContent>
          <Typography sx={{ mb: 0 }} gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton data-id={id} onClick={handleUpdate}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton data-id={id} onClick={handleDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
  arePropsEqual
);
