import { useQuery } from "@apollo/client/react";
import { WHO_AM_I_QUERY } from "@/graphql/auth.queries";
import { authService } from "./auth.service";

export const useAuth = () => {
  const hasToken = authService.hasToken();

  const { loading, error, data, refetch } = useQuery(WHO_AM_I_QUERY, {
    skip: !hasToken,
  });

  return {
    loading,
    error,
    user: data?.whoAmI,
    hasToken,
    refetch,
  };
};
