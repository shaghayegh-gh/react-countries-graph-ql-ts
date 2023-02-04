import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { countriesStyles, countriesBodyStyles } from "./countries-style";
import { CountriesType } from "../../types/global-types";
import CountriesHead from "../countries-head/countries-head";
import Country from "../country/country";

type ContainerProps = {
  countries: CountriesType;
};
type ItemsState = CountriesType;

type ActiveItemState = {
  index:number | null,
  isActive: boolean
}

function Countries({ countries }: ContainerProps) {
  const [items, setItems] = useState<ItemsState>([]);
  const [activeItem, setActiveItem] = useState<ActiveItemState>({
    index: null,
    isActive: false,
  });
  const [mount, setMount] = useState(true);



  useEffect(() => {
    if (countries) {
      setItems(countries);
    }
  }, [countries]);


  const handelOnClick = (index:number) : void => {
    if (mount) setMount(false);
    const isPrvElement = activeItem.index === index;
    setActiveItem((prv) => ({
      index,
      isActive: isPrvElement ? !prv.isActive : true,
    }));
  };

  const generateActiveState = (index:number) :boolean => {
    if (index === activeItem.index) return activeItem.isActive;

    return false;
  };

  return (
    <Box sx={{ ...countriesStyles }}>
      <CountriesHead />
      <Box sx={{ ...countriesBodyStyles }}>
        {items.map((c, i) => (
          <Country
            key={c.code + i}
            country={c}
            isActive={generateActiveState(i)}
            onClick={() => handelOnClick(i)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Countries;
