import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import styles from "./MainLayout.module.css";
import MobileMenu from "@/features/mobile-menu/MobileMenu";
import { useBreakpoints } from "@/shared/hooks";

export const MainLayout = () => {
  const { isDesktop } = useBreakpoints();

  return (
    <div className={styles.mainLayout}>
      {isDesktop && <Header />}
      <Outlet />
      {!isDesktop && <MobileMenu />}
    </div>
  );
};
