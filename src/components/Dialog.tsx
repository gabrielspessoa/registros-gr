import * as RadixDialog from '@radix-ui/react-dialog';
import {
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  trigger: ReactNode;
  children:
    | ((props: {
        open?: boolean;
        setOpen?: Dispatch<SetStateAction<boolean>>;
      }) => ReactNode)
    | ReactNode;
  className?: string;
}

const Dialog = ({ trigger, children, className }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='bg-gray-900/30 fixed inset-0 data-[state=open]:animate-opacity-in data-[state=closed]:animate-opacity-out' />
        <RadixDialog.Content
          className={twMerge([
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] h-full w-[90vw] max-w-[512px] data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
            className,
          ])}
        >
          <div className='bg-white rounded p-4 shadow-xl overflow-y-auto h-full'>
            {typeof children == 'function'
              ? children({ open, setOpen })
              : children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

Dialog.Title = function Title(props: HTMLAttributes<HTMLElement>) {
  return (
    <RadixDialog.Title className='text-center font-medium mb-4 w-full'>
      {props.children}
    </RadixDialog.Title>
  );
};
Dialog.Description = RadixDialog.Description;
Dialog.Close = RadixDialog.Close;

export { Dialog };
