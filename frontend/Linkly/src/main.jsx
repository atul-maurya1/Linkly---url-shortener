import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider.jsx";
import DashboardContextProvider from "./context/DashboardConextProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		
			<UserContextProvider>
				<DashboardContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				</DashboardContextProvider>
			</UserContextProvider>
		
	</StrictMode>,
);
