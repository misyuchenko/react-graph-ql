import { useWhoAmIQuery } from "../api/authApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser } from "../model/authSlice";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated: hasToken, user } = useAppSelector(
    (state) => state.auth,
  );

  const { data, isLoading, error, refetch } = useWhoAmIQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data && !user) {
      dispatch(setUser(data));
    }
  }, [data, user, dispatch]);

  const currentUser = user || data;

  const isAuthenticated = hasToken && !!currentUser;

  const loading = hasToken && !currentUser && isLoading;

  return {
    loading,
    error,
    user: currentUser,
    isAuthenticated,
    refetch,
  };
};
