import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faUser } from '@fortawesome/free-solid-svg-icons'
import { User } from '../models/user';
import { useUser } from '../contexts/userContext';
import { signOut } from '../services/UserService';
import Logo from '../assets/logo_simpl.png'

import './Banner.css'

export default function Banner() {
  
  const [profilPage, setProfilPage] = useState(false);
  const [mobileCreds, setMobileCreds] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(true)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const jsonUser = window.localStorage.getItem('user')
      if (jsonUser) {
        const parsedUser: User = JSON.parse(jsonUser!)
        return parsedUser
      } else {
        return null
      }
    } else {
      return null
    }
  })
  console.log(user)
  const { setIsLogged } = useUser()

  const handleImageError = () => {
    setImageLoaded(false)
  }



  // useEffect(() => {
  //   const jsonUser = localStorage.getItem('user')
  //   if (jsonUser) {
  //     setIsLogged(true)
  //     const user: User = JSON.parse(jsonUser)
  //     setUserParams(user)
  //   }
  // }, [setIsLogged, setUserParams])

  const clearSession = async () => {
    await signOut(user!.token)
    setIsLogged(false)
    setUser(null)
    if (localStorage.length > 0) {
      localStorage.clear()
    }
    // window.location.replace("/");
  }

  useEffect(() => {
    // const handleDocClick = () => {
    //   if (profilPage === true) {
    //     setProfilPage(!profilPage)
    //   }
    //   if (mobileCreds === true) {
    //     setMobileCreds(!mobileCreds)
    //   }
    // }
    const handleClick = ({target}: MouseEvent) => {
      const profilContainer = document.querySelector('.banner-nav-end')
      if (profilPage && !profilContainer?.contains(target as Node)) {
        setProfilPage(!profilPage)
      }
      if (mobileCreds === true) {
        setMobileCreds(!mobileCreds)
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [profilPage, mobileCreds])

  const fullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen && !document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className='banner'>
      <div className='banner-content'>
        <div className='banner-nav'>
          <a className='banner-logo-a banner-nav-elem' href='/'><img className='banner-logo' src={Logo} alt='Logo Bougainville' /></a>
          <p className='banner-nav-elem'><a href='/'>ACCUEIL</a></p>
          <p className='banner-nav-elem'><a href='/fragments'>FRAGMENTS</a></p>
          <FontAwesomeIcon className='cursor-pointer h-6' icon={faExpand} onClick={fullscreen} />
        </div>
        <div className='banner-nav-end'>
          {user && user.id ? imageLoaded ? <img onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon rounded-full' src={`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/pic/${user.id}`} alt='User Profil' onError={handleImageError}/> : <FontAwesomeIcon onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' icon={faUser} /> :
          <div className='flex items-center justify-end banner-creds-btn'>
            <a href='/login' className='mr-5 hover:text-gray-300 transition-colors'>Connexion</a>
            <a href='/register' className='hover:text-gray-300 hover:border-gray-300 transition-colors border p-2 rounded-lg '>S&apos;enregistrer</a>
          </div>}
          <FontAwesomeIcon onClick={() => setMobileCreds(!mobileCreds)} className='banner-profil-icon-mobile' icon={faUser} /> 
        </div>
      </div>
      { profilPage ? <div className='banner-profil-panel'>
        <ul className='banner-list'>
          <a href={`/profil/${user!.id}`} className='banner-profil-link'><li className='banner-list-item'>Profil</li></a>
          <a href='/options' className='banner-profil-link'><li className='banner-list-item'>Options</li></a>
          <div className='banner-div-logout'>
            <li onClick={clearSession} className='banner-list-item'>Déconnexion</li>
          </div>
        </ul>
      </div> : null }
      { mobileCreds ? <div className='banner-profil-panel'>
        <ul className='banner-list'>
          <a href='/login' className='banner-profil-link'><li className='banner-list-item'>Connexion</li></a>
        </ul>
      </div> : null }
    </div>
  )
}

// onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon'
// <FontAwesomeIcon onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' icon={faUser} /> 
// <img src={`${process.env.API_URL}/user/pic/${userParams.id}`} onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' />