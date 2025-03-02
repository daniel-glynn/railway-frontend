/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Divider } from "@nextui-org/react";
import { LATEST_DEPLOYMENTS, RAILWAY_USER_DETAILS } from "../graphql/queries";
import type { RailwayUserData } from "../types";

import { ProjectCard } from "../components/ProjectCard";
import type { LatestDeploymentsData } from "../types/railway-objects";
import { useRouter } from "@tanstack/react-router";
import { OwnerContext } from "../context/OwnerContext/OwnerContext";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
	const router = useRouter();
	const { owner } = useContext(OwnerContext);

	if (!owner.username) {
		router.history.push("/");
	}

	const [getData, { data: railwayUserData }] =
		useLazyQuery<RailwayUserData>(RAILWAY_USER_DETAILS);

	const [getLatestDeployments, { data: deploymentData }] =
		useLazyQuery<LatestDeploymentsData>(LATEST_DEPLOYMENTS);

	const fetchData = async () => {
		await getData({
			defaultOptions: {
				context: {
					headers: {
						"x-hacky-id": owner.id,
					},
				},
			},
		});
	};

	const fetchDeployments = async () => {
		await getLatestDeployments({
			variables: {
				projectId: railwayUserData?.me.projects.edges[0]?.node.id,
			},
			defaultOptions: {
				context: {
					headers: {
						"x-hacky-id": owner.id,
					},
				},
			},
		});
	};

	useEffect(() => {
		if (owner.id) {
			void fetchData();
		}
	}, [owner.id]);

	useEffect(() => {
		if (railwayUserData?.me.name) {
			void fetchDeployments();
		}
	}, [railwayUserData?.me.name]);

	return (
		<>
			<div className="md:block">
				<div className="border-t">
					<div className="bg-background">
						<div className="grid lg:grid-cols-5">
							<Sidebar
								className="lg:block"
								deployments={deploymentData?.deployments.edges || []}
								ownerId={owner.id}
								projectName={
									railwayUserData?.me.projects.edges[0]?.node.name || ""
								}
							/>
							<div className="col-span-3 lg:col-span-4 lg:border-l">
								<div className="h-full px-4 py-6 lg:px-8">
									<div className="flex items-center justify-between">
										<div style={{ paddingTop: "20px" }}>
											<h4 className="font-bold text-xl">
												Railway app homepage
											</h4>
											<p
												className="font-bold text-sm"
												style={{ color: "gray" }}
											>
												All the latest and greatest from your services and
												deploys.
											</p>
										</div>
									</div>
									<Divider className="my-4" />
									<div
										className="relative"
										style={{
											display: "flex",
											flexDirection: "column",
											flexWrap: "wrap",
										}}
									>
										<div className="flex flex-wrap">
											{railwayUserData?.me.projects.edges.map((edge) => (
												<ProjectCard
													key={edge.node.id}
													date={edge.node.updatedAt}
													description={edge.node.description}
													id={edge.node.id}
													servicesCount={edge.node.services?.edges.length}
													title={edge.node.name}
													environmentsCount={
														edge?.node.environments?.edges.length
													}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
