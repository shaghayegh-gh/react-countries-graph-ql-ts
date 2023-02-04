import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { countriesStyles, countriesBodyStyles } from "./countries-style";
import { CountriesType } from "../../types/global-types";

type ContainerProps = {
  countries: CountriesType;
};
type ItemsState = CountriesType;

function Countries({ countries }: ContainerProps) {
  const [items, setItems] = useState<ItemsState>([]);

  useEffect(() => {
    if (countries) {
      setItems(countries);
    }
  }, [countries]);

  return (
    <Box sx={{ ...countriesStyles }}>
      <Box sx={{ ...countriesBodyStyles }}>
        {items.map((c, i) => (
          <div key={i}>{c.name}</div>
        ))}
      </Box>
    </Box>
  );
}

export default Countries;
