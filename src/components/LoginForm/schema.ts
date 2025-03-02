import { object, string, type InferType } from "yup";

export const loginSchema = object({
	email: string().email("Email is required").required(),
	password: string().min(1, "Password is required").required(),
});

export type LoginSchema = InferType<typeof loginSchema>;
