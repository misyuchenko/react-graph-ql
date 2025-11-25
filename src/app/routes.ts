import LoginView from "@/views/login/LoginView";
import RootView from "@/views/root/RootView";

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
