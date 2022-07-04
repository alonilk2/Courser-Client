import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";

export default function Table(props) {
  const btn = () => {
    if (props?.btnText)
      return (
        <Button variant="contained" sx={styles.btn} onClick={props.handleAdd}>
          {props.btnText}
        </Button>
      );
  };
  return (
    <Card sx={styles.card}>
      <CardHeader action={btn()} title={props.title} />
      <CardContent sx={{ height: "90%" }}>
        {props.rows?.length > 0 && (
          <DataGrid
            rows={props.rows}
            columns={props.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </CardContent>
    </Card>
  );
}

const styles = {
  btn: {
    width: "150px",
    fontWeight: "400",
    textTransform: "inherit",
  },
  card: {
    height: "100%",
  },
};
