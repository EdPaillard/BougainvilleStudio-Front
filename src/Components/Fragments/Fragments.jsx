import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader"

import Cartouche from '../Cartouche/Cartouche';

import './Fragments.css'

export default function Fragments() {

    const [frags, setFrags] = useState()

    useEffect(() => {
        axios.get('http://localhost:4000/fragment') // http://162.19.66.30:5000/fragment
        .then(res => {
            console.log(res.data.data);
            setFrags(res.data.data);
        })
    }, [])

  return (
    <div className='fragments-body'>
        {frags ? <div className='fragments-frags'>
            {frags.map((elem) => {
                return <div key={elem.id} className='fragments-cartouche'><Cartouche key={elem.id} id={elem.id} image={elem.miniature.mini} color={'gold'} number={elem.number} title={elem.title.toUpperCase()} /></div>
            })}
        </div> : <div className='fragments-spinner'>
            <MoonLoader color='rgba(250,250,250,1)'/>
            </div>}
    </div>
  )
}
