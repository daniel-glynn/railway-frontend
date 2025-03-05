import { useContext } from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarItem,
	NavbarBrand,
} from "@nextui-org/navbar";
import {
	DropdownMenu,
	DropdownItem,
	Button,
	useDisclosure,
	Dropdown,
	DropdownTrigger,
	Avatar,
} from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useRouter } from "@tanstack/react-router";

import { AddProjectModal } from "../AddProjectModal";
import { OwnerContext } from "../../context/OwnerContext/OwnerContext";
import type { Owner } from "../../types";

export const Navbar = (): JSX.Element => {
	const { owner, setOwner } = useContext(OwnerContext);
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const router = useRouter();
	const location = useLocation();

	const logOut = () => {
		setOwner({} as Owner);
		router.history.push("/");
	};

	return (
		<>
			<NextUINavbar
				isBordered
				className="bg-sunset-purple"
				maxWidth="2xl"
				position="sticky"
				style={{ zIndex: 100 }}
			>
				<NavbarBrand>
					<Link href="/" style={{ display: "flex" }}>
						<BanknotesIcon
							style={{ paddingRight: "10px", color: "white" }}
							width={"30px"}
						/>
						<p className="text-inherit" style={{ color: "white" }}>
							Railway Interview App
						</p>
					</Link>
				</NavbarBrand>
				{owner.username && (
					<>
						<NavbarContent justify="center">
							<NavbarContent className="hidden sm:flex gap-3">
								<NavbarItem isActive={location.pathname === "/home"}>
									<Link color="foreground" style={{ color: "white" }}>
										Home
									</Link>
								</NavbarItem>
							</NavbarContent>
						</NavbarContent>

						<NavbarContent as="div" className="items-center" justify="end">
							<>
								<Button
									color="secondary"
									style={{ color: "white" }}
									onPress={onOpen}
								>
									Start a new project
								</Button>
								<Dropdown placement="bottom-end">
									<DropdownTrigger>
										<Avatar
											isBordered
											as="button"
											className="transition-transform"
											color="secondary"
											size="sm"
											src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
										/>
									</DropdownTrigger>
									<DropdownMenu aria-label="Profile Actions" variant="flat">
										<DropdownItem key="profile" className="h-14 gap-2">
											<p className="font-semibold">Signed in as</p>
											<p className="font-semibold">{owner.email}</p>
										</DropdownItem>
										<DropdownItem key="logout" color="danger" onClick={logOut}>
											Log Out
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</>
						</NavbarContent>
					</>
				)}
			</NextUINavbar>
			<Toaster />
			<AddProjectModal
				isOpen={isOpen}
				ownerId={owner.id}
				onClose={onClose}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};
