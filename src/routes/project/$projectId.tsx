import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "../../pages/Project";

export const Route = createFileRoute("/project/$projectId")({
	component: ProjectPage,
});
