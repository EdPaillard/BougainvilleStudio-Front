import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Banner.css'

export default function Banner() {

    const [profilPage, setProfilPage] = useState(false);

  return (
    <div className='banner'>
      <div className='banner-content'>
        <div className='banner-nav'>
          <a className='banner-logo-link banner-nav-elem' href='/home'><img className='banner-logo' src='./logo_boug.png' alt='Logo Bougainville' /></a>
          <p className='banner-nav-elem'><a href='/home'>ACCUEIL</a></p>
          <p className='banner-nav-elem'><a href='/fragments'>FRAGMENTS</a></p>
        </div>
        <div className='banner-nav-end'>
          <FontAwesomeIcon onClick={() => setProfilPage(!profilPage)} className='banner-profil-icon' icon={faUser} />
        </div>
      </div>
      { profilPage ? <div className='banner-profil-panel'>
        <ul className='banner-list'>
          <a href='/profil' className='banner-profil-link'><li className='banner-list-item'>Profil</li></a>
          <a href='/options' className='banner-profil-link'><li className='banner-list-item'>Options</li></a>
          <div className='banner-div-logout'>
            <a href='/logout'><li className='banner-list-item'>Déconnexion</li></a>
          </div>
        </ul>
      </div> : null }
    </div>
  )
}
