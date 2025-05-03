import LoginForm from "@/modules/login";
import { useIsAuthenticated } from "@/stores/auth-store";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginRoute() {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to the previous route (if available) or a default route
    const redirectTo = location.state?.from?.pathname || "/forms";
    return <Navigate to={redirectTo} replace />;
  }

  return <LoginForm />;
}
