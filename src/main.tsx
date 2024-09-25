import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import './pwa'  // This import is enough to register the service worker

import App from "./App.tsx";
import "./index.css";
import store from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
		</Provider>
	</StrictMode>
);
