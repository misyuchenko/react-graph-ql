import { type FC, useState } from "react";
import $style from "./LoginView.module.css";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/graphql/auth.queries";
import { authService } from "./auth.service";
import router from "@/app/router";

const LoginView: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: ["WhoAmI"], 
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await login({
        variables: { username, password },
      });

      if (result.data?.signIn) {
        authService.setToken(result.data.signIn.accessToken);
        router.navigate("/");
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
            disabled={loading}
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
            disabled={loading}
          />
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error.message}
            </div>
          )}
          <button
            className={$style.LoginView__button}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginView;
