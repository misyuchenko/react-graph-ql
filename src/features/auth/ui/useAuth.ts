import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "../api/queries";
import { useAppSelector } from "@/app/hooks";

export const useAuth = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { loading, error, data, refetch } = useQuery(WHO_AM_I_QUERY, {
    skip: !isAuthenticated,
  });

  return {
    loading,
    error,
    user: user || data?.whoAmI,
    isAuthenticated,
    refetch,
  };
};
