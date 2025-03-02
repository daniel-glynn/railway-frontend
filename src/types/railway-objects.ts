export type Owner = {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
};

export type RegisterOwnerMutation = {
	registerOwner: {
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		id: string;
	};
};

export type RegisterOwnerMutationVariables = {
	email: string;
	password: string;
	railwayApiKey: string;
};

export type LoginOwnerMutation = {
	login: {
		id: string;
		firstName: string;
		lastName: string;
		username: string;
		email: string;
	};
};

export type LoginOwnerMutationVariables = {
	email: string;
	password: string;
};

export type RailwayUserData = {
	me: {
		email: string;
		name: string;
		projects: {
			edges: Array<{
				node: {
					description: string;
					id: string;
					name: string;
					updatedAt: Date;
					environments: {
						edges: Array<{
							node: {
								name: string;
								id: string;
							};
						}>;
					};
					services: {
						edges: Array<{
							node: {
								name: string;
								id: string;
							};
						}>;
					};
				};
			}>;
		};
	};
};

export enum DeploymentStatus {
	BUILDING = "BUILDING",
	CRASHED = "CRASHED",
	DEPLOYING = "DEPLOYING",
	FAILED = "FAILED",
	INITIALIZING = "INITIALIZING",
	NEEDS_APPROVAL = "NEEDS_APPROVAL",
	QUEUED = "QUEUED",
	REMOVED = "REMOVED",
	REMOVING = "REMOVING",
	SKIPPED = "SKIPPED",
	SLEEPING = "SLEEPING",
	SUCCESS = "SUCCESS",
	WAITING = "WAITING",
}

export type Deployment = {
	canRedeploy: boolean;
	canRollback: boolean;
	deploymentStopped: boolean;
	environmentId: string;
	projectId: string;
	status: DeploymentStatus;
	url: string;
	staticUrl: string;
	id: string;
};

export type LatestDeploymentsData = {
	deployments: {
		edges: Array<{
			node: Deployment;
		}>;
	};
};

export type RestartDeploymentMutation = {
	restartDeployment: boolean;
};

export type CreateProjectMutation = {
	createProject: {
		updatedAt: Date;
		description: string;
		name: string;
		id: string;
	};
};

export type ProjectData = {
	project: {
		description: string;
		id: string;
		name: string;
		updatedAt: Date;
		baseEnvironmentId: string;
		environments: {
			edges: Array<{
				node: {
					name: string;
					id: string;
					variables: {
						edges: Array<{
							node: {
								name: string;
								id: string;
								serviceId: string;
							};
						}>;
					};
				};
			}>;
		};
		services: {
			edges: Array<{
				node: {
					name: string;
					id: string;
					updatedAt: Date;
					icon?: string;
				};
			}>;
		};
		deployments: {
			edges: Array<{
				node: {
					name: string;
					id: string;
					updatedAt: Date;
					status: DeploymentStatus;
					serviceId: string;
				};
			}>;
		};
	};
};
