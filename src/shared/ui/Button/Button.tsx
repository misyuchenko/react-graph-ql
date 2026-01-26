import styles from "./Button.module.scss";
import { cn } from "@/shared/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className={cn(styles.Button)} {...props}>
      {children}
    </button>
  );
};

export default Button;
