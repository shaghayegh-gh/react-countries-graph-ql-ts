import { DebounceInput } from "react-debounce-input";
import Box from "@mui/material/Box";
import { searchBoxStyle, hintBoxStyle } from "./search-box-style";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { Data } from "../../types/global-types";

type SearchBoxProps = {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<Data>>;
};
type GroupValid = (value: string) => boolean;

const SearchBox = ({ refetch }: SearchBoxProps) => {
  const handelSearchChange = (value: string) => {
    const searchRegex = value.match(/(?<=search:\s+).*?(?=\s+group)/gs);
    const groupRegex = value.match(/(?<=group:\s+).*/gs);
    const searchValue = searchRegex?.length ? searchRegex[0] : "";
    const groupValue = groupRegex?.length ? groupRegex[0] : "";

    if (searchValue && groupValid(groupValue)) {
      const group = groupValue ? groupValue.trim() : "";
      const prm = { filter: { [group]: { regex: searchValue } } };
      refetch(prm);
    }

    if (value === "") {
      refetch();
    }
  };

  const groupValid: GroupValid = (value) => {
    if (value?.length) {
      const groups = ["code", "currency", "continent"];
      const isValidGroup = groups.includes(value.trim());
      return isValidGroup;
    }
    return false;
  };

  return (
    <Box sx={{ mb: 5 }}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={(event) => handelSearchChange(event.target.value)}
        placeholder="[Exp] search: europe  group:continent"
        style={searchBoxStyle}
      />
      <Box sx={{ ...hintBoxStyle }}>
        Group includes: code, currency and continent
      </Box>
    </Box>
  );
};

export default SearchBox;
