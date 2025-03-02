import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App.tsx";
import "./styles/tailwind.css";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<React.Suspense fallback="loading">
				<NextUIProvider>
					<App />
				</NextUIProvider>
			</React.Suspense>
		</React.StrictMode>
	);
}
