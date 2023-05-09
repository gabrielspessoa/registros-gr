import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: string;
  as?: any;
}

const variants: any = {
  primary:
    'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-sm rounded px-3 h-9 leading-9 w-full',
  icon: 'rounded-full flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 h-9 w-9 transition-colors ease-in-out cursor-pointer',
  danger:
    'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-sm rounded px-3 h-9 leading-9 w-full',
  transparent:
    'bg-transparent hover:bg-black/10 active:bg-black/20 text-sm rounded px-3 h-9 leading-9 w-full',
};

const selectVariant = (variant: string = 'primary') => variants[variant];

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant, className, as = 'button', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        {...props}
        className={twMerge([
          'flex items-center justify-center gap-2',
          selectVariant(variant),
          className,
        ])}
      >
        {props.children}
      </Component>
    );
  }
);

Button.displayName = 'Button';
