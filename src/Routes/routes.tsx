import App from "@/App";
import LoginPage from "@/Pages/Auth/LoginPage";
import RegisterPage from "@/Pages/Auth/RegisterPage";
import PasswordReset from "@/Pages/Auth/PasswordReset";
import Verification from "@/Pages/Auth/Verification";
import PrivateRoutes from "@/components/PrivateRoutes";
import { createBrowserRouter } from "react-router-dom";
import ChangePassword from "@/Pages/Auth/ChangePassword";

const router = createBrowserRouter([
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/reset", element: <PasswordReset /> },
  { path: "/verify", element: <Verification /> },
  { path: "changePassword", element: <ChangePassword /> },
  {
    element: <PrivateRoutes />,
    path: "/",
    children: [{ index: true, element: <App /> }],
  },
]);

export default router;
