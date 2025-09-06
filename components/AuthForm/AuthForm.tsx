import { PropsWithChildren } from "react";
import clsx from "clsx";
import { Input, InputProps } from "../Input/Input";
import { Button } from "../Button/Button";
import { FormError } from "../FormError/FormError";
import styles from "./AuthForm.module.css";

export interface AuthFormField extends InputProps {
  label: string;
}

export interface AuthFormProps {
  className?: string;
  buttonText?: string;
  fields: AuthFormField[];
  isLoading?: boolean;
  currentValues?: Record<string, string>;
  errors?: Record<string, string[]>;
  csrfToken?: string;
  action?: (formData: FormData) => void;
  id?: string;
}

export function AuthForm({
  fields,
  className,
  isLoading,
  currentValues,
  errors,
  csrfToken,
  buttonText,
  action,
  id,
  children,
  ...rest
}: PropsWithChildren<AuthFormProps>) {
  return (
    <form
      className={clsx(styles.form, className)}
      action={action}
      id={id}
      data-testid="auth-form"
      {...rest}
    >
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {fields.map(({ label, name, ...props }) => {
        return (
          <div key={label} className={styles.inputContainer}>
            <Input
              defaultValue={currentValues?.[name] ?? ""}
              disabled={isLoading}
              name={name}
              {...props}
            >
              {label}
            </Input>
            <FormError errors={errors?.[name]} />
          </div>
        );
      })}
      {children}
      <Button type="submit" disabled={isLoading} size="M">
        {buttonText}
      </Button>
    </form>
  );
}
