import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "./queries/countries-queries";
import Header from "./components/header/header";
import Container from "@mui/material/Container";
import SearchBox from "./components/search-box/search-box";
import { CountriesType, Data } from "./types/global-types";
import Error from "./components/error/error";
import Loading from "./components/loading/loading";
import Countries from "./components/countries/countries";
import Footer from "./components/footer/footer";

function App() {
  const [countries, setCountries] = useState<CountriesType>([]);
  const { data, loading, error, refetch } = useQuery<Data>(LIST_COUNTRIES);

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
        <SearchBox refetch={refetch} />
        {loading && <Loading />}
        {!loading && <Countries countries={countries} />}
      </Container>
      <Footer />
    </>
  );
}

export default App;
