interface CardHeaderProps {
	label: string;
}

export const CardHeader = ({ label }: CardHeaderProps): JSX.Element => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center font-poppins">
			<h1 className="text-3xl font-semibold">Railway Interview</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	);
};
