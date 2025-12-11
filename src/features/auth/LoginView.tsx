import { authService } from "@/features/auth/auth.service";
import { type FC, useState } from "react";
import $style from "./LoginView.module.css";

const LoginView: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.login({ username, password });
      console.log("Login successful:", response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={$style.LoginView}>
        <h1 className={$style.LoginView__title}>Login</h1>
        <form className={$style.LoginView__form}>
          <label htmlFor="email">Username:</label>
          <input
            className={$style.LoginView__input}
            placeholder="example@example.com"
            type="email"
            id="email"
            name="email"
            value={username}
            onChange={handleEmailChange}
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
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
          <button
            className={$style.LoginView__button}
            type="submit"
            onClick={handleLogin}
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
