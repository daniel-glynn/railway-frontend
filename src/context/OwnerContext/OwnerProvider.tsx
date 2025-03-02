import { type ReactNode, useState } from "react";

import type { Owner } from "../../types";
import { OwnerContext } from "./OwnerContext";

type OwnerProviderProps = {
	children: ReactNode;
};

export const OwnerProvider = ({ children }: OwnerProviderProps) => {
	const [owner, setOwner] = useState({} as Owner);

	return (
		<OwnerContext.Provider
			value={{
				owner,
				setOwner,
			}}
		>
			{children}
		</OwnerContext.Provider>
	);
};
