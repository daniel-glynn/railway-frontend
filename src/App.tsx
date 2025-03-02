import { createRouter, RouterProvider } from "@tanstack/react-router";

import { GraphQLProvider } from "./graphql/GraphQLProvider";
import { OwnerProvider } from "./context/OwnerContext/OwnerProvider";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

const App = () => {
	return (
		<GraphQLProvider>
			<OwnerProvider>
				<RouterProvider router={router} />
			</OwnerProvider>
		</GraphQLProvider>
	);
};

export default App;
