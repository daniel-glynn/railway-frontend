import {
	Card,
	DropdownMenu,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	Link,
} from "@nextui-org/react";
import moment from "moment";

import {
	DeploymentStatus,
	type RestartDeploymentMutation,
} from "../../types/railway-objects";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { RESTART_DEPLOYMENT } from "../../graphql/mutations";
import { cn } from "../../util";

interface DeploymentCardProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	status: DeploymentStatus;
	date?: Date;
	icon?: string;
	projectId: string;
	serviceId: string;
	environmentId: string;
	ownerId: string;
	serviceName: string;
}

export function DeploymentCard({
	id,
	status,
	date,
	className,
	projectId,
	serviceId,
	environmentId,
	ownerId,
	serviceName,
	...props
}: DeploymentCardProps) {
	const [restartDeployment, { loading: restartingDeployment }] = useMutation<
		RestartDeploymentMutation,
		{ id: string }
	>(RESTART_DEPLOYMENT);

	const handleRestartDeployment = async (deploymentId: string) => {
		const result = await restartDeployment({
			variables: {
				id: deploymentId,
			},
			context: {
				headers: {
					"x-hacky-id": ownerId,
				},
			},
		});

		if (result.errors || !result.data?.restartDeployment) {
			toast.error("Error restarting deployment");
		}

		if (result.data?.restartDeployment) {
			toast.success(
				"Deployment restarting, please check back later for status"
			);
		}
	};
	const getDeploymentStatus = (status: DeploymentStatus): string => {
		switch (status) {
			case DeploymentStatus.CRASHED:
				return "red";
			case DeploymentStatus.FAILED:
				return "red";
			case DeploymentStatus.QUEUED:
				return "orange";
			case DeploymentStatus.SUCCESS:
				return "green";
			default:
				return "black";
		}
	};

	return (
		<div className={cn("space-y-1", className)} {...props}>
			<div>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Card isHoverable isPressable style={{ padding: "10px" }}>
							<p
								className="text-tiny uppercase font-bold pl-2"
								style={{
									lineHeight: "normal",
								}}
							>
								{serviceName}
							</p>
							<p
								className="text-tiny uppercase font-bold pl-2"
								style={{
									lineHeight: "normal",
									color: getDeploymentStatus(status),
								}}
							>
								{status}
							</p>

							<small className="text-default-500">
								Last Updated: {moment(date).fromNow()}
							</small>
						</Card>
					</DropdownTrigger>
					<DropdownMenu>
						<DropdownItem
							key="delete"
							isDisabled={restartingDeployment}
							onClick={() => handleRestartDeployment(id)}
						>
							<p>Redeploy</p>
						</DropdownItem>
						<DropdownItem key="profile">
							<Link
								href={`https://railway.com/project/${projectId}/service/${serviceId}?environmentId=${environmentId}&id=${id}`}
								rel="noopener noreferrer"
								style={{ color: "black", fontSize: "14px" }}
								target="_blank"
							>
								<p>Check out deployment in detail</p>
							</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}
