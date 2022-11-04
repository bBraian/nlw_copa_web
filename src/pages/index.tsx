// interface HomeProps {
//   count: number;
// }

import Image from 'next/image';
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png';
import logoImg from '../assets/logo.svg';
import userAvatar from '../assets/avatares.png';
import iconCheckImg from '../assets/icon-check.svg';

export default function Home() {
  return (
    <div className='max-w-[1124px] mx-auto grid grid-cols-2 items-center h-screen gap-28'>
      <main>
        <Image  
          src={logoImg} 
          alt="Logotipo escrito NLW Copa"
          quality={100}
        />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={userAvatar} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+12.592</span> pessoal já estão usando
          </strong>
        </div>

        <form action="" className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
            type="text" 
            required 
            placeholder="Qual nome do seu bolão?" 
          />
          <button 
            type="submit" 
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm hover:bg-yellow-700 transition-all'
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className='text-gray-300 mt-4 text-sm leading-relaxed'>
          Após criar seu bolão, você receberá um código unico que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600'></div>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+2.034</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image 
        src={appPreviewImg} 
        alt="Dois celulares exibindo uma prévia da aplicação mobile do NLW Copa"
        quality={100}
      />
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const res = await fetch('http://0.0.0.0:3333/pools/count');
//   const data = await res.json();

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }
