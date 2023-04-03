import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="w-screen h-20 bg-slate-950 flex justify-center items-center">
      <section className="w-screen px-4 max-w-5xl flex items-center justify-between">
        <nav className="flex gap-4">
          <Link href="/">
            <h1 className="text-white font-semibold text-2xl">
              Tarefas<span className="text-red-600">+</span>
            </h1>
          </Link>
          <Link href="/dashboard" className="bg-slate-100 py-1 px-3 rounded-md">
            Meu painel
          </Link>
        </nav>
        <button className="bg-transparent border-2 border-white rounded-full text-white px-5 py-1 font-semibold">
          Acessar
        </button>
      </section>
    </header>
  );
}

export default Header;
