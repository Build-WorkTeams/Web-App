import App from "@/App";
import LoginPage from "@/Pages/Auth/LoginPage";
import RegisterPage from "@/Pages/Auth/RegisterPage";
import PrivateRoutes from "@/components/PrivateRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <PrivateRoutes />,
    path: "/",
    children: [{ index: true, element: <App /> }],
  },
]);

export default router;
