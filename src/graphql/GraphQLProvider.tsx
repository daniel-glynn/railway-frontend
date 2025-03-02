import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

const serverHost = import.meta.env["VITE_SERVER_GRAPHQL_URL"] as string;

const link = new HttpLink({
	uri: serverHost,
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	name: "railway-app-interview",
	version: "1.0",
});

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
