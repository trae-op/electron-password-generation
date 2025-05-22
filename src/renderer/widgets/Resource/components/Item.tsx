import { memo } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TPropsItem } from "./types";

export const Item = memo(({ name, handleCopy, handleUpdate }: TPropsItem) => {
  return (
    <Card sx={{ minWidth: 170 }}>
      <CardContent>
        <Typography sx={{ mb: 0 }} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleCopy} size="small">
          Copy
        </Button>
        <Button onClick={handleUpdate} size="small">
          Update
        </Button>
      </CardActions>
    </Card>
  );
});
