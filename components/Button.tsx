
import React from 'react';
import { ButtonVariant, ButtonSize } from '../types';
import { Icon } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = ButtonVariant.Primary,
      size = ButtonSize.Default,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      [ButtonVariant.Primary]: 'bg-primary text-primary-foreground hover:bg-primary/90',
      [ButtonVariant.Secondary]: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      [ButtonVariant.Destructive]: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      [ButtonVariant.Outline]: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      [ButtonVariant.Ghost]: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses = {
      [ButtonSize.Default]: 'h-10 px-4 py-2',
      [ButtonSize.Small]: 'h-9 rounded-md px-3',
      [ButtonSize.Large]: 'h-11 rounded-md px-8',
      [ButtonSize.Icon]: 'h-10 w-10',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
      <button
        className={combinedClasses}
        ref={ref}
        disabled={loading || props.disabled}
        aria-disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Icon name="spinner" className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
