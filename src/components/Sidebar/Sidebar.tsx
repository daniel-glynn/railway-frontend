import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import {
	Button,
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import {
	type Deployment,
	DeploymentStatus,
	type RestartDeploymentMutation,
} from "../../types/railway-objects";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { RESTART_DEPLOYMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	deployments: Array<{ node: Deployment }>;
	ownerId: string;
	projectName: string;
}

export function Sidebar({
	className,
	deployments,
	ownerId,
	projectName,
}: SidebarProps) {
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

	const getDeploymentStatus = (status: DeploymentStatus) => {
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
		<div className={cn("pb-12", className)}>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Deployments for most recently updated project:{" "}
						<div style={{ fontWeight: 4000, marginTop: "30px" }}>
							{projectName}
						</div>
					</h2>
					<Divider />
					<div className="space-y-1 p-2">
						{deployments?.map((deployment) => (
							<div style={{ paddingBottom: "10px" }}>
								<Dropdown>
									<DropdownTrigger style={{ width: "100px" }}>
										<Button
											variant="bordered"
											style={{
												border: `1px solid ${getDeploymentStatus(deployment.node.status)}`,
												borderRadius: "10px",
												textTransform: "capitalize",
												width: "170px",
												justifyContent: "space-between",
											}}
										>
											{deployment.node.status.toLocaleLowerCase()}{" "}
											<ArrowDownIcon width={"15px"} />
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label="Static Actions">
										<DropdownItem
											key="delete"
											isDisabled={restartingDeployment}
											onClick={() =>
												handleRestartDeployment(deployment.node.id)
											}
										>
											Redeploy
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
