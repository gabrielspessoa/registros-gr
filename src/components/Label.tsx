import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={twMerge(['text-sm', props.className])}>
    {props.children}
  </label>
);
