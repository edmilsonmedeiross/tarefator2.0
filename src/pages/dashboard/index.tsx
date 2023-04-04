import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

import TextArea from '@/components/TextArea';

function Dashboard() {
  return (
    <div className="w-full">
      <main>
        <section className="w-full flex items-center justify-center bg-slate-950">
          <div className="max-w-5xl w-full p-5 mt-14">
            <h1 className="text-white py-4">Qual sua Tarefa</h1>
            <form>
              <TextArea placeholder="Digite sua tarefa..." />
              <div className="my-3">
                <input type="checkbox" id="check" className="w-4 h-4" />
                <label htmlFor="check" className="text-white ml-2">
                  Deixar tarefa publica?
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md p-1"
              >
                Criar Tarefa
              </button>
            </form>
          </div>
        </section>
        <section>
          <h1>Minhas Tarefas</h1>
          <article>
            <div>
              <label>Publico</label>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      props: {},
    },
  };
};
