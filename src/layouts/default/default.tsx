import { Head } from "./head";

import { Footer } from "./footer";

export const DefaultLayout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	return (
		<div
			className="relative flex flex-col min-h-screen"
			style={{ backgroundColor: "#E1E1E1" }}
		>
			<Head />
			<main className="container mx-auto  flex-grow">{children}</main>
		</div>
	);
};
