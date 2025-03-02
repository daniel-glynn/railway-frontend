import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

function ensureCorrectUri(input: string) {
	const defaultOrigin = window.location.origin;
	return new URL(input, defaultOrigin).toString();
}
const serverHost = import.meta.env["VITE_SERVER_GRAPHQL_URL"] as string;

const link = new HttpLink({
	uri: ensureCorrectUri(serverHost || ""),
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
