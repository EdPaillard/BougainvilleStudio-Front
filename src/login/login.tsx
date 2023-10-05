import { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signUser } from '../services/UserService';
import { useUser } from '../contexts/userContext';

import './Login.css'

const validationSchema = yup.object({
  password: yup.string().min(10, 'Au moins 10\ncaractères requis.').required('Mot de passe requis.').matches(/\d/, 'Au moins un chiffre requis.'),
  email: yup.string().email('Adresse email invalide.').required('Email requis.'),
});

const Login = () => {

  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(false)
  const { setIsLogged, setUserParams } = useUser()
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (user) => {
      try {
        const respUser = await signUser(user)
        setUserParams(respUser)
        setIsLogged(true)
        setSuccess(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        window.location.replace("/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000)
      } catch (error) {
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      }       
    }
  })

  return (
    <div className='login-body bg-black text-white flex flex-col justify-center items-center'>
        <div className='login-panel bg-slate-600 w-fit p-10 h-1/2 flex flex-col rounded-lg'>
          <h2 className='text-white text-2xl font-bold'>Connexion</h2>
          <form className='h-full flex flex-col justify-around' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col items-center justify-center'>
              <input className='p-2 mb-5 rounded-md text-black' type='text' placeholder='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
              <input className='p-2 rounded-md text-black' type='password' placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
              <a href={"/auth/forget"} className='text-center text-xs text-gray-300 hover:text-black hover:underline mt-4'>Mot de passe oublié ?</a>
              {formik.touched.email && formik.errors.email ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.email}</p>
              ) : null}
              {formik.touched.password && formik.errors.password ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className='h-fit flex justify-center hover:bg-slate-600'>
              <button className='border-black border w-fit p-2 bg-slate-300 font-bold text-black rounded-md hover:bg-slate-400 hover:border-white hover:text-white' type='submit'>Se connecter</button>
            </div>
          </form>
            <a href={"/register"} className='text-center text-xs text-gray-300 mt-4'>Pas encore de compte ? <span className='text-black hover:underline'>Créer un compte !</span></a>
        </div>
        {success ? <div className='bg-green-200 text-green-900 flex justify-center items-center w-80 h-12 rounded-md border-green-900 mt-8'>Bienvenue à bord !</div> : null}
        {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 mt-8'>Votre passeport n&apos;est pas à jour !</div> : null}
    </div>
  )
}

export default Login