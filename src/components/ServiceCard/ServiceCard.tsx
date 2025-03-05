import {
	Card,
	DropdownMenu,
	Image,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	Link,
	Spinner,
} from "@nextui-org/react";
import moment from "moment";
import { useMutation } from "@apollo/client";

import { cn } from "../../util";
import toast from "react-hot-toast";
import { DELETE_SERVICE } from "../../graphql/mutations";
import type { ProjectData } from "../../types/railway-objects";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	date?: Date;
	icon?: string;
	projectId: string;
	setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
	serviceId: string;
	environmentId: string;
	ownerId: string;
}

export function ServiceCard({
	title,
	date,
	icon,
	className,
	projectId,
	serviceId,
	environmentId,
	ownerId,
	setProjectData,
	...props
}: ServiceCardProps) {
	const [deleteService, { loading: deletingService }] = useMutation<
		{ deleteService: boolean },
		{ id: string }
	>(DELETE_SERVICE);

	const handleDeleteService = async (id: string) => {
		const result = await deleteService({
			variables: {
				id: id,
			},
			context: {
				headers: {
					"x-hacky-id": ownerId,
				},
			},
		});

		if (result.errors || !result.data?.deleteService) {
			toast.error("Error deleting service");
		}

		if (result.data?.deleteService) {
			toast.success("Service deletion triggered");
			setProjectData((previousState) => {
				const filteredData = previousState.project.services.edges.filter(
					(s) => s.node.id !== id
				);
				return {
					project: {
						...previousState.project,
						services: { edges: filteredData },
					},
				};
			});
		}
	};

	return (
		<div className={cn("space-y-1", className)} {...props}>
			<div>
				<Dropdown isDisabled={deletingService} placement="bottom-end">
					<DropdownTrigger>
						<Card isHoverable isPressable style={{ padding: "10px" }}>
							{deletingService ? (
								<Spinner style={{ width: "130px", height: "90px" }}></Spinner>
							) : (
								<>
									<div style={{ display: "flex" }}>
										<Image
											alt="service logo"
											height={20}
											radius="sm"
											src={icon}
											width={20}
										/>
										<p
											className="text-tiny uppercase font-bold pl-2"
											style={{ lineHeight: "normal" }}
										>
											{title}
										</p>
									</div>

									<small className="text-default-500">
										Last Updated: {moment(date).fromNow()}
									</small>
								</>
							)}
						</Card>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions">
						<DropdownItem
							key="delete"
							onClick={() => handleDeleteService(serviceId)}
						>
							<p>Delete</p>
						</DropdownItem>
						<DropdownItem key="profile">
							<Link
								href={`https://railway.com/project/${projectId}/service/${serviceId}?environmentId=${environmentId}`}
								rel="noopener noreferrer"
								style={{ color: "purple", fontSize: "14px" }}
								target="_blank"
							>
								Check out service in detail
							</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}
