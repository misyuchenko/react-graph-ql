import { LoginView } from "@/features/auth";
import RootView from "@/features/root/RootView";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <ProtectedRoute><RootView /></ProtectedRoute>,
  },
  {
    path: "/login",
    Component: LoginView,
  },
];

export default routes;
