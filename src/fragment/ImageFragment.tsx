import { useEffect, useState } from 'react'
import { Fragment } from '../models/fragments'
import { getFragByID } from '../services/FragmentsService';
import MoonLoader from 'react-spinners/MoonLoader';

type Props = {
    id: string,
    contentID: number
}

const ImageFragment = ({id, contentID}: Props) => {

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
    <div className='h-full flex flex-col align-middle videofrag'>
        { fragMeta ? (<div className='h-full w-auto flex flex-col'>
            {/* <div className='h-auto p-16 w-auto box-border'>
                <h1 className='text-white box-border text-5xl flex justify-between font-bold'>{fragMeta.title.toUpperCase()} <span>#{fragMeta.number}</span></h1>
                <p className='text-white box-border mt-5 text-2xl'>{fragMeta.description}</p>
            </div> */}
            <div className='h-auto flex-1 flex justify-center'>
                <img className='video h-auto w-full mx-auto' src={`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/content/${contentID.toString()}`} alt='Fragment Content'/>
            </div>
        </div> ): (<MoonLoader color='rgba(250,250,250,1)'/>)}
    </div>
  )
}

export default ImageFragment