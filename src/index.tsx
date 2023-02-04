import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ApolloProvider>
);
