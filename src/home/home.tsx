import React, { useState, useEffect } from 'react'
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faArtstation, faGithub } from '@fortawesome/free-brands-svg-icons';

import ArtistsCartouche from '../cartouche/ArtistsCartouche';
import PresCartouche from '../cartouche/PresCartouche';
import FragCartouche from '../cartouche/FragCartouche';
import { Fragment } from '../models/fragments';
import { getNewerToken } from '../services/UserService';
import { getFragSample } from '../services/FragmentsService';
import { User } from '../models/user';

import './Home.css'

export default function Home() {

    const mainText: JSX.Element = <p className='h-full mx-5 hide-scroll'>Bougainville est un projet artistique collaboratif crossmedia. Il vous plonge dans les aventures d&apos;un capitaine de la Marine, lancé dans l&apos;exploration balbutiante d&apos;un vaste univers. Mêlant Grandes Découvertes et Odyssée, Bougainville recherche autant l&apos;aventure que la réflexion sur l&apos;Homme devant l&apos;inconnu, l&apos;immense, devant eux-mêmes...<br/><br/>La narration sera éclatée, explosée dans le temps, et publiée dans l&apos;ordre de création sous forme de fragments. <em className='underline underline-offset-4'>Laissez-vous embarquer, le Bougainville n&apos;attend que vous</em>...</p>; // Laissez-vous embarquer, suivez Hautbrave ou sondez-le...
    const user1Text: JSX.Element = <span className='text-sm'>Auteur, codeur, tracteur, à l&apos;heure, Edouard n&apos;a pas peur. Genre, du tout. De personne. Comme Lucky Luke.</span>
    const user2Text: JSX.Element = <span className='text-sm'>Concept Artist, Story Artist, 3D Generalist, World Builder, Dream Maker, Murderer. Attention</span>
    const user3Text: JSX.Element = <span className='text-sm'>Musicien, Compositeur, Ingé Son, Sound Design, Ambiances sonores, Lol, Mdr, Je déconne. Deadlines.</span>

    const socialNetwork: any = {
        "instagram": <FontAwesomeIcon className='cartouche-icon' icon={faInstagram}/>,
        "facebook": <FontAwesomeIcon className='cartouche-icon' icon={faFacebook} />,
        "youtube": <FontAwesomeIcon className='cartouche-icon' icon={faYoutube} />,
        "artstation": <FontAwesomeIcon className='cartouche-icon' icon={faArtstation} />,
        "github": <FontAwesomeIcon className='cartouche-icon' icon={faGithub} />,
      };

    const [sampleFrags, setSampleFrags] = useState<Array<Fragment> | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const frag = await getFragSample()
            if (frag.length !== 0) {
                setSampleFrags(frag)
            }
        }
        fetchData()
        const refreshToken = async (oldToken: string) => {
            const statusCode = await getNewerToken(oldToken)
            if (statusCode !== 200) {
                window.location.reload()
            }
        }
        if (localStorage.getItem('user')) {
            const jsonUser = localStorage.getItem('user')
            const user: User = JSON.parse(jsonUser!)
            refreshToken(user.token)
        }
    }, [])

    const cssUser1: React.CSSProperties = {backgroundColor: `rgb(224,84,84)`}
    const cssUser2: React.CSSProperties = {backgroundColor: `rgb(216,188,100)`}
    const cssUser3: React.CSSProperties = {backgroundColor: `rgb(72,132,156)`}

    return (
        <div className="home home-grid">
            <div className='left overflow-hidden'>
                <div className='top-left'>
                    <PresCartouche presText={mainText} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}} socialNetwork={socialNetwork}/>
                    {/* <Cartouche image={'main'} color={'green'} text={mainText} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}} isFrags={false}/> */}
                </div>
                <div className='bottom-left'>
                    <div className='bottom-left-left aspect-square'>
                        {sampleFrags != null ? <FragCartouche id={sampleFrags[0].id} image={sampleFrags[0].miniature.id.toString()} color={sampleFrags[0].miniature.bg_color} number={sampleFrags[0].number} title={sampleFrags[0].title.toUpperCase()} content={sampleFrags[0].contents} /> : <MoonLoader color='rgba(250,250,250,1)'/>}
                        {/* {sampleFrags ? <Cartouche id={sampleFrags[0].id} image={sampleFrags[0].miniature.id.toString()} color={'blue'} number={sampleFrags[0].number} title={sampleFrags[0].title.toUpperCase()} content={sampleFrags[0].contents} isFrags={false}/> : <MoonLoader color='rgba(250,250,250,1)'/>} */}
                    </div>
                    <div className='bottom-left-right aspect-square'>
                        {sampleFrags != null ? <FragCartouche id={sampleFrags[1].id} image={sampleFrags[1].miniature.id.toString()} color={sampleFrags[1].miniature.bg_color} number={sampleFrags[1].number} title={sampleFrags[1].title.toUpperCase()} content={sampleFrags[1].contents} /> : <MoonLoader color='rgba(250,250,250,1)'/>}
                        {/* {sampleFrags ? <Cartouche id={sampleFrags[1].id} image={sampleFrags[1].miniature.id.toString()} color={'gold'} number={sampleFrags[1].number} title={sampleFrags[1].title.toUpperCase()} content={sampleFrags[1].contents} isFrags={false}/> : <MoonLoader color='rgba(250,250,250,1)'/>} */}
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='right-left'>
                    <ArtistsCartouche image={'user1'} artist={'EDOUARD PAILLARD'} artistDescription={user1Text} linkRS={{link1: "https://github.com/EdPaillard", link2: "https://www.youtube.com/channel/UCWaR67JPoFNh5A8-ZjFZRig", icon1: "github", icon2: "youtube"}} socialNetwork={socialNetwork} bgColor={cssUser1}/>
                    {/* <Cartouche image={'user1'} color={'red'} text={user1Text} artist={'EDOUARD PAILLARD'} linkRS={{link1: "https://github.com/", link2: "https://www.youtube.com/", icon1: "github", icon2: "youtube"}} isFrags={false}/> */}
                </div>
                <div className='right-center'>
                    <ArtistsCartouche image={'user2'} artist={'ANTOINE PETITEAU'} artistDescription={user2Text} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}} socialNetwork={socialNetwork} bgColor={cssUser2}/>
                    {/* <Cartouche image={'user2'} color={'yellow'} text={user2Text} artist={'ANTOINE PETITEAU'} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}} isFrags={false}/> */}
                </div>
                <div className='right-right'>
                    <ArtistsCartouche image={'user3'} artist={'JULES LUCCIARDI'} artistDescription={user3Text} linkRS={{link1: "https://www.youtube.com/", link2: "https://www.instagram.com/", icon1: "youtube", icon2: "instagram"}} socialNetwork={socialNetwork} bgColor={cssUser3}/>
                    {/* <Cartouche image={'user3'} color={'blue'} text={user3Text} artist={'JULES LUCCIARDI'} linkRS={{link1: "https://www.youtube.com/", link2: "https://www.instagram.com/", icon1: "youtube", icon2: "instagram"}} isFrags={false}/> */}
                </div>
            </div>
        </div>
    )
}

