interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

import Image from 'next/image';
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png';
import logoImg from '../assets/logo.svg';
import userAvatar from '../assets/avatares.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();
    try {
      const res = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = res.data

      Swal.fire({
        icon: 'success',
        title: 'Bolão criado com sucesso',
        html: 'CÓDIGO: <strong>'+code+'</strong>',
        color: 'white',
        background: '#202024',
        confirmButtonText: 'Copiar'
      }).then((res) => {
        if(res.isConfirmed) {
          navigator.clipboard.writeText(code)

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Código copiado com sucesso!',
            showConfirmButton: false,
            color: 'white',
            background: '#202024',
            timer: 1500
          })
        }
      })
      
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falha ao criar o bolão, tente novamente!'
      })
    }
   
    setPoolTitle('')
  }
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
            <span className='text-ignite-500'>+{props.usersCount}</span> pessoal já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text" 
            required 
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={(e) => setPoolTitle(e.target.value)}
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
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600'></div>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
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

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCount] = await Promise.all([
    api.get('pools/count'), api.get('guesses/count'), api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCount.data.count
    }
  }
}
