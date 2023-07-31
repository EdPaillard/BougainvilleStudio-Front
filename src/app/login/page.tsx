import React from 'react'
import Link from 'next/link'

import './Login.css'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className='login-body bg-black text-white flex justify-center items-center'>
        <div className='login-panel bg-slate-600 w-fit p-10 h-1/2 flex flex-col rounded-lg'>
          <h2 className='text-white text-2xl font-bold'>Connexion</h2>
          <div className='flex flex-col items-center justify-center'>
            <input className='p-2 mb-5 rounded-md text-black' type='text' placeholder='Email'/>
            <input className='p-2 rounded-md text-black' type='password' placeholder='Password'/>
            <Link href={"/auth/forget"} className='text-center text-xs text-gray-300 hover:text-black hover:underline mt-4'>Mot de passe oublié ?</Link>
          </div>
          <div className='h-fit flex justify-center hover:bg-slate-600'>
            <button className='border-black border w-fit p-2 bg-slate-300 font-bold text-black rounded-md hover:bg-slate-400 hover:border-white hover:text-white'>Se connecter</button>
          </div>
          <Link href={"/register"} className='text-center text-xs text-gray-300 mt-4'>Pas encore de compte ? <span className='text-black hover:underline'>Créer un compte !</span></Link>
        </div>
        {/* <div className='register-panel bg-slate-800 w-fit p-10 h-1/2 flex flex-col rounded-lg absolute right-0'>
          <h2 className='text-white text-2xl font-bold'>Register</h2>
          <div className='flex flex-col items-center justify-center'>
            <input className='p-2 mb-5 rounded-md text-black' type='text' placeholder='Email'/>
            <input className='p-2 mb-5 rounded-md text-black' type='password' placeholder='Password'/>
            <input className='p-2 rounded-md text-black' type='password' placeholder='Password'/>
          </div>
          <div className='h-fit flex justify-center'>
            <button className='border-black border w-fit p-2 bg-slate-300 font-bold text-black rounded-md hover:bg-slate-400 hover:border-white hover:text-white' type='submit'>S&apos;enregistrer</button>
          </div>
        </div> */}
    </div>
  )
}

export default Login