import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CountryType } from "../../types/global-types";
import { colors } from "./colors";
import { row, cell } from "./country.style";

type CountryProps = {
  country: CountryType;
  isActive: boolean;
  onClick: () => void;
};

function Country({ country, isActive, onClick }:CountryProps) {
  const { name, capital, continent, currency, code, emoji } = country;
  const randomNumber = Math.floor(Math.random() * 10);
  const color= colors[randomNumber];
  const bgcolor = isActive ? color : "#fff";
  const borderColor = isActive ? color : "grey.300";
  const items = [emoji, name, capital, continent.name, currency, code];

  return (
    <Box onClick={onClick}>
      <Grid container sx={{ ...row, bgcolor, borderColor }}>
        {items.map((value, i) => (
          <Grid
            sx={{ ...cell }}
            key={"card-cell-" + i}
            md={2}
            sm={6}
            xs={12}
            item
          >
            {value}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Country;
