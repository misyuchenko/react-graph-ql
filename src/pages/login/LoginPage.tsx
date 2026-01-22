import { type FC, useState } from "react";
import c from "./LoginPage.module.css";
import {
  useSignInMutation,
  useLazyWhoAmIQuery,
} from "@/shared/api/generated/enhanced-api";
import router from "@/app/router";
import { useAppDispatch } from "@/app/hooks";
import { setToken, setUser } from "../../features/auth/model/authSlice";

import Input from "@/shared/ui/Input/Input";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [signIn, { isLoading, error }] = useSignInMutation();

  const [getWhoAmI, { isLoading: whoAmILoading }] = useLazyWhoAmIQuery();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await signIn({ input: { username, password } }).unwrap();

      if (result.signIn) {
        dispatch(setToken(result.signIn.accessToken));

        const whoAmIResult = await getWhoAmI().unwrap();

        if (whoAmIResult) {
          dispatch(setUser(whoAmIResult));
          router.navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <div className={c.LoginPage}>
        <h1 className={c.LoginPage__title}>Login</h1>
        <form className={c.LoginPage__form} onSubmit={handleLogin}>
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            disabled={isLoading}
          />

          <Input
            label="Password"
            withPasswordToggle={true}
            placeholder="Enter your password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
          />
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {"message" in error ? error.message : "Login failed"}
            </div>
          )}
          <button
            className={c.LoginPage__button}
            type="submit"
            disabled={isLoading || whoAmILoading}
          >
            {isLoading || whoAmILoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
