import { object, string, type InferType } from "yup";

export const registerSchame = object({
	email: string().email("Email is required").required(),
	password: string().min(1, "Password is required").required(),
	firstName: string(),
	lastName: string(),
	railwayApiKey: string().required(),
});

export type RegisterSchema = InferType<typeof registerSchame>;
