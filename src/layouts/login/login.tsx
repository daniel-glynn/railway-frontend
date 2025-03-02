import { Toaster } from "react-hot-toast";

export const LoginLayout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	return (
		<div
			className="relative flex flex-col min-h-screen"
			style={{ backgroundColor: "#E1E1E1" }}
		>
			<main className="container mx-auto  flex-grow">{children}</main>
			<Toaster />
		</div>
	);
};
