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
            const response: AxiosResponse<Fragment> = await axios.get(`http://localhost:4000/fragment/meta/${id}`)
            const datas = response.data
            console.log(datas)
            setFragMeta(datas)

        }
        fetchData()

    }, [])
    
  return (
    <div className='h-full flex flex-col justify-center align-middle videofrag'>
        { fragMeta ? (<div className='h-full w-auto flex flex-col'>
            <div className='h-auto p-16 w-auto box-border'>
                <h1 className='text-white box-border text-5xl flex justify-between'>{fragMeta.title.toUpperCase()} <span>#{fragMeta.number}</span></h1>
                <p className='text-white box-border mt-5 text-lg'>{fragMeta.description}</p>
            </div>
            <div className='h-auto flex-1 flex justify-center'>
                <video className=' h-auto w-3/4 mx-auto' controls autoPlay><source src={`http://localhost:4000/content/${contentID}`} type='video/mp4'/></video> 
            </div>
        </div> ): (<MoonLoader color='rgba(250,250,250,1)'/>)}
    </div>
  )
}

export default VideoFragment