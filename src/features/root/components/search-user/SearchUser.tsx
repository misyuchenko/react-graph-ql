import { useEffect, useState, type FC } from "react";
import $style from "./SearchUser.module.css";
import { useDebounce } from "@/hooks/useDebounce";





const SearchUser: FC<{
  onSearchUsers: (searchTerm: string) => void;
  users: string[];
}> = ({ onSearchUsers, users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearchUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  

  return (
    <nav className={$style.SearchUser}>
      <input
        className={$style.SearchUser__input}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className={$style.SearchUser__usersList}>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchUser;
