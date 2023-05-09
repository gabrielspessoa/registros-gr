// Registro Anual - [TAB OFFLINE] - 30 Funcionários
// SAT CAMPO MOURAO ALUGUEL DE EQUIPAMENTOS LTDA
// 30.132.934/0001-48
// campomourao@casadoconstrutor.com.br - Evelyn

import { format } from 'date-fns';
import Image from 'next/image';
import offlineImg from '../../public/offline.png';
import p4Img from '../../public/p4.png';
import {
  Clipboard,
  Pen,
  Pencil,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react';
import { Button } from './Button';
import { twMerge } from 'tailwind-merge';
import { UpdateDialog } from './UpdateDialog';
import useSWR, { useSWRConfig } from 'swr';
import { toast } from 'react-hot-toast';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog';

export const Registros = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data } = useSWR('/api/registro', fetcher);

  return data.map((registro: any, index: any) => (
    <Registro
      key={index}
      data={registro}
      className='border-b pb-3 last:border-b-0'
    />
  ));
};

const Registro = ({ data, className }: { data: any; className?: string }) => {
  const formattedDate = format(new Date(data.date * 1000), 'dd/MM/yyyy');
  const formattedCNPJ = data.cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );

  const copyRegistro = () => {
    navigator.clipboard.writeText(
      `*Registro ${data.prazo == 'anuidade' ? 'Anual' : 'Mensal'} - [${
        data.tabela === 'offline' ? 'TAB OFFLINE' : 'TAB P4'
      }]* - ${data.qtd_func} Funcionários\n\n${data.razao_social}\n*CNPJ:* ${
        data.cnpj
      }\n*E-mail:* ${data.email} - ${data.responsavel}`
    );

    toast.success('Registro copiado!');
  };

  return (
    <div className={twMerge(['relative group', className])}>
      <div className='flex items-center'>
        Registro {data.prazo == 'anuidade' ? 'Anual' : 'Mensal'}
        <span className='flex items-center gap-2 text-xs bg-blue-300 rounded p-1 ml-3'>
          <Image
            alt='Offline Icon'
            src={data.tabela === 'offline' ? offlineImg : p4Img}
            width={18}
            height={18}
            className='select-none'
          />
          {data.tabela === 'offline' ? 'TAB OFFLINE' : 'TAB P4'}
        </span>
        <span className='text-sm ml-3 text-gray-600'>{`${data.qtd_func} Funcionários`}</span>
        <span className='ml-auto text-sm text-gray-600'>{`${formattedDate}`}</span>
      </div>
      <div className='my-1 font-medium'>{data.razao_social}</div>
      <div>
        <span className='font-medium'>CNPJ: </span>
        {formattedCNPJ}
      </div>
      <div>
        <span className='font-medium'>E-mail: </span>
        {data.email} - {data.responsavel}
      </div>
      <div className='absolute right-0 bottom-3'>
        <div className='flex gap-1 opacity-0 group-hover:opacity-100 p-1 rounded bg-white/30 border-gray-200 backdrop-blur-sm transition-opacity duration-100'>
          <ConfirmDeleteDialog
            trigger={
              <Button
                variant='icon'
                className='h-8 w-8 hover:bg-red-200 active:bg-red-300'
              >
                <Trash />
              </Button>
            }
            id={data.id}
          />
          <UpdateDialog
            trigger={
              <Button variant='icon' className='h-8 w-8'>
                <PencilSimple />
              </Button>
            }
            data={data}
          />
          <Button
            variant='icon'
            className='h-8 w-8 hover:bg-sky-200 active:bg-sky-300'
            onClick={copyRegistro}
          >
            <Clipboard />
          </Button>
        </div>
      </div>
    </div>
  );
};
