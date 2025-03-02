import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

import { OwnerContext } from "../../context/OwnerContext/OwnerContext";
import { CardWrapper } from "../CardWrapper";
import { registerSchame, type RegisterSchema } from "./schema";
import { SplitPane } from "../SplitPane";
import railwayImage from "./railway.png";
import { REGISTER_OWNER } from "../../graphql/mutations";
import type {
	RegisterOwnerMutation,
	RegisterOwnerMutationVariables,
} from "../../types";

export const RegisterForm = (): JSX.Element => {
	const { owner, setOwner } = useContext(OwnerContext);
	const router = useRouter();

	useEffect(() => {
		if (owner.id) router.history.push(`/home`);
	}, [owner.id, router.history]);

	const form = useForm<RegisterSchema>({
		resolver: yupResolver(registerSchame),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			railwayApiKey: "",
		},
	});

	const [registerOwner, { loading: registeringOwner }] = useMutation<
		RegisterOwnerMutation,
		RegisterOwnerMutationVariables
	>(REGISTER_OWNER);

	const handleRegisterOwner = async (ownerValues: RegisterSchema) => {
		const result = await registerOwner({
			variables: {
				email: ownerValues.email,
				password: ownerValues.password,
				railwayApiKey: ownerValues.railwayApiKey,
			},
		});

		if (result.errors) {
			toast.error("Error registering your owner");
		}

		if (result.data?.registerOwner.username) {
			toast.success("Success, redirecting...");
			setOwner(result.data.registerOwner);
		}
	};

	return (
		<SplitPane>
			<SplitPane.Left>
				<CardWrapper
					showSocial
					backButtonHref="/"
					backButtonLabel="Already have an account?"
					headerLabel="Create an account."
				>
					<form
						{...form}
						className="space-y-6"
						onSubmit={form.handleSubmit(handleRegisterOwner)}
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
								name="firstName"
								render={({ field }) => (
									<Input
										{...field}
										isRequired
										label="First Name"
										placeholder="John"
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<Input
										{...field}
										isRequired
										label="Last Name"
										placeholder="Doe"
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
							<Controller
								control={form.control}
								name="railwayApiKey"
								render={({ field }) => (
									<Input
										{...field}
										isRequired
										label="Railway API Key"
										placeholder="********"
										type="password"
									/>
								)}
							/>
						</div>
						<Button
							className="w-full"
							color="secondary"
							isLoading={registeringOwner}
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
							Register
						</Button>
					</form>
				</CardWrapper>
			</SplitPane.Left>
			<SplitPane.Right>
				<img alt="image" src={railwayImage} />
			</SplitPane.Right>
		</SplitPane>
	);
};
