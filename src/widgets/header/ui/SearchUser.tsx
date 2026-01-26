import { useEffect, useState, type FC } from "react";
import styles from "./SearchUser.module.scss";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useCreateChat } from "@/features/chat";

const SearchUser: FC<{
  onSearchUsers: (searchTerm: string) => void;
  users: string[];
  loading?: boolean;
}> = ({ onSearchUsers, users, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { createChat, chat, loading: chatLoading, error } = useCreateChat();

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearchUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = async (username: string) => {
    try {
      await createChat(username);
      if (chat) {
        console.log("Chat created:", chat);
      }
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  return (
    <nav className={styles.searchUser}>
      <input
        className={styles.searchUser__input}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading && <p>Loading...</p>}
      {chatLoading && <p>Creating chat...</p>}
      {error && (
        <p className={styles.searchUser__error}>Error: {error.message}</p>
      )}
      <ul className={styles.searchUser__usersList}>
        {users.map((user) => (
          <li onClick={() => handleUserClick(user)} key={user}>
            {user}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchUser;
