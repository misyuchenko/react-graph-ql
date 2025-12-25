import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "../api/queries";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser } from "../model/authSlice";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated: hasToken, user } = useAppSelector(
    (state) => state.auth,
  );

  const { loading, error, data, refetch } = useQuery(WHO_AM_I_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.whoAmI && !user) {
      dispatch(setUser(data.whoAmI));
    }
  }, [data, user, dispatch]);

  const currentUser = user || data?.whoAmI;

  const isAuthenticated = hasToken && !!currentUser;

  const isLoading = hasToken && !currentUser && loading;

  return {
    loading: isLoading,
    error,
    user: currentUser,
    isAuthenticated,
    refetch,
  };
};
