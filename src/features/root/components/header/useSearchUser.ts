import { useSearchUsers } from "@/features/chat";

export const useSearchUser = () => {
  const { searchUsers, users, loading, error } = useSearchUsers();

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;

    try {
      await searchUsers(username);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return {
    users,
    loading,
    error,
    handleSearch,
  };
};
