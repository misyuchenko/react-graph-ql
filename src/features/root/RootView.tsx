import { useState, type FC } from "react";
import SearchUser from "./components/search-user/SearchUser";
import $style from "./RootView.module.css";
import { chatService } from "@/service/chat.service";

const RootView: FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  

  const handleSearchUsers = async (searchTerm: string) => {
    try {
      const response = await chatService.searchUsers(searchTerm);
      setUsers(response.searchUsers.map((user) => user.username));
      console.log("Search results:", response);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <main className={$style.RootView}>
      <section
        className={`${$style.RootView__section} ${$style.RootView__section_top}`}
      >
        <SearchUser onSearchUsers={handleSearchUsers} users={users} />
      </section>
      <section className={$style.RootView__section}>2</section>
    </main>
  );
};

export default RootView;
