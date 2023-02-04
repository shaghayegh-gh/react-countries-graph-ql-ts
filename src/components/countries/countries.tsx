import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import LinearProgress from "@mui/material/LinearProgress";
import useChunk from "../../hooks/useChunk";
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
  index: number | null;
  isActive: boolean;
};
type DataState = CountriesType[];

type HandelOnClick = (i: number) => void;

type GenerateActiveState = (i: number) => boolean;

type LadMoreDate = () => void;

function Countries({ countries }: ContainerProps) {
  const REACT_APP_CHUNK_SIZE = process.env.REACT_APP_CHUNK_SIZE || "";
  const chunkSize = parseInt(REACT_APP_CHUNK_SIZE, 10);
  const pages = useChunk(countries, chunkSize);
  const [items, setItems] = useState<ItemsState>([]);
  const [activeItem, setActiveItem] = useState<ActiveItemState>({
    index: null,
    isActive: false,
  });
  const [mount, setMount] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<DataState>([]);
  const [isMorePage, setMorePage] = useState(true);

  useEffect(() => {
    const length = countries.length;
    if (pages && length > chunkSize) {
      setData(pages);
    }

    if (0 < length && length <= chunkSize) {
      setItems(countries);
      setMorePage(false);
    }
    setMount(true);
    // eslint-disable-next-line
  }, [countries]);

  useEffect(() => {
    if (data.length) {
      const items = data[page];
      setItems(items);
    }
    // eslint-disable-next-line
  }, [data]);

  const handelOnClick: HandelOnClick = (index) => {
    if (mount) setMount(false);
    const isPrvElement = activeItem.index === index;
    setActiveItem((prv) => ({
      index,
      isActive: isPrvElement ? !prv.isActive : true,
    }));
  };

  const generateActiveState: GenerateActiveState = (index) => {
    if (index === activeItem.index) return activeItem.isActive;

    return false;
  };

  const loadMoreDate: LadMoreDate = () => {
    const totalPage = data.length;
    const nextPage = page + 1;
    if (nextPage < totalPage) {
      const newPage = data[page + 1];
      setPage((prv) => prv + 1);
      setItems((prv) => [...prv, ...newPage]);
    }

    if (nextPage === totalPage) {
      setMorePage(false);
    }
  };

  return (
    <Box sx={{ ...countriesStyles }}>
      <CountriesHead />
      <Box sx={{ ...countriesBodyStyles }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreDate}
          hasMore={isMorePage}
          loader={<LinearProgress key={0} />}
          useWindow={false}
        >
          {items.map((c, i) => (
            <Country
              key={c.code + i}
              country={c}
              isActive={generateActiveState(i)}
              onClick={() => handelOnClick(i)}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}

export default Countries;
