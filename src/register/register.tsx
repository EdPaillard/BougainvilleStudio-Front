import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useUser } from '../contexts/userContext';
import { registerUser } from '../services/UserService';

import "./Register.css"

const validationSchema = yup.object({
  pseudo: yup.string().max(15, 'Pas plus de 15 caractères').required('Pseudo requis.'),
  password: yup.string().min(10, 'Au moins 10\ncaractères requis.').required('Mot de passe requis.').matches(/\d/, 'Au moins un chiffre requis/'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required('Confirm Password is required'),
  email: yup.string().email('Adresse email invalide.').required('Email requis.'),
});

const Register = () => {
  const welcomingMessage: string = "Bienvenue à bord du Bougainville !"
  const welcomingMessage2: string = "Etes-vous prêts à commencer l'aventure ?"
  // const [welcMessDiv, setWelcMessDiv] = useState<HTMLElement | null>(null)

  // const displayWelcomeMessage = () => {
  //   const words = welcomingMessage.split(" ");
  //   let currentWordIndex = 0;

  //   const intervalId = setInterval(() => {
  //     if (currentWordIndex < words.length) {
  //       welcMessDiv!.textContent = words.slice(0, currentWordIndex +1).join(" ");
  //       currentWordIndex++;
  //     } else {
  //       clearInterval(intervalId)
  //     }
  //   }, 100)
  // }

  // useEffect(() => {
  //   setWelcMessDiv(document.getElementById("welcome-message"))
  //   displayWelcomeMessage()
  // })

  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(false)
  const userCtx = useUser()
  
  const formik = useFormik({
    initialValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (user) => {
      try {
        const regUser = {
          "pseudo": user.pseudo,
          "email": user.email,
          "password": user.password
        }
        const respUser = await registerUser(regUser)
        userCtx.setUserParams(respUser)
        userCtx.setIsLogged(true)
        setSuccess(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        window.location.replace("/");
      } catch (error) {
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      }       
    }
  })

  return (
    <div className='register-body bg-black text-white flex justify-center items-center'>
        <div className='bg-slate-600 w-1/3 p-10 h-1/2 flex flex-col rounded-lg typewriter css-typing'>
          <h3 className='text-white text-2xl font-bold'>{welcomingMessage}</h3>
          <h3 className='text-white text-2xl font-bold'>{welcomingMessage2}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col items-center justify-center'>
              <input className='p-2 mb-5 rounded-md text-black' type='text' placeholder='Pseudo' name='pseudo' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pseudo}/>
              <input className='p-2 mb-5 rounded-md text-black' type='email' placeholder='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
              <input className='p-2 mb-5 rounded-md text-black' type='password' placeholder='Mot de passe' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
              <input className='p-2 rounded-md text-black' type='password' placeholder='Confirmer le mot de passe' name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}/>
              {formik.touched.pseudo && formik.errors.pseudo ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.pseudo}</p>
              ) : null}
              {formik.touched.pseudo && formik.errors.pseudo ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.email}</p>
              ) : null}
              {formik.touched.password && formik.errors.password ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.password}</p>
              ) : null}
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.confirmPassword}</p>
              ) : null}
            {success ? <div className='bg-green-200 text-green-900 flex justify-center items-center w-80 h-12 rounded-md border-green-900 mt-8'>Bienvenue à bord !</div> : null}
            {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 mt-8'>Votre passeport n&apos;est pas à jour !</div> : null}
            </div>
            <div className='h-fit flex justify-center hover:bg-slate-600'>
              <button type='submit' className='border-black border w-fit p-2 bg-slate-300 font-bold text-black rounded-md hover:bg-slate-400 hover:border-white hover:text-white'>S&apos;enregistrer</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Register