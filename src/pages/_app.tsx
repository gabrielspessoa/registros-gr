import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '../styles/react-datepicker.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
