import { type FC, useState } from "react";
import $style from "./LoginView.module.css";
import { useLoginMutation, useLazyWhoAmIQuery } from "../api/authApi";
import router from "@/app/router";
import { useAppDispatch } from "@/app/hooks";
import { setToken, setUser } from "../model/authSlice";

const LoginView: FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [login, { isLoading, error }] = useLoginMutation();

  const [getWhoAmI, { isLoading: whoAmILoading }] = useLazyWhoAmIQuery();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await login({ username, password }).unwrap();

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
      <div className={$style.LoginView}>
        <h1 className={$style.LoginView__title}>Login</h1>
        <form className={$style.LoginView__form} onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            className={$style.LoginView__input}
            placeholder="login"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            disabled={isLoading}
          />
          <label htmlFor="password">Password:</label>
          <input
            className={$style.LoginView__input}
            placeholder="password"
            type="password"
            id="password"
            name="password"
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
            className={$style.LoginView__button}
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

export default LoginView;
