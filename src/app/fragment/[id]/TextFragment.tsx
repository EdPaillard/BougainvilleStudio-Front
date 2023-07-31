import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import https from 'https';
import { Fragment } from '@/app/models/fragments'
import MoonLoader from 'react-spinners/MoonLoader'

import { texts } from '@/app/models/writtenFrags'

type Props = {
    id: number,
    contentID: number
}

const TextFragment = ({id, contentID}: Props) => {
    const [fragMeta, setFragMeta] = useState<Fragment>()

    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    axios.defaults.httpsAgent = agent;

    useEffect(() => {
        const fetchData = async () => {
            const response: AxiosResponse<Fragment> = await axios.get(`${process.env.API_URL}/fragment/meta/${id}`)
            const datas = response.data
            setFragMeta(datas)
        }
        fetchData()
    }, [id])
  return (
    <div className='h-full flex flex-col justify-center align-middle '>
        { fragMeta ? (<div className='h-full w-auto flex flex-col'>
            <div className='h-auto p-16 w-auto box-border'>
                <h1 className='text-white box-border text-5xl flex justify-between font-bold'>{fragMeta.title.toUpperCase()} <span>#{fragMeta.number}</span></h1>
                <p className='text-white box-border mt-5 text-2xl'>{fragMeta.description}</p>
            </div>
            <div className='h-auto flex-1 flex justify-center text-white'>
              {texts[contentID]}
            </div>
        </div> ): (<MoonLoader color='rgba(250,250,250,1)'/>)}
    </div>
  )
}

export default TextFragment