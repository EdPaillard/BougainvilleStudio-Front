import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { getFragByID } from '../services/FragmentsService';
import { Fragment } from '../models/fragments';

type Props = {
    id: string,
    contentID: number
}

function AudioFragment({id, contentID}: Props) {

    const [fragMeta, setFragMeta] = useState<Fragment>()

    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    useEffect(() => {
        const fetchData = async () => {
            const frag = await getFragByID(id.toString())
            setFragMeta(frag)
        }
        fetchData()
    }, [id])

  return (
    <div className='h-full flex flex-col align-middle videofrag bg-black'>
        { fragMeta ? (<div className='videofrag w-auto flex flex-col'>
            {/* <div className='h-auto p-16 w-auto box-border'>
                <h1 className='text-white box-border text-5xl flex justify-between font-bold'>{fragMeta.title.toUpperCase()} <span>#{fragMeta.number}</span></h1>
                <p className='text-white box-border mt-5 text-2xl'>{fragMeta.description}</p>
            </div> */}
            <div className='h-auto flex justify-center'>
                <audio className=' h-auto w-3/4 mx-auto' controls autoPlay><source src={`${process.env.REACT_APP_API_URL}/content/${contentID}`} type='audio/wav'/></audio> 
            </div>
        </div> ): (<MoonLoader color='rgba(250,250,250,1)'/>)}
    </div>
  )
}

export default AudioFragment