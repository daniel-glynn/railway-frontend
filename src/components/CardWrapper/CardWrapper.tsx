import { Card, CardFooter, CardBody, CardHeader } from "@nextui-org/react";
import { CardHeader as Header } from "./CardHeader";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
}: CardWrapperProps): JSX.Element => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardBody> {children}</CardBody>
			<CardFooter>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	);
};
