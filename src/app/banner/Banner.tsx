"use client"
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logoBoug from '../../../public/logo_boug.png'
import Image from 'next/image';
import './Banner.css'
import Link from 'next/link';
import { UserContext } from '../contexts/userContext';

export default function Banner() {

    const [profilPage, setProfilPage] = useState(false);
    const user = useContext(UserContext)

    useEffect(() => {
      const handleDocClick = () => {
        if (profilPage === true) {
          setProfilPage(!profilPage)
        }
      }
      document.addEventListener('click', handleDocClick)

      return () => {
        document.removeEventListener('click', handleDocClick);
      };
    }, [profilPage])

  return (
    <div className='banner'>
      <div className='banner-content'>
        <div className='banner-nav'>
          <Link className='banner-logo-link banner-nav-elem' href='/'><Image className='banner-logo' src={logoBoug} alt='Logo Bougainville' /></Link>
          <p className='banner-nav-elem'><a href='/'>ACCUEIL</a></p>
          <p className='banner-nav-elem'><a href='/fragments'>FRAGMENTS</a></p>
        </div>
        <div className='banner-nav-end'>
          { user?.isLogged ? <FontAwesomeIcon onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' icon={faUser} /> :
          <div className='flex items-center justify-end'>
            <Link href='/login' className='mr-5 hover:text-gray-300 transition-colors'>Connexion</Link>
            <Link href='/register' className='hover:text-gray-300 hover:border-gray-300 transition-colors border p-2 rounded-lg '>S&apos;enregistrer</Link>
          </div>}
        </div>
      </div>
      { profilPage ? <div className='banner-profil-panel'>
        <ul className='banner-list'>
          <Link href='/profil' className='banner-profil-link'><li className='banner-list-item'>Profil</li></Link>
          <Link href='/options' className='banner-profil-link'><li className='banner-list-item'>Options</li></Link>
          <div className='banner-div-logout'>
            <a href='/logout'><li className='banner-list-item'>Déconnexion</li></a>
          </div>
        </ul>
      </div> : null }
    </div>
  )
}
