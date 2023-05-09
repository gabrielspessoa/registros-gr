import { Button } from '@/components/Button';
import { Registros } from '@/components/Registros';
import { db } from '@/lib/firebase';
import { Plus } from '@phosphor-icons/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { InsertDialog } from '@/components/InsertDialog';
import useSWR, { SWRConfig } from 'swr';
import Head from 'next/head';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const registros: any[] = [];
  const querySnapshot = await getDocs(
    query(collection(db, 'registro'), orderBy('date', 'desc'))
  );
  querySnapshot.forEach((doc) => {
    const data: any = { id: doc.id, ...doc.data() };
    data.date = data.date.seconds;

    registros.push(data);
  });

  return {
    props: {
      fallback: {
        '/api/registro': registros,
      },
    },
  };
}

export default function Home({ fallback }: any) {
  // registerLocale('pt', pt);
  // setDefaultLocale('pt');
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data } = useSWR('/api/registro', fetcher);

  useEffect(() => {
    console.log('FALLBACK: ', fallback);
    console.log('SWR DATA: ', data);
  });

  return (
    <>
      <Head>
        <title>Registros GR</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <div className='flex flex-col gap-3'>
          <div>
            <InsertDialog
              trigger={
                <Button variant='icon'>
                  <Plus size={18} weight='bold' />
                </Button>
              }
            />
          </div>
          <Registros />
        </div>
      </SWRConfig>
    </>
  );
}
