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
									variant="flat"
									onPress={() => {
										onClose();
									}}
								>
									Cancel
								</Button>
								<Button
									color="primary"
									disabled={creatingProject}
									isLoading={creatingProject}
									onPress={async () => {
										await onSubmit(getValues());
									}}
								>
									Add Project
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
