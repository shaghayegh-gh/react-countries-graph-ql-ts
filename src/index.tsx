import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <CssBaseline>
    <App />
  </CssBaseline>
);
