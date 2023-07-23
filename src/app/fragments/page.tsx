"use client"
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import MoonLoader from "react-spinners/MoonLoader"
import { Cartouche } from '../cartouche/Cartouche';
import { Fragment } from '../models/fragments';

import './Fragments.css'

type Props = {}

const FragmentsUI = (props: Props) => {

    const [frags, setFrags] = useState<Array<Fragment>>()

    useEffect(() => {
        const fetchDatas = async () => {
            const response: AxiosResponse<Array<Fragment>> = await axios.get('http://localhost:4000/fragment')
            const datas = response.data
            console.log(datas)
            setFrags(datas)
        }
        fetchDatas()
    }, [])

  return (
    <div className='fragments-body'>
        {frags?.length !== 0 ? <div className='fragments-frags'>
            {frags?.map((elem) => {
                return <Cartouche key={elem.id} id={elem.id} image={elem.miniature.id.toString()} color={'gold'} number={elem.number} title={elem.title.toUpperCase()} content={elem.contents} isFrags={true}/>
            })}
        </div> : <div className='fragments-spinner'>
            <MoonLoader color='rgba(250,250,250,1)'/>
            </div>}
    </div>
  )
}

export default FragmentsUI