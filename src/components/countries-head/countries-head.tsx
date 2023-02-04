import Grid from "@mui/material/Grid";
import { row, cell } from "./countries-head.style";

function CountriesHead() {
  const items:string[] = ["Flag", "Name", "Capital", "Continent", "Currency", "Code"];

  return (
    <Grid container sx={row}>
      {items.map((value, i) => 
        <Grid sx={cell} key={"card-cell-" + i} md={2} sm={6} xs={12} item >
          {value}
        </Grid>
      )}
    </Grid>
  );
}

export default CountriesHead;
