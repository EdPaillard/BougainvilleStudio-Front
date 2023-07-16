import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";

import Cartouche from '../Cartouche/Cartouche'

import './Home.css'

export default function Home() {

    const mainText = "Bougainville est un projet artistique collaboratif crossmedia. Il vous plonge dans les aventures d'un capitaine de la Marine, lancé dans l'exploration balbutiante d'un vaste univers. Mêlant Grandes Découvertes et Odyssée, Bougainville recherche autant l'aventure que la réflexion sur l'Homme devant l'inconnu, l'imense, devant eux-mêmes ... La narration sera éclatée, explosée dans le temps, et publiée dans l'ordre de création sous forme de fragments. Il sera de la reponsabilité du lecteur de reconstruire une chronologie qui lui est propre, de se faire son opinion sur les faits présentés.";
    const user1Text = "Auteur, codeur, tracteur, à l'heure, Edouard n'a pas peur. Genre, du tout. De personne. Comme Lucky Luke."
    const user2Text = "Concept Artist, Story Artist, 3D Generalist, World Builder, Dream Maker, Murderer. Attention"
    const user3Text = "Musicien, Compositeur, Ingé Son, Sound Design, Ambiances sonores, Lol, Mdr, Je déconne. Deadlines."

    const [sampleFrags, setSampleFrags] = useState()

    useEffect(() => {
        axios.get('http://localhost:4000/fragment/sample') // http://162.19.66.30:5000/fragment/sample
        .then(res => {
            console.log(res.data.data);
            setSampleFrags(res.data.data);
        })
    }, [])

    return (
        <div className="home home-grid">
            <div className='left'>
                <div className='top-left'>
                    <Cartouche image={'main'} color={'green'} text={mainText} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}}/>
                </div>
                <div className='bottom-left'>
                    <div className='bottom-left-left'>
                        {sampleFrags ? <Cartouche id={sampleFrags[0].id} image={sampleFrags[0].miniature.mini} color={'blue'} number={sampleFrags[0].number} title={sampleFrags[0].title.toUpperCase()}/> : <MoonLoader color='rgba(250,250,250,1)'/>}
                    </div>
                    <div className='bottom-left-right'>
                        {sampleFrags ? <Cartouche id={sampleFrags[1].id} image={sampleFrags[1].miniature.mini} color={'gold'} number={sampleFrags[1].number} title={sampleFrags[1].title.toUpperCase()}/> : <MoonLoader color='rgba(250,250,250,1)'/>}
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='right-left'>
                    <Cartouche image={'user1'} color={'red'} text={user1Text} artist={'EDOUARD PAILLARD'} linkRS={{link1: "https://github.com/", link2: "https://www.youtube.com/", icon1: "github", icon2: "youtube"}}/>
                </div>
                <div className='right-center'>
                    <Cartouche image={'user2'} color={'yellow'} text={user2Text} artist={'ANTOINE PETITEAU'} linkRS={{link1: "https://www.artstation.com", link2: "https://www.instagram.com/", icon1: "artstation", icon2: "instagram"}}/>
                </div>
                <div className='right-right'>
                    <Cartouche image={'user3'} color={'blue'} text={user3Text} artist={'JULES LUCCIARDI'} linkRS={{link1: "https://www.youtube.com/", link2: "https://www.instagram.com/", icon1: "youtube", icon2: "instagram"}}/>
                </div>
            </div>
        </div>
    )
}

