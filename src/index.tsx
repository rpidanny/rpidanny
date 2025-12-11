import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./containers/App";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
