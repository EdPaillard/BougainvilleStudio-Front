import { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as yup from 'yup';
import { User } from '../../models/user';
import { useFormik } from 'formik';
import { modifyUser } from '../../services/UserService';
import { useUser } from '../../contexts/userContext';

import './Modify.css';

const validationSchema = yup.object({
  password: yup.string().min(10, 'Au moins 10\ncaractères requis.').required('Mot de passe requis.').matches(/\d/, 'Au moins un chiffre requis.'),
  email: yup.string().email('Adresse email invalide.'),
  pseudo: yup.string().max(15, '15 charactères max.')
});

export default function UserModify() {

  const [user, setUser] = useState<User | null>(null)
  const { setIsLogged, setUserParams } = useUser()
  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const userStored = localStorage.getItem('user')
    if (userStored) {
      setUser(JSON.parse(userStored))
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      pseudo: '',
      ville: '',
      about: '',
      profil_img: null
    },
    validationSchema,
    onSubmit: async (formUser) => {
      const body = {
        "current_hash": formUser.password,
        "user": {
          "pseudo": formUser.pseudo,
          "email": formUser.email,
          "password": formUser.password,
          "ville": formUser.ville,
          "about": formUser.about
        },
        "profil_img": formUser.profil_img
      }
      try {
        const respUser = await modifyUser(user!.id, body, user!.token)
        setUserParams(respUser)
        setIsLogged(true)
        setTimeout(() => {
          setSuccess(true)
        }, 3000)
      } catch (error) {
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      }       
    }
  })

  return (
    user && user.id ? <div className='modify-profil flex flex-col items-center'>
      <div className='modify-profil-container mx-auto h-auto px-5'>
        <div className='modify-profil-banner h-24'>
        <div className='flex items-center px-8'>
          <object className='w-16 h-16 mr-8' data={`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/pic/${user.id}`} type='image/png'>
            <FontAwesomeIcon className='banner-profil-icon' icon={faUser}/>
          </object>
          <a href={`/profil/${user.id}`}><h2 className='text-white text-2xl'>{user.pseudo}</h2></a>
        </div>
        </div>
        <div className='modify-profil-form h-auto mt-5 pb-10 box-border'>
          <a href={`/profil/${user.id}`}><div className='w-full flex items-end justify-end'><span className='text-right underline text-gray-100 hover:text-white'>Retour au profil</span></div></a>
          <form onSubmit={formik.handleSubmit} className='mt-10'>
            <div className='flex justify-between'><object className='w-40 h-40' data={`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/pic/${user.id}`} type='image/png'><FontAwesomeIcon className='banner-profil-icon' icon={faUser} /> </object><input type='file' name='profil_img' onChange={(event) => {formik.setFieldValue('profil_img', event.currentTarget.files![0]);}}/></div>
            <div className='flex flex-col'>
              <div className=' border-b border-white'>
                <h2 className='text-white text-2xl mt-5'>Général</h2>
              </div>
              <div className='flex flex-col pl-5 mt-5 text-white'>
                <div className='flex flex-col mb-5'>
                  <label>Pseudo</label>
                  <input className='modify-profil-input w-5/6' name='pseudo' placeholder={user.pseudo} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pseudo}/>
                </div>
                <div className='flex flex-col mb-5'>
                  <label>Email</label>
                  <input className='modify-profil-input w-5/6' name='email' type='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                </div>
                <div className='flex flex-col mb-5'>
                  <label>Password</label>
                  <input className='modify-profil-input w-5/6' name='password' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </div>
                <div className='flex flex-col mb-5'>
                  <label>Ville</label>
                  <input className='modify-profil-input w-5/6' name='ville' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ville}/>
                </div>
                <div className='flex flex-col mb-5'>
                  <label>Description</label>
                  <textarea className='modify-profil-input w-5/6' name='about' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.about}/>
                </div>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.email}</p>
              ) : null}
              {formik.touched.password && formik.errors.password ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.password}</p>
              ) : null}
              {formik.touched.pseudo && formik.errors.pseudo ? (
                <p className="error text-center text-red-400 font-bold mt-2">{formik.errors.pseudo}</p>
              ) : null}
            </div>
            <div className='flex justify-end items-center my-10'>
              <button type='submit' className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-20 py-2'>Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
      {success ? <div className='bg-green-200 text-green-900 flex justify-center items-center w-80 h-12 rounded-md border-green-900 my-8'>Modifications prises en compte !</div> : null}
      {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 my-8'>Quelque chose s&apos;est mal passé...</div> : null}
    </div> : null
  )
}

// <img alt='profil picture' src={`${process.env.API_URL}/user/pic/${user.id}`} className='w-16 h-16 mr-5'/>
// <img alt='profil picture' src={`${process.env.API_URL}/user/pic/${user.id}`} className='w-52 h-52'/>