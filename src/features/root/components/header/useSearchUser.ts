import { useSearchUsers } from "@/features/chat";

export const useSearchUser = () => {
  const { searchUsers, users: usersData, loading, error } = useSearchUsers();

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;

    try {
      await searchUsers(username);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Преобразуем {username: string}[] в string[]
  const users = usersData.map((user) => user.username);

  return {
    users,
    loading,
    error,
    handleSearch,
  };
};
