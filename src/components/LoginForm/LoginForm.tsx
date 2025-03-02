import { useContext, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CardWrapper } from "../CardWrapper";
import { loginSchema, type LoginSchema } from "./schema";
import { OwnerContext } from "../../context/OwnerContext/OwnerContext";
import { useMutation } from "@apollo/client";
import { useRouter } from "@tanstack/react-router";
import { LOGIN_OWNER } from "../../graphql/mutations";
import type {
	LoginOwnerMutation,
	LoginOwnerMutationVariables,
} from "../../types";
import toast from "react-hot-toast";

export const LoginForm = (): JSX.Element => {
	const { setOwner, owner } = useContext(OwnerContext);
	const router = useRouter();

	useEffect(() => {
		if (owner.username) {
			router.history.push(`/home`);
		}
	}, [owner, router.history]);

	const form = useForm<LoginSchema>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [loginOwner, { loading: loggingInUser }] = useMutation<
		LoginOwnerMutation,
		LoginOwnerMutationVariables
	>(LOGIN_OWNER);

	const handleLoginOwner = async (deets: LoginSchema) => {
		const result = await loginOwner({
			variables: {
				email: deets.email,
				password: deets.password,
			},
		});

		if (result.errors || !result.data?.login) {
			toast.error("Error logging in");
		}

		if (result.data?.login.username) {
			toast.success("Success, redirecting...");
			setOwner(result.data.login);
		}
	};

	return (
		<CardWrapper
			showSocial
			backButtonHref="/auth/register"
			backButtonLabel="Don't have an account?"
			headerLabel="Excuse the mess."
		>
			<form
				{...form}
				className="space-y-6"
				onSubmit={form.handleSubmit(handleLoginOwner)}
			>
				<div className="space-y-4">
					<Controller
						control={form.control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								label="Email"
								placeholder="john.doe@example.com"
								type="email"
							/>
						)}
					/>
					<Controller
						control={form.control}
						name="password"
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								label="Password"
								placeholder="********"
								type="password"
							/>
						)}
					/>
				</div>
				<Button
					className="w-full"
					color="secondary"
					isLoading={loggingInUser}
					type="submit"
					spinner={
						<svg
							className="animate-spin h-5 w-5 text-current"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								fill="currentColor"
							/>
						</svg>
					}
				>
					Login
				</Button>
			</form>
		</CardWrapper>
	);
};
