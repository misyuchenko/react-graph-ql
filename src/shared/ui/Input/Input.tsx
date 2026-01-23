import type { InputHTMLAttributes, Ref } from "react";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import style from "./Input.module.css";
import { cn } from "../../utils";

interface CustomInputProps {
  error?: string;
  label?: string;
  withPasswordToggle?: boolean;
  ref?: Ref<HTMLInputElement>;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

const Input = ({ error, label, className, withPasswordToggle, type, ref, ...props }: InputProps) => {
    const isPasswordWithToggle = type === "password" && withPasswordToggle;

    if (isPasswordWithToggle) {
      const {
        name,
        value,
        defaultValue,
        onChange,
        onBlur,
        onFocus,
        placeholder,
        disabled,
        required,
        readOnly,
        autoComplete,
      } = props;

      return (
        <div>
          {label && <label className={style.label}>{label}</label>}
          <PasswordToggleField.Root>
            <div className={style.passwordWrapper}>
              <PasswordToggleField.Input
                ref={ref}
                className={cn(style.Input, style.passwordInput, className)}
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                autoComplete={
                  autoComplete as
                    | "current-password"
                    | "new-password"
                    | undefined
                }
              />
              <PasswordToggleField.Toggle className={style.passwordToggle}>
                <PasswordToggleField.Icon
                  visible={<EyeOpenIcon />}
                  hidden={<EyeClosedIcon />}
                />
              </PasswordToggleField.Toggle>
            </div>
          </PasswordToggleField.Root>
          {error && <span className={style.error}>{error}</span>}
        </div>
      );
    }

    // Обычный input
    return (
      <div className={style.inputContainer}>
        {label && <label className={style.label}>{label}</label>}
        <input
          ref={ref}
          type={type}
          className={cn(style.Input, className)}
          {...props}
        />
        {error && <span className={style.error}>{error}</span>}
      </div>
    );
};

export default Input;
