import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArtstation } from '@fortawesome/free-brands-svg-icons';
import './Cartouche.css';
import { useNavigate } from 'react-router-dom';

export default function Cartouche({id, image, color, text, artist, number, linkRS, title}) {

  const socialNetwork = {
    "instagram": <FontAwesomeIcon className='cartouche-icon' icon={faInstagram}/>,
    "facebook": <FontAwesomeIcon className='cartouche-icon' icon={faFacebook} />,
    "youtube": <FontAwesomeIcon className='cartouche-icon' icon={faYoutube} />,
    "artstation": <FontAwesomeIcon className='cartouche-icon' icon={faArtstation} />,
    "github": <FontAwesomeIcon className='cartouche-icon' icon={faGithub} />,
  };
  const navigate = useNavigate();

  return (
    number === undefined ? <div className={`cartouche ${image}`} >
      {/* <img className='cartouche-image' src={this.props.image} alt='cartouche background'/> */}
      <div className='cartouche-body'>
          <div className='cartouche-text'>
            <div className='cartouche-text-inner'>
              { artist !== undefined ? <h1 className='cartouche-artist'>{artist}</h1> : null }
              { text !== undefined ? <p className='cartouche-paragraphe'>{text}</p> : null }
            </div>
          </div>
          <div className={`cartouche-footer ${color}`}>
              { linkRS !== undefined ? <div className='cartouche-footer-inner'>
                  <a className='cartouche-link-icon' href={linkRS["link1"]}>{socialNetwork[linkRS["icon1"]]}</a>
                  <a className='cartouche-link-icon' href={linkRS["link2"]}>{socialNetwork[linkRS["icon2"]]}</a>
              </div> : <div className='cartouche-frag-title'>
                {title}
              </div> }
          </div>
      </div>
    </div> : <div onClick={() => navigate(`/fragment/${id}`)} className="cartouche-link-frag cartouche frag" style={{ backgroundImage: `url(data:image/png;base64,${image})`}} >
      {/* <img className='cartouche-image' src={this.props.image} alt='cartouche background'/> */}
      <div className='cartouche-body'>
          <div className='cartouche-text'>
            <div className='cartouche-number'>
              <div className='cartouche-number-inner'># {number}</div>
            </div>
          </div>
          <div className={`cartouche-footer ${color}`}>
              { linkRS !== undefined ? <div className='cartouche-footer-inner'>
                  <a className='cartouche-link-icon' href={linkRS["link1"]}>{socialNetwork[linkRS["icon1"]]}</a>
                  <a className='cartouche-link-icon' href={linkRS["link2"]}>{socialNetwork[linkRS["icon2"]]}</a>
              </div> : <div className='cartouche-frag-title'>
                {title}
              </div> }
          </div>
      </div>
    </div>
  )
  // <a className='cartouche-link-frag' href={`/fragment/${number}`}>
}