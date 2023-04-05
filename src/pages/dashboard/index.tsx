import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

import { db } from '../../services/firebaseConnection';

import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
interface FormData {
  task: string;
  isPublic: boolean;
}
interface User {
  email: string;
}
interface Task {
  id: string;
  task: string;
  isPublic: boolean;
  createdAt: Date;
  user: string;
}

function Dashboard({ user }: { user: User }) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksRef = collection(db, 'tasks');
      const q = query(
        tasksRef,
        where('user', '==', user?.email),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(q, (querySnapshot) => {
        const tasks = [] as Task[];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            task: doc.data().task,
            isPublic: doc.data().isPublic,
            createdAt: doc.data().createdAt,
            user: doc.data().user,
          });
        });

        setTasks(tasks);
      });
    };
    loadTasks();
  }, [user.email]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.task) return alert('Digite uma tarefa');
    try {
      await addDoc(collection(db, 'tasks'), {
        task: data.task,
        isPublic: data.isPublic,
        createdAt: new Date(),
        user: user?.email,
      });

      reset({ task: '', isPublic: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.log(error);
    }
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
          {tasks.map((task) => (
            <article
              key={task.id}
              className="mb-3 leading-relaxed border-2 border-gray-400 rounded-md p-4 flex flex-col items-start"
            >
              {task.isPublic && (
                <div className="flex items-center justify-center mb-3">
                  <label className="bg-[#3183ff] py-1 px-1 text-white font-medium rounded-md text-xs">
                    Publico
                  </label>
                  <button onClick={() => handleShare(task.id)}>
                    <FiShare2 size={22} color="#3183ff" className="mx-2" />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between w-full">
                {task.isPublic ? (
                  <Link href={`/task/${task.id}`}>
                    <p className="whitespace-pre-wrap">{task.task}</p>
                  </Link>
                ) : (
                  <p className="whitespace-pre-wrap">{task.task}</p>
                )}
                <button onClick={() => handleDelete(task.id)}>
                  <FaTrash size={22} color="#ea3140" className="mx-2" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  console.log(session?.user?.email);

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
      user: {
        email: session?.user?.email,
      },
    },
  };
};
