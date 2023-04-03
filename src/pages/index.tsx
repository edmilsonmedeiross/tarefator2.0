import Image from 'next/image';

import hero from '../../public/assets/hero.png';

export default function Home() {
  return (
    <>
      <div className="bg-slate-950 w-screen h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <main>
          <div>
            <Image
              className="max-w-lg object-contain max-md:max-w-xs"
              src={hero}
              alt="hero"
              width={500}
              height={500}
              priority
            />
          </div>
          <h1 className="text-slate-100 text-center m-7 leading-relaxed">
            Sistema feito para você organizar <br /> seus estudos e tarefas
          </h1>

          <div className="flex items-center justify-around max-md:flex-col">
            <section className="bg-slate-50 p-3 rounded-md w-40 flex items-center justify-center hover:scale-105 transition-transform max-md:mb-3 max-md:w-9/12">
              <span>+12 posts</span>
            </section>
            <section className="bg-slate-50 p-3 rounded-md w-40 flex items-center justify-center hover:scale-105 transition-transform max-md:mb-3 max-md:w-9/12">
              <span>+90 comentários</span>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
