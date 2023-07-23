"use client"
import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArtstation } from '@fortawesome/free-brands-svg-icons';

import { SocialMedias } from '../models/socialMedias';
import DisplayCartouche from './DisplayCartouche';

import './Cartouche.css';
import FragmentCartouche from './FragmentCartouche';

export interface ICartoucheProps {
    image: string,
    color: string,
    id?: number,
    number?: number,
    title?: string,
    text?: string,
    linkRS?: SocialMedias,
    artist?: string,
    content?: [
      {
        id: number,
        type: string
      }
    ],
    isFrags: boolean
}

export function Cartouche (props: ICartoucheProps) {

  const socialNetwork: any = {
    "instagram": <FontAwesomeIcon className='cartouche-icon' icon={faInstagram}/>,
    "facebook": <FontAwesomeIcon className='cartouche-icon' icon={faFacebook} />,
    "youtube": <FontAwesomeIcon className='cartouche-icon' icon={faYoutube} />,
    "artstation": <FontAwesomeIcon className='cartouche-icon' icon={faArtstation} />,
    "github": <FontAwesomeIcon className='cartouche-icon' icon={faGithub} />,
  };

  const [contentID, setContentID] = React.useState<Array<number>>()
  const [contentType, setContentType] = React.useState<Array<string>>()

  React.useEffect(() => {
    let contentID: Array<number> = []
    let contentType: Array<string> = []
    props.content?.forEach(element => {
      contentID.push(element.id)
      contentType.push(element.type)
    });
    setContentID(contentID)
    setContentType(contentType)
    console.log(props.image)
  }, [])

  return (
    props.number === undefined ? (
    <DisplayCartouche
      artist={props.artist} 
      text={props.text} 
      color={props.color} 
      linkRS={props.linkRS!} 
      socialNetwork={socialNetwork} 
      title={props.title} 
      image={props.image} />
    ) : (
      contentID?.length !== 0 ? (
      <FragmentCartouche
        image={props.image} 
        id={props.id!}
        color={props.color}
        contentID={contentID!}
        contentType={contentType!}
        number={props.number}
        title={props.title!}
        isFrags={props.isFrags} />
      ) : null
    )
  );
}

// data:image/png;base64,${props.image}