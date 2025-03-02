import { createContext } from "react";
import type { Owner } from "../../types";

export type OwnerContextType = {
	owner: Owner;
	setOwner: (owner: Owner) => void;
};

const defaultOwnerContext = {
	owner: {} as Owner,
	setOwner: () => {},
};

export const OwnerContext =
	createContext<OwnerContextType>(defaultOwnerContext);
