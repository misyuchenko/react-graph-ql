import type { FC } from "react";
import $styles from "./Header.module.css";
import SearchUser from "../search-user/SearchUser";
import { useSearchUser } from "./useSearchUser";

const Header: FC = () => {
  const { users, loading, handleSearch } = useSearchUser();

  const handleSearchUsers = async (searchTerm: string) => {
    await handleSearch(searchTerm);
  };


  return (
    <header className={$styles.Header}>
      <SearchUser users={users} onSearchUsers={handleSearchUsers} loading={loading} />
    </header>
  );
};

export default Header;
