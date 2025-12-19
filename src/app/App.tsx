import type { FC } from "react";
import { useEffect } from "react";
import router from "./router";
import { RouterProvider } from "react-router";
import "./App.css";

import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "@/graphql/auth.queries";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser, clearAuth } from "@/features/auth";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { loading, error, data } = useQuery(WHO_AM_I_QUERY, {
    skip: !isAuthenticated,
  });

  // useEffect(() => {
  //   if (error && isAuthenticated) {
  //     console.error("WhoAmI error:", error);
  //     dispatch(clearAuth());
  //     router.navigate("/login");
  //     return;
  //   }

  //   if (data?.whoAmI && !user) {
  //     console.log("Current user:", data.whoAmI.username);
  //     dispatch(setUser(data.whoAmI));
  //   }

  //   if (!loading) {
  //     if (isAuthenticated && data?.whoAmI) {
  //       router.navigate("/");
  //     } else if (!isAuthenticated) {
  //       router.navigate("/login");
  //     }
  //   }
  // }, [data, error, isAuthenticated, loading, dispatch, user]);

  // if (loading && isAuthenticated) {
  //   return <div>Loading...</div>;
  // }

  return <RouterProvider router={router} />;
};

export default App;
