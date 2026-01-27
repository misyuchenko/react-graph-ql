import { Outlet } from "react-router-dom";
import { Logo } from "@/shared/assets";

import styles from "./AuthLayout.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <img className={styles.img} src={Logo} alt="logo" />
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
