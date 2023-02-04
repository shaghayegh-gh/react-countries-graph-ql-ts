import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "./queries/countries-queries";
import Header from "./components/header/header";
import Container from "@mui/material/Container";
import { CountriesType, Data } from "./types/global-types";
import Error from "./components/error/error";
import Loading from "./components/loading/loading";
import Countries from "./components/countries/countries";

function App() {
  const [countries, setCountries] = useState<CountriesType>([]);
  const { data, loading, error } = useQuery<Data>(LIST_COUNTRIES);

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  if (error) return <Error message={error.message} />;

  return (
    <>
      <Header />
      <Container sx={{ mt: 5, mb: 5, minHeight: "100vh" }}>
        {loading && <Loading />}
        {!loading && <Countries countries={countries} />}
      </Container>
    </>
  );
}

export default App;
