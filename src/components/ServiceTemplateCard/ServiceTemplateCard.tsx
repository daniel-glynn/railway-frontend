import {
	Card,
	DropdownMenu,
	Image,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	Button,
} from "@nextui-org/react";

import { cn } from "../../util";

interface ServiceTemplateCardProps {
	id: string;
	title: string;
	date?: Date;
	icon?: string;
	serializedConfig: JSON;
	description: string;
	disabled: boolean;
	onSubmit: (data: {
		templateServiceId: string;
		serializedConfig: JSON;
	}) => Promise<void>;
}

export function ServiceTemplateCard({
	title,
	icon,
	description,
	id,
	serializedConfig,
	disabled,
	onSubmit,
	...props
}: ServiceTemplateCardProps) {
	return (
		<div className={cn("space-y-1", "w-[200px] p-2")} {...props}>
			<div>
				<Dropdown isDisabled={disabled} placement="bottom-end">
					<DropdownTrigger>
						<Card
							isHoverable={!disabled}
							isPressable={!disabled}
							style={{ padding: "10px", height: "120px" }}
						>
							<div style={{ display: "flex" }}>
								<Image
									alt="service logo"
									height={20}
									radius="sm"
									src={icon}
									width={20}
								/>
								<p
									className="text-tiny uppercase font-bold pl-2"
									style={{ lineHeight: "normal" }}
								>
									{title}
								</p>
							</div>

							<small className="text-default-500">{description}</small>
						</Card>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<Button
								disabled={disabled}
								onClick={() =>
									onSubmit({
										templateServiceId: id,
										serializedConfig,
									})
								}
							>
								You sure this is what you want to add?
							</Button>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}
