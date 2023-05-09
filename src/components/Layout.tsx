import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <main
        className={`max-w-xl mx-auto bg-white shadow-md min-h-screen px-6 py-3`}
      >
        {children}
      </main>
    </>
  );
}
