"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faUser } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../contexts/userContext';
import logoBoug from '../../../public/logo_simpl.png'
import logosimpl from '@/../public/logo_simpl.png'

import './Banner.css'

export default function Banner() {

  const [profilPage, setProfilPage] = useState(false);
  const [mobileCreds, setMobileCreds] = useState(false)
  const user = useContext(UserContext)

  useEffect(() => {
    const handleDocClick = () => {
      if (profilPage === true) {
        setProfilPage(!profilPage)
      }
      if (mobileCreds === true) {
        setMobileCreds(!mobileCreds)
      }
    }
    document.addEventListener('click', handleDocClick)

    return () => {
      document.removeEventListener('click', handleDocClick);
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
          <Link className='banner-logo-link banner-nav-elem' href='/'><Image className='banner-logo' src={logosimpl} alt='Logo Bougainville' /></Link>
          <p className='banner-nav-elem'><a href='/'>ACCUEIL</a></p>
          <p className='banner-nav-elem'><a href='/fragments'>FRAGMENTS</a></p>
          <FontAwesomeIcon className='cursor-pointer h-6' icon={faExpand} onClick={fullscreen} />
        </div>
        <div className='banner-nav-end'>
          { user?.isLogged ? <FontAwesomeIcon onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' icon={faUser} /> :
          <div className='flex items-center justify-end banner-creds-btn'>
            <Link href='/login' className='mr-5 hover:text-gray-300 transition-colors'>Connexion</Link>
            <Link href='/register' className='hover:text-gray-300 hover:border-gray-300 transition-colors border p-2 rounded-lg '>S&apos;enregistrer</Link>
          </div>}
          <FontAwesomeIcon onClick={() => setMobileCreds(!mobileCreds)} className='banner-profil-icon-mobile' icon={faUser} /> 
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
      { mobileCreds ? <div className='banner-profil-panel'>
        <ul className='banner-list'>
          <Link href='/login' className='banner-profil-link'><li className='banner-list-item'>Connexion</li></Link>
        </ul>
      </div> : null }
    </div>
  )
}
