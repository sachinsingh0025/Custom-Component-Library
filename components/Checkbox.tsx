
import React from 'react';
import { Icon } from './Icon';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="flex items-center space-x-2">
            <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                data-state={checked ? 'checked' : 'unchecked'}
                className={`peer h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                    checked ? 'bg-primary text-primary-foreground' : 'bg-transparent'
                } ${className}`}
                onClick={(e) => {
                    const input = e.currentTarget.nextElementSibling as HTMLInputElement;
                    if (input) {
                        input.click();
                    }
                }}
            >
                {checked && <Icon name="check" className="h-4 w-4 text-primary-foreground" />}
            </button>
            <input
                type="checkbox"
                ref={ref}
                id={checkboxId}
                checked={checked}
                className="sr-only"
                {...props}
            />
            <label
                htmlFor={checkboxId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
