import  { useEffect, type FC } from "react";
import router from "./router";
import {
    RouterProvider,
} from "react-router";
import { authService } from "@/features/auth/auth.service";


import "./App.css";

const  App:FC = () => {

useEffect(() => {
  // Проверяем whoAmI только если пользователь аутентифицирован
  if (authService.isAuthenticated()) {
    authService.whoAmI().catch((error) => {
      console.error("Failed to verify authentication:", error);
      // Если токен невалиден, удаляем его
      authService.logout();
    });
  }
}, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
