import { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";
import { FormError } from "../../FormError/FormError";

export interface SelectOption {
  value: string;
  text: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**Select prop */
  options: SelectOption[];
  emptyOption?: string;
  errors?: string[];
  label: string;
  /**additional styling */
  className?: string;
}

export function Select({
  options,
  className,
  emptyOption,
  label,
  errors,
  defaultValue,
  ...props
}: Readonly<SelectProps>) {
  return (
    <div className={className}>
      <label>
        {label}
        <div className={styles.selectContainer}>
          <select
            className={styles.input}
            defaultValue={defaultValue}
            {...props}
          >
            <option value="" disabled>
              {emptyOption}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </label>
      <FormError errors={errors} />
    </div>
  );
}
