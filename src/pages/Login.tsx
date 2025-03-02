import { LoginLayout } from "../layouts/login/login";
import { LoginForm } from "../components/LoginForm";
export const Login = () => {
	return (
		<LoginLayout>
			<div className="align-middle justify-items-center pt-20">
				<LoginForm />
			</div>
		</LoginLayout>
	);
};
