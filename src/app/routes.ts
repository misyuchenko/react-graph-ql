import LoginView from "@/features/auth/LoginView";
import RootView from "@/features/root/RootView";

const routes = [
  {
    path: "/",
    Component: RootView,
  },
  {
    path: "/login",
    Component: LoginView,
  },
]

export default routes;
