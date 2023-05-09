import { ReactNode } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { Trash, X } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

export const ConfirmDeleteDialog = ({
  trigger,
  id,
}: {
  trigger: ReactNode;
  id: string;
}) => {
  const { mutate } = useSWRConfig();

  const deleteRegistro = async (setOpen: any) => {
    const promise = fetch('/api/registro', {
      method: 'DELETE',
      body: id,
    });

    toast.promise(promise, {
      error: 'Erro ao deletar o registro',
      loading: 'Deletando...',
      success: 'Sucesso ao deletar o registro!',
    });

    setOpen(false);
    mutate('/api/registro');
  };

  return (
    <Dialog trigger={trigger} className='h-auto max-w-md'>
      {({ setOpen }) => (
        <>
          <div className='flex'>
            <Dialog.Title>
              Tem certeza que quer deletar esse registro?
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                as='span'
                variant='icon'
                className='absolute top-2 right-2'
              >
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <div className='flex w-2/3 gap-2 ml-auto'>
            <Button variant='danger' onClick={() => deleteRegistro(setOpen)}>
              <Trash size={18} />
              Deletar
            </Button>
            <Button variant='transparent'>Cancelar</Button>
          </div>
        </>
      )}
    </Dialog>
  );
};
