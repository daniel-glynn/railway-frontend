/* eslint-disable no-use-before-define */
import { Children, type ReactNode, isValidElement } from "react";

import "./SplitPane.scss";

export const SplitPane = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	Children.forEach(children, (child) => {
		if (
			isValidElement(child) &&
			child.type !== LeftPane &&
			child.type !== RightPane
		) {
			throw new Error(
				"Only `SplitPane.Left` and `SplitPane.Right` are allowed as children within `SplitPane`"
			);
		}
	});

	return <div className={"split-pane"}>{children}</div>;
};

const LeftPane = ({ children }: { children: ReactNode }) => (
	<div className={"split-pane__left"}>{children}</div>
);

const RightPane = ({ children }: { children: ReactNode }) => (
	<div className={"split-pane__right"}>{children}</div>
);

SplitPane.Left = LeftPane;
SplitPane.Right = RightPane;
