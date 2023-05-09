import { Plus, X } from '@phosphor-icons/react';
import { Formik, Form, Field } from 'formik';
import ReactDatePicker from 'react-datepicker';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Dialog } from './Dialog';
import { toast } from 'react-hot-toast';
import { Select } from './Select';
import { ReactNode } from 'react';
import { useSWRConfig } from 'swr';

export const InsertDialog = (props: { trigger: ReactNode }) => {
  const { mutate } = useSWRConfig();
  const submitForm = async (
    values: {
      prazo: string;
      tabela: string;
      razao_social: string;
      cnpj: string;
      email: string;
      responsavel: string;
      date: number;
    },
    setOpen: any
  ) => {
    try {
      const promise = fetch('/api/registro', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      toast.promise(promise, {
        loading: 'Criando...',
        error: 'Erro inesperado ao criar registrar',
        success: 'Sucesso ao criar registro!',
      });

      mutate('/api/registro');
      setOpen(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Dialog trigger={props.trigger}>
      {({ setOpen }) => (
        <>
          <div>
            <Dialog.Title>Incluir Registro</Dialog.Title>
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
          <Formik
            initialValues={{
              prazo: 'anuidade',
              tabela: 'offline',
              qtd_func: '30',
              razao_social: '',
              cnpj: '',
              email: '',
              responsavel: '',
              date: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
            }}
            onSubmit={(values) => submitForm(values, setOpen)}
          >
            {({ setFieldValue, values }) => (
              <Form autoComplete='off'>
                <div className='mb-2 flex gap-2'>
                  <div className='flex-1'>
                    <Label htmlFor='prazo'>Tipo de Registro</Label>
                    <Select
                      defaultValue={values.prazo}
                      onValueChange={(value) => setFieldValue('prazo', value)}
                      name='prazo'
                      id='prazo'
                    >
                      <Select.Item
                        value='anuidade'
                        text='Anuidade'
                      ></Select.Item>
                      <Select.Item
                        value='mensalidade'
                        text='Mensalidade'
                      ></Select.Item>
                    </Select>
                  </div>
                  <div className='flex-1'>
                    <Label htmlFor='tabela'>Tabela</Label>
                    <Select
                      defaultValue={values.tabela}
                      name='tabela'
                      id='tabela'
                      onValueChange={(value) => {
                        setFieldValue('tabela', value);
                      }}
                    >
                      <Select.Item value='offline' text='Offline'></Select.Item>
                      <Select.Item value='p4' text='P4'></Select.Item>
                    </Select>
                  </div>
                  <div className='flex-1'>
                    <Label htmlFor='qtd_func'>Qtd. Funcionários</Label>
                    <Select
                      defaultValue={values.qtd_func}
                      name='qtd_func'
                      id='qtd_func'
                      onValueChange={(value) => {
                        setFieldValue('qtd_func', value);
                      }}
                    >
                      <Select.Item value='30' text='0 - 30'></Select.Item>
                      <Select.Item value='50' text='31 - 50'></Select.Item>
                      <Select.Item value='100' text='51 - 100'></Select.Item>
                      <Select.Item value='200' text='101 - 200'></Select.Item>
                      <Select.Item value='300' text='201 - 300'></Select.Item>
                      <Select.Item value='400' text='301 - 400'></Select.Item>
                    </Select>
                  </div>
                </div>
                <div className='mb-2'>
                  <Label htmlFor='razao_social'>Razão Social</Label>
                  <Field
                    as={Input}
                    name='razao_social'
                    id='razao_social'
                    placeholder='Ex: SAT CAMPO MOURAO ALUGUEL DE EQUIPAMENTOS LTDA'
                  />
                </div>
                <div className='mb-2'>
                  <Label htmlFor='cnpj'>CNPJ</Label>
                  <Field
                    as={Input}
                    name='cnpj'
                    id='cnpj'
                    placeholder='Ex: 30.132.934/0001-48'
                  />
                </div>
                <div className='mb-2'>
                  <Label>Data do Registro</Label>
                  <ReactDatePicker
                    // locale='pt'
                    selected={new Date(values.date)}
                    dateFormat='dd/MM/yyyy'
                    onChange={(date) => setFieldValue('date', date?.getTime())}
                    className='bg-gray-200 border-2 rounded w-full h-9 leading-9 px-3 text-sm focus-visible:outline-none focus-visible:border-sky-600 hover:border-gray-300 transition-colors'
                  />
                </div>
                <div className='mb-2'>
                  <Label htmlFor='email'>E-mail</Label>
                  <Field
                    as={Input}
                    name='email'
                    id='email'
                    placeholder='campomourao@casadoconstrutor.com.br'
                  />
                </div>
                <div className='mb-4'>
                  <Label htmlFor='responsavel'>Responsável</Label>
                  <Field
                    as={Input}
                    name='responsavel'
                    id='responsavel'
                    placeholder='Evelyn'
                  />
                </div>
                <Button className='rounded-full'>Incluir</Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Dialog>
  );
};
