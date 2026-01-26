import type { FC } from "react";
import router from "./router";
import { RouterProvider } from "react-router";

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
