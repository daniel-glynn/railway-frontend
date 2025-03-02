/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from "@apollo/client";

export const RAILWAY_USER_DETAILS = gql`
	query me {
		me {
			email
			name
			projects {
				edges {
					node {
						updatedAt
						description
						name
						id
						environments {
							edges {
								node {
									name
									id
								}
							}
						}
						services {
							edges {
								node {
									name
									id
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const LATEST_DEPLOYMENTS = gql`
	query deployments($projectId: String) {
		deployments(projectId: $projectId) {
			edges {
				node {
					id
					canRedeploy
					canRollback
					deploymentStopped
					environmentId
					projectId
					status
					staticUrl
					id
				}
			}
		}
	}
`;

export const FETCH_PROJECT = gql`
	query project($projectId: String) {
		project(projectId: $projectId) {
			updatedAt
			description
			name
			id
			baseEnvironmentId
			environments {
				edges {
					node {
						name
						id
						variables {
							edges {
								node {
									name
									id
									serviceId
								}
							}
						}
					}
				}
			}
			services {
				edges {
					node {
						name
						id
						icon
						updatedAt
					}
				}
			}
			deployments {
				edges {
					node {
						id
						canRedeploy
						canRollback
						deploymentStopped
						environmentId
						projectId
						status
						staticUrl
						id
						updatedAt
						serviceId
					}
				}
			}
		}
	}
`;
