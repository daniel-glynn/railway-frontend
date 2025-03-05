import {
	Divider,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Textarea,
} from "@nextui-org/react";

import type { AddProjectModalProps } from "./AddProjectModal.types";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../../graphql/mutations";
import type { CreateProjectMutation } from "../../types/railway-objects";
import toast from "react-hot-toast";
import { useRouter } from "@tanstack/react-router";

export const AddProjectModal = ({
	isOpen,
	onClose,
	onOpenChange,
	ownerId,
}: AddProjectModalProps): JSX.Element => {
	const router = useRouter();

	const { control, getValues } = useForm({
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const [createProject, { loading: creatingProject }] = useMutation<
		CreateProjectMutation,
		{ name: string; description: string }
	>(CREATE_PROJECT);

	const onSubmit = async (data: { name: string; description: string }) => {
		const project = await createProject({
			variables: {
				name: data.name,
				description: data.description,
			},
			context: {
				headers: {
					"x-hacky-id": ownerId,
				},
			},
		});
		if (project.errors) {
			toast.error("Error creating new project");
		}

		if (project.data?.createProject.id) {
			toast.success("Navigating to succesfully created project!");
			onClose();
			router.history.push(`/project/${project.data?.createProject.id}`);
		}
	};

	return (
		<Modal
			backdrop="opaque"
			className="font-poppins"
			isOpen={isOpen}
			radius="lg"
			size="3xl"
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<form>
							<ModalHeader
								className="flex flex-col gap-1"
								style={{ paddingBottom: "0px" }}
							>
								<div className="flex gap-1">
									<h4 className="text-medium font-medium">
										Add another project
									</h4>
								</div>
								<p className="text-small text-base">
									Give a name and description
								</p>
								<Divider className="my-4" />
							</ModalHeader>
							<ModalBody style={{ paddingTop: "0px" }}>
								<div style={{ gap: "10px", display: "grid" }}>
									<>
										<Controller
											control={control}
											name="name"
											render={({ field: { onChange } }) => (
												<Textarea
													isRequired
													label="Name"
													placeholder="Give a name to your new project"
													type="text"
													onChange={onChange}
												/>
											)}
										/>
										<Divider className="my-4" />

										<Controller
											control={control}
											name="description"
											render={({ field: { onChange } }) => (
												<Textarea
													isRequired
													label="Description"
													placeholder="Description for your project"
													type="text"
													onChange={onChange}
												/>
											)}
										/>
									</>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									isDisabled={creatingProject}
									variant="flat"
									onPress={() => {
										onClose();
									}}
								>
									Cancel
								</Button>
								<Button
									color="primary"
									isLoading={creatingProject}
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
									onPress={async () => {
										await onSubmit(getValues());
									}}
								>
									{creatingProject ? "Adding Project..." : "Add Project"}
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
