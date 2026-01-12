import { useEffect, useState, type FC } from "react";
import $style from "./SearchUser.module.css";
import { useDebounce } from "@/hooks/useDebounce";
import { useCreateChat } from "@/service/chat.hooks";

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
    <nav className={$style.SearchUser}>
      <input
        className={$style.SearchUser__input}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading && <p>Loading...</p>}
      {chatLoading && <p>Creating chat...</p>}
      {error && <p className={$style.SearchUser__error}>Error: {error.message}</p>}
      <ul className={$style.SearchUser__usersList}>
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
