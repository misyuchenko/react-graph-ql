import type { FC } from "react";
import styles from "./Header.module.css";
import SearchUser from "./SearchUser";
import { useSearchUser } from "../model/useSearchUser";

const Header: FC = () => {
  const { users, loading, handleSearch } = useSearchUser();

  const handleSearchUsers = async (searchTerm: string) => {
    await handleSearch(searchTerm);
  };

  return (
    <header className={styles.Header}>
      <SearchUser users={users} onSearchUsers={handleSearchUsers} loading={loading} />
    </header>
  );
};

export default Header;
