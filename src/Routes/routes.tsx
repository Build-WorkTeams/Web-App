import App from "@/App";
import LoginPage from "@/Pages/Auth/LoginPage";
import RegisterPage from "@/Pages/Auth/RegisterPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
]);

export default router;
