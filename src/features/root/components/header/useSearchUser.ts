import { queries } from "@/service/chat.service";
import { useLazyQuery } from "@apollo/client/react";

interface SearchUsersData {
  searchUsers: {
    username: string;
  }[];
}

export const useSearchUser = () => {
  const [searchUsers, { data, loading, error }] = useLazyQuery<SearchUsersData>(
    queries.searchUsers,
  );

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;

    try {
      await searchUsers({
        variables: { username },
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const users = data?.searchUsers?.map((user) => user.username) || [];

  return {
    users,
    loading,
    error,
    handleSearch,
  };
};
