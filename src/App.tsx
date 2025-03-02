import { RouterProvider, type createRouter } from "@tanstack/react-router";

import { GraphQLProvider } from "./graphql/GraphQLProvider";
import { OwnerProvider } from "./context/OwnerContext/OwnerProvider";

type AppProps = {
	router: ReturnType<typeof createRouter>;
};

const App = ({ router }: AppProps) => {
	return (
		<GraphQLProvider>
			<OwnerProvider>
				<RouterProvider router={router} />
			</OwnerProvider>
		</GraphQLProvider>
	);
};

export default App;
