import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "../api/queries";
import { useAppSelector } from "@/app/hooks";

export const useAuth = () => {
  const { isAuthenticated: hasToken, user } = useAppSelector(
    (state) => state.auth,
  );

  const { loading, error, data, refetch } = useQuery(WHO_AM_I_QUERY, {
    skip: !hasToken,
  });

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
