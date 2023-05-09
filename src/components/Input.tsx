import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={twMerge([
      'bg-gray-200 border-2 rounded w-full h-9 leading-9 px-3 text-sm focus-visible:outline-none focus-visible:border-sky-600 hover:border-gray-300 transition-colors',
      props.className,
    ])}
  />
));

Input.displayName = 'Input';
