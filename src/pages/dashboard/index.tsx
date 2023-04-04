import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
interface FormData {
  task: string;
  isPublic: boolean;
}

function Dashboard() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <main>
        <section className="w-full flex items-center justify-center bg-slate-950">
          <div className="max-w-5xl w-full p-5 mt-14">
            <h1 className="text-white py-4">Qual sua Tarefa</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="Digite sua tarefa aqui..."
                className="w-full resize-none h-24 rounded-md outline-none p-2"
                {...register('task')}
              />
              <div className="my-3">
                <input
                  type="checkbox"
                  id="check"
                  className="w-4 h-4"
                  {...register('isPublic')}
                />
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
        <section className="mt-8 mr-auto mb-0 ml-auto px-4 w-full max-w-5xl flex flex-col">
          <h1 className="text-center text-3xl p-3">Minhas Tarefas</h1>
          <article className="mb-3 leading-relaxed border-2 border-gray-400 rounded-md p-4 flex flex-col items-start">
            <div className="flex items-center justify-center mb-3">
              <label className="bg-[#3183ff] py-1 px-1 text-white font-medium rounded-md text-xs">
                Publico
              </label>
              <button>
                <FiShare2 size={22} color="#3183ff" className="mx-2" />
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="whitespace-pre-wrap">Minha tarefa</p>
              <button>
                <FaTrash size={22} color="#ea3140" className="mx-2" />
              </button>
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
