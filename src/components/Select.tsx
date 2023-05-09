import { CaretDown, Check } from '@phosphor-icons/react';
import * as RadixSelect from '@radix-ui/react-select';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const Select = (
  props: RadixSelect.SelectProps & {
    trigger?: ReactNode;
    buttonClassName?: string;
    id?: string;
  }
) => {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger asChild id={props.id}>
        {props.trigger ? (
          props.trigger
        ) : (
          <button
            className={twMerge([
              'flex items-center focus:border-sky-600 focus:outline-none bg-gray-200 hover:border-gray-300 h-9 rounded border-2 w-full px-3 text-sm transition-colors',
              props.buttonClassName,
            ])}
          >
            <RadixSelect.Value />
            <RadixSelect.Icon className='pl-2 ml-auto'>
              <CaretDown />
            </RadixSelect.Icon>
          </button>
        )}
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className='group'>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport className='bg-white rounded border shadow-md text-sm group-data-[state=open]:animate-select-in group-data-[state=closed]:animate-select-out'>
            <RadixSelect.Group>{props.children}</RadixSelect.Group>
            <RadixSelect.Separator />
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton></RadixSelect.ScrollDownButton>
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

Select.Item = function Item(
  props: RadixSelect.SelectItemProps & { text: string }
) {
  return (
    <RadixSelect.Item
      {...props}
      className={twMerge([
        'relative flex items-center pl-3 py-2 cursor-pointer rounded data-[highlighted]:outline-none data-[highlighted]:bg-gray-100',
        props.className,
      ])}
    >
      {props.children}
      <RadixSelect.ItemText>{props.text}</RadixSelect.ItemText>
      {/* <RadixSelect.ItemIndicator className='absolute left-2 flex items-center'>
        <Check />
      </RadixSelect.ItemIndicator> */}
    </RadixSelect.Item>
  );
};

Select.Value = RadixSelect.Value;
Select.Icon = RadixSelect.Icon;
Select.CaretDown = CaretDown;

export { Select };
