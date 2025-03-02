import { LoginLayout } from "../layouts/login/login";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
	return (
		<LoginLayout>
			<div className="align-middle justify-items-center pt-20">
				<RegisterForm />
			</div>
		</LoginLayout>
	);
};
