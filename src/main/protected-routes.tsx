// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../stores/auth-store.ts";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
