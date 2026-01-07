import type { FC } from "react";
import $style from "./Button.module.css";
import clsx from "clsx";

const Button: FC<{ variant: string }> = () => {
  return <div className={clsx($style.button)}>Button</div>;
};

export default Button;
