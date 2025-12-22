import type { FC } from "react";
import "./App.css";
import router from "./router";
import { RouterProvider } from "react-router";
import { useAuth } from "@/features/auth";

const App: FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading && isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
