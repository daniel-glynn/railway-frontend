import type { ApolloQueryResult, OperationVariables } from "@apollo/client";
import type { ProjectData, TemplateData } from "./../../types/railway-objects";
export type AddServiceModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	ownerId: string;
	templateData: TemplateData | undefined;
	projectId: string;
	environmentId: string;
	refetchProjects: (
		variables?: Partial<OperationVariables>
	) => Promise<ApolloQueryResult<ProjectData>>;
};
