import { useRouter } from "@tanstack/react-router";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({ children }: LoginButtonProps) => {
	const router = useRouter();
	const onClick = () => {
		router.history.push("/auth/login");
	};

	return (
		<span className="cursor-pointer" onClick={onClick}>
			{children}
		</span>
	);
};
