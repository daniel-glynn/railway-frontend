import { Button, Link } from "@nextui-org/react";

interface BackButtonProps {
	href: string;
	label: string;
}

export const BackButton = ({ href, label }: BackButtonProps): JSX.Element => {
	return (
		<Button
			as={Link}
			className="font-normal w-full text-col text-primary-50"
			href={href}
			size="lg"
			variant="light"
		>
			<Link href={href}>{label}</Link>
		</Button>
	);
};
