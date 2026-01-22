import styles from "./Header.module.css";
// import SearchUser from "../SearchUser";
// import { useSearchUser } from "../../model/useSearchUser";
import Avatar from "@/shared/ui/Avatar/Avatar";
import { useAuth } from "@/features/auth";
import { ExitIcon } from "@radix-ui/react-icons";


const Header: React.FC = () => {
  const { user } = useAuth();
  // const { users, loading, handleSearch } = useSearchUser();

  // const handleSearchUsers = async (searchTerm: string) => {
  //   await handleSearch(searchTerm);
  // };

  const handleLogout = () => {
    console.log(123);
  };

  return (
    <header className={styles.Header}>
      <section className={styles.userControls}>
        <Avatar />
        {user && <strong>{user.username}</strong>}
        <button onClick={handleLogout}>
          <ExitIcon />
        </button>
      </section>
      {/* <SearchUser
        users={users}
        onSearchUsers={handleSearchUsers}
        loading={loading}
      /> */}
    </header>
  );
};

export default Header;
