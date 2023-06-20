import LoginForm from "../components/LogInForm";
import { AuthContextWrapper } from "../context/auth.context";

function LoginPage() {
  return (
    <AuthContextWrapper>
      <LoginForm />
    </AuthContextWrapper>
  );
}

export default LoginPage;
