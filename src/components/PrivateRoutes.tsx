import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
