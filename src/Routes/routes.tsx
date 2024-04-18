import App from "@/App";
import LoginPage from "@/Pages/Auth/LoginPage";
import RegisterPage from "@/Pages/Auth/RegisterPage";
import PasswordReset from "@/Pages/PasswordReset";
import Verification from "@/Pages/Verification";
import PrivateRoutes from "@/components/PrivateRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/reset", element: <PasswordReset /> },
  { path: "verify", element: <Verification /> },
  {
    element: <PrivateRoutes />,
    path: "/",
    children: [{ index: true, element: <App /> }],
  },
]);

export default router;
