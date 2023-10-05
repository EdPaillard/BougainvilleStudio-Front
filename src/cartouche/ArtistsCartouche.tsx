import React from 'react'
import { SocialMedias } from '../models/socialMedias'

import './Cartouche.css'

type Props = {
    artist: string,
    artistDescription: JSX.Element
    image: string,
    socialNetwork: any
    linkRS: SocialMedias,
    bgColor: React.CSSProperties
}

const ArtistsCartouche = ({artist, artistDescription, image, socialNetwork, linkRS, bgColor}: Props) => {
  return (
    <div className={`${image} text-white h-full flex flex-col overflow-hidden cart-full`}>
        <div className='arts-cartouche-body flex-1 flex items-end'>
            <div className='h-48 px-6 pb-10'>
                <p className='font-black italic h-full overflow-scroll p-3 hide-scroll'>
                    <strong className='text-3xl font-black'>{artist}</strong><br/>{artistDescription}
                </p>
            </div>
        </div>
        <div className='h-20 relative'>
            <div className='cartouche-footer flex justify-center items-center' style={bgColor}>
                <a className='cartouche-link-icon' href={linkRS["link1"]}>{socialNetwork[linkRS["icon1"]]}</a>
                <a className='cartouche-link-icon' href={linkRS["link2"]}>{socialNetwork[linkRS["icon2"]]}</a>
            </div>
        </div>
    </div>
  )
}

export default ArtistsCartouche