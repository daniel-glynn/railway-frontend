import {
	Card,
	DropdownMenu,
	Image,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	Link,
} from "@nextui-org/react";
import moment from "moment";

import { cn } from "../../util";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	date?: Date;
	icon?: string;
	projectId: string;
	serviceId: string;
	environmentId: string;
}

export function ServiceCard({
	title,
	date,
	icon,
	className,
	projectId,
	serviceId,
	environmentId,
	...props
}: ServiceCardProps) {
	return (
		<div className={cn("space-y-1", className)} {...props}>
			<div>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Card isHoverable isPressable style={{ padding: "10px" }}>
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

							<small className="text-default-500">
								Last Updated: {moment(date).fromNow()}
							</small>
						</Card>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<Link
								href={`https://railway.com/project/${projectId}/service/${serviceId}?environmentId=${environmentId}`}
								rel="noopener noreferrer"
								style={{ color: "purple" }}
								target="_blank"
							>
								Check out service in detail
							</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}
