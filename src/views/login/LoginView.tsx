import { type FC, useState } from "react";
import $style from "./LoginView.module.css";

const  LoginView: FC = () => {
  const  [email, setEmail] = useState("");
  const  [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  return  (<>
    <div className={$style.LoginView}>
      <h1 className={$style.LoginView__title}>Login</h1>
      <form className={$style.LoginView__form}>
        <label htmlFor="email">Email:</label>
        <input  className={$style.LoginView__input} placeholder="example@example.com" type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password:</label>
        <input  className={$style.LoginView__input} placeholder="password" type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
        <button className={$style.LoginView__button} type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  </>)
}

export default LoginView;
