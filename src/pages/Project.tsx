import { useContext, useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

import { DefaultLayout } from "../layouts/default/default";
import { useRouter } from "@tanstack/react-router";
import { useLazyQuery } from "@apollo/client";
import { FETCH_PROJECT, FETCH_TEMPLATES } from "../graphql/queries";
import type { ProjectData, TemplateData } from "../types/railway-objects";
import {
	Divider,
	Link,
	Spinner,
	Tabs,
	Tab,
	Button,
	useDisclosure,
} from "@nextui-org/react";

import { DeploymentCard } from "../components/DeploymentCard";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import { cn } from "../util";
import { OwnerContext } from "../context/OwnerContext/OwnerContext";
import { AddServiceModal } from "../components/AddServiceModal";

export const ProjectPage = () => {
	const [projectData, setProjectData] = useState({} as ProjectData);
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const router = useRouter();
	const slug = window.location.pathname.split("/")[2];
	const { owner } = useContext(OwnerContext);

	const [getProject, { loading: loadingProject, refetch }] =
		useLazyQuery<ProjectData>(FETCH_PROJECT, {
			notifyOnNetworkStatusChange: true,
			onCompleted: (data) => {
				setProjectData(data);
			},
		});

	const [getRecommendedTemplates, { data: templateData }] =
		useLazyQuery<TemplateData>(FETCH_TEMPLATES);

	useEffect(() => {
		async function startFetching() {
			await getProject({
				variables: {
					projectId: slug,
				},
				defaultOptions: {
					context: {
						headers: {
							"x-hacky-id": owner.id,
						},
					},
				},
			});

			await getRecommendedTemplates({
				defaultOptions: {
					context: {
						headers: {
							"x-hacky-id": owner.id,
						},
					},
				},
			});
		}

		if (owner.id) {
			void startFetching();
		}
	}, [owner.id]);

	return (
		<DefaultLayout>
			<div className="h-full">
				<Breadcrumbs className="py-4">
					<BreadcrumbItem
						onClick={() => {
							router.history.push(`/home`);
						}}
					>
						Home
					</BreadcrumbItem>
					<BreadcrumbItem>{projectData?.project?.name}</BreadcrumbItem>
				</Breadcrumbs>
				<div
					className="flex flex-1 flex-col gap-4 px-4 py-10"
					style={{
						backgroundColor: "#fff",
						borderRadius: "10px",
						padding: "10px",
					}}
				>
					{loadingProject ? (
						<Spinner />
					) : (
						<section className="font-poppins">
							<h4 className="font-bold text-xl">
								Latest & greatest from {projectData?.project?.name}
							</h4>
							<p className="mb-4 text-sm">
								{projectData?.project?.description}
							</p>
							<Tabs color={"secondary"} radius="full">
								<Tab key="services" title="Services">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<h2 className="text-2xl font-semibold tracking-tight">
												Services
											</h2>
											<Button
												color="secondary"
												style={{ color: "white" }}
												onPress={onOpen}
											>
												Add a recommended service
											</Button>
										</div>
									</div>
									<Divider className="my-4" />
									<div className="relative">
										<div className="flex space-x-4 pb-4">
											{projectData?.project?.services.edges.map((service) => (
												<ServiceCard
													key={service.node.id}
													className="w-[200px]"
													date={service.node.updatedAt}
													ownerId={owner.id}
													projectId={projectData.project.id}
													serviceId={service.node.id}
													setProjectData={setProjectData}
													title={service.node.name}
													environmentId={
														projectData?.project?.environments.edges[0]?.node
															.id || ""
													}
													icon={
														service.node.icon ||
														"https://play-lh.googleusercontent.com/m3oqSZCwmitiZ-Im-CQu_rqT5eLHilOp5IudBynv3COJUumFzuQaP2dgTDxRL_03f4x2"
													}
												/>
											))}
										</div>
									</div>
								</Tab>
								<Tab key="environments" title="Environments & Variables">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<h2 className="text-2xl font-semibold tracking-tight">
												Environments
											</h2>
										</div>
									</div>
									<Divider className="my-4" />
									<div className="relative">
										<div className="flex space-x-4 pb-4">
											{projectData?.project?.environments.edges.map(
												(environment) => (
													<>
														<p className="font-bold">{environment.node.name}</p>
														<div>
															{environment.node.variables.edges.map(
																(environment) => (
																	<div className={cn("space-y-1", "w-[200px]")}>
																		<div style={{ display: "flex" }}>
																			<Link
																				href={`https://railway.com/project/${projectData.project.id}/service/${environment.node.serviceId}/variables?environmentId=${environment.node.id}`}
																				rel="noopener noreferrer"
																				target="_blank"
																				style={{
																					color: "black",
																					fontSize: "14px",
																				}}
																			>
																				{environment.node.name}
																			</Link>
																		</div>
																	</div>
																)
															)}
														</div>
													</>
												)
											)}
										</div>
									</div>
								</Tab>
								<Tab key="deployments" title="Deployments">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<h2 className="text-2xl font-semibold tracking-tight">
												Latest Deployments
											</h2>
										</div>
									</div>
									<Divider className="my-4" />
									<div className="relative">
										<div className="flex space-x-4 pb-4">
											{projectData?.project?.deployments.edges.map(
												(deployment) => (
													<DeploymentCard
														key={deployment.node.id}
														className="w-[200px]"
														date={deployment.node.updatedAt}
														id={deployment.node.id}
														ownerId={owner.id}
														projectId={projectData.project.id}
														serviceId={deployment.node.serviceId}
														status={deployment.node.status}
														environmentId={
															projectData?.project?.environments.edges[0]?.node
																.id || ""
														}
														serviceName={
															projectData.project.services.edges.find(
																(s) => s.node.id === deployment.node.serviceId
															)?.node.name || ""
														}
													/>
												)
											)}
										</div>
									</div>
								</Tab>
							</Tabs>
						</section>
					)}
				</div>
			</div>
			<AddServiceModal
				isOpen={isOpen}
				ownerId={owner.id}
				projectId={slug || ""}
				refetchProjects={refetch}
				templateData={templateData}
				environmentId={
					projectData?.project?.environments.edges[0]?.node.id || "production"
				}
				onClose={onClose}
				onOpenChange={onOpenChange}
			/>
		</DefaultLayout>
	);
};
