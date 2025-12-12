import type { FC } from "react";
import router from "./router";
import { RouterProvider } from "react-router";
import { authService } from "@/features/auth/auth.service";
import "./App.css";

import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "@/graphql/auth.queries";

const App: FC = () => {
  const hasToken = authService.hasToken();

  const { loading, error, data } = useQuery(WHO_AM_I_QUERY, {
    skip: !hasToken,
  });

  if (loading && hasToken) {
    return <div>Loading...</div>;
  }

  if (error && hasToken) {
    console.error("WhoAmI error:", error);

    authService.clear();
  }

  if (data?.whoAmI) {
    console.log("Current user:", data.whoAmI.username);
    router.navigate("/");
  } else {
    router.navigate("/login");
  }

  return <RouterProvider router={router} />;
};

export default App;
