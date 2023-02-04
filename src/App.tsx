import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "./queries/countries-queries";
import Container from "@mui/material/Container";
import { CountriesType,Data } from "./types/global-types";
import Error from "./components/error/error";
import Loading from "./components/loading/loading";

function App() {
  const [countries, setCountries] = useState<CountriesType>([]);
  const { data, loading, error } = useQuery<Data>(LIST_COUNTRIES);

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  if (error) return <Error message={error.message}/>;

  return (
    <Container sx={{ mt: 5, mb: 5, minHeight: "100vh" }}>
      {loading &&  <Loading />}
      {!loading && countries.map((c, i) => <p key={i}>{c.name}</p>)}
    </Container>
  );
}

export default App;
