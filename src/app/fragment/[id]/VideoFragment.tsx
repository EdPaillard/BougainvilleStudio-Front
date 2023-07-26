import React, { useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse, CancelTokenSource } from 'axios'
import { Content, Fragment } from '@/app/models/fragments'
import { Stream } from 'stream'
import MoonLoader from 'react-spinners/MoonLoader'

type Props = {
    id: number,
    contentID: number
}

const VideoFragment = ({id, contentID}: Props) => {

    const [fragMeta, setFragMeta] = useState<Fragment>()

    useEffect(() => {
        const fetchData = async () => {
            const response: AxiosResponse<Fragment> = await axios.get(`${process.env.API_URL}/fragment/meta/${id}`)
            const datas = response.data
            setFragMeta(datas)

        }
        fetchData()

    }, [id])
    
  return (
    <div className='h-full flex flex-col align-middle videofrag'>
        { fragMeta ? (<div className='h-full w-auto flex flex-col'>
            <div className='h-auto p-16 w-auto box-border'>
                <h1 className='text-white box-border text-5xl flex justify-between font-bold'>{fragMeta.title.toUpperCase()} <span>#{fragMeta.number}</span></h1>
                <p className='text-white box-border mt-5 text-2xl'>{fragMeta.description}</p>
            </div>
            <div className='h-auto flex-1 flex justify-center'>
                <video className=' h-auto w-2/4 mx-auto' controls autoPlay><source src={`${process.env.API_URL}/content/${contentID}`} type='video/mp4'/></video> 
            </div>
        </div> ): (<MoonLoader color='rgba(250,250,250,1)'/>)}
    </div>
  )
}

export default VideoFragment