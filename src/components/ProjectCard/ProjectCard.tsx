import {
	Card as NextCard,
	CardBody,
	Image,
	CardHeader,
	Divider,
	CardFooter,
} from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "@tanstack/react-router";

export const ProjectCard = ({
	title,
	date,
	description,
	id,
	environmentsCount,
	servicesCount,
}: {
	title: string;
	date: Date;
	description: string;
	id: string;
	environmentsCount: number;
	servicesCount: number;
}) => {
	const router = useRouter();

	return (
		<NextCard
			isPressable
			className="max-w-[400px] m-10"
			onPress={() => {
				router.history.push(`/project/${id}`);
			}}
		>
			<CardHeader className="flex gap-3">
				<Image
					alt="heroui logo"
					height={40}
					radius="sm"
					src="https://shop.railway.app/cdn/shop/files/railway_1024x.png?v=1622657842"
					width={40}
				/>
				<div className="flex flex-col">
					<p className="text-md">{title}</p>
					<small className="text-default-500">
						Last updated: {moment(date).fromNow()}
					</small>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{description}</p>
			</CardBody>
			<Divider />
			<CardFooter>
				<div className="flex flex-col">
					<small className="text-default-500">
						Running {servicesCount} service
						{servicesCount > 1 && "s"}
					</small>
					<small className="text-default-500">
						Running {environmentsCount} environment
						{environmentsCount > 1 && "s"}
					</small>
				</div>
			</CardFooter>
		</NextCard>
	);
};
