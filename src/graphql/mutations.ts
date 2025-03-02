/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from "@apollo/client";

export const REGISTER_OWNER = gql`
	mutation RegisterOwner(
		$railwayApiKey: String
		$password: String
		$email: String
	) {
		registerOwner(
			railwayApiKey: $railwayApiKey
			password: $password
			email: $email
		) {
			id
			email
			firstName
			lastName
			username
		}
	}
`;

export const LOGIN_OWNER = gql`
	mutation Login($password: String, $email: String) {
		login(password: $password, email: $email) {
			id
			email
			firstName
			lastName
			username
		}
	}
`;

export const RESTART_DEPLOYMENT = gql`
	mutation restartDeployment($id: String) {
		restartDeployment(id: $id)
	}
`;

export const CREATE_PROJECT = gql`
	mutation createProject($name: String, $description: String) {
		createProject(name: $name, description: $description) {
			updatedAt
			description
			name
			id
		}
	}
`;
