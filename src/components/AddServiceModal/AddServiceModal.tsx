import { useState } from "react";
import {
	Divider,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

import type { AddServiceModalProps } from "./AddServiceModal.types";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE } from "../../graphql/mutations";
import type { CreateServiceMutation } from "../../types/railway-objects";
import { ServiceTemplateCard } from "../ServiceTemplateCard";

export const AddServiceModal = ({
	isOpen,
	onClose,
	onOpenChange,
	ownerId,
	templateData,
	projectId,
	environmentId,
	refetchProjects,
}: AddServiceModalProps): JSX.Element => {
	const [feedback, setFeedback] = useState("");
	const [loading, setLoading] = useState(false);

	const [createService] = useMutation<
		CreateServiceMutation,
		{
			projectId: string;
			templateServiceId: string;
			environmentId: string;
			serializedConfig: JSON;
		}
	>(CREATE_SERVICE);

	const onSubmit = async (data: {
		templateServiceId: string;
		serializedConfig: JSON;
	}) => {
		setLoading(true);
		setFeedback("Creating service....");
		await createService({
			variables: {
				projectId,
				templateServiceId: data.templateServiceId,
				environmentId: environmentId,
				serializedConfig: data.serializedConfig,
			},
			context: {
				headers: {
					"x-hacky-id": ownerId,
				},
			},
		});
		setFeedback("Fetching new service....");

		// sometimes can be a delay grabbing projects, and don't want to get into querying for workflows
		// eslint-disable-next-line no-promise-executor-return
		await new Promise((r) => setTimeout(r, 3000));

		await refetchProjects();
		setLoading(false);

		onClose();
	};

	return (
		<Modal
			backdrop="opaque"
			className="font-poppins"
			isOpen={isOpen}
			radius="lg"
			scrollBehavior="normal"
			size="4xl"
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
										Add a recommended service
									</h4>
								</div>
								<Divider className="my-4" />
							</ModalHeader>
							<ModalBody
								style={{
									overflow: "scroll",
								}}
							>
								<div className="relative">
									{feedback && <p>{feedback}</p>}
									<div
										className="flex flex-wrap space-x-4 pb-4 justify-center align-middle"
										style={{ maxHeight: "500px" }}
									>
										{templateData?.templates.edges.map((template) => (
											<ServiceTemplateCard
												key={template.node.id}
												description={template.node.description}
												disabled={loading}
												icon={template.node.image}
												id={template.node.id}
												serializedConfig={template.node.serializedConfig}
												title={template.node.name}
												onSubmit={onSubmit}
											/>
										))}
									</div>
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
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
