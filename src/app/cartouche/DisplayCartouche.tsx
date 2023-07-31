import * as React from 'react';

import { SocialMedias } from '../models/socialMedias';

import './Cartouche.css';

type Props = {
    image: string,
    color: string,
    title?: string,
    text?: JSX.Element,
    socialNetwork?: any
    linkRS: SocialMedias,
    artist?: string,
}

const DisplayCartouche = (props: Props) => {
  return (
    <div className={`cartouche ${props.image}`} >
      <div className='cartouche-body'>
          <div className='cartouche-text'>
            <div className='cartouche-text-inner'>
              { props.artist !== undefined ? <h1 className='cartouche-artist'>{props.artist}</h1> : null }
              { props.text !== undefined ? <p className='cartouche-paragraphe text-white'>{props.text}</p> : null }
            </div>
          </div>
          <div className={`cartouche-display-footer ${props.color}`}>
            <div className='cartouche-footer-inner'>
                <a className='cartouche-link-icon' href={props.linkRS["link1"]}>{props.socialNetwork[props.linkRS["icon1"]]}</a>
                <a className='cartouche-link-icon' href={props.linkRS["link2"]}>{props.socialNetwork[props.linkRS["icon2"]]}</a>
            </div>
          </div>
      </div>
    </div>
  )
}

export default DisplayCartouche