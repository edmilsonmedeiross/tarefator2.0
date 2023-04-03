import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="w-screen h-20 bg-slate-950 flex justify-center items-center">
      <section className="w-screen px-4 max-w-5xl flex items-center justify-between">
        <nav className="flex gap-4">
          <Link href="/">
            <h1 className="text-white font-semibold text-2xl">
              Tarefas<span className="text-red-600">+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link
              href="/dashboard"
              className="bg-slate-100 py-1 px-3 rounded-md"
            >
              Meu painel
            </Link>
          )}
        </nav>
        {status === 'loading' ? (
          <></>
        ) : session ? (
          <button
            onClick={() => signOut()}
            className="bg-transparent border-2 border-white rounded-full text-white px-5 py-1 font-semibold"
          >
            {`Olá ${session?.user?.name}`}
          </button>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-transparent border-2 border-white rounded-full text-white px-5 py-1 font-semibold"
          >
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}

export default Header;
