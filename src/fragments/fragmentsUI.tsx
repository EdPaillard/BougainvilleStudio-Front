import { useEffect, useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader"
import FragCartouche from '../cartouche/FragCartouche';
import { Fragment } from '../models/fragments';
import { listFrags } from '../services/FragmentsService';

import './Fragments.css'

const FragmentsUI = () => {

    const [frags, setFrags] = useState<Array<Fragment> | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const frag = await listFrags()
            setFrags(frag)
        }
        fetchData()
    }, [])

  return (
    <div className='fragments-body'>
        {frags != null ? <div className='fragments-frags'>
            {frags?.map((elem) => {
                return <FragCartouche key={elem.id} id={elem.id} image={elem.miniature.id.toString()} color={elem.miniature.bg_color} number={elem.number} title={elem.title.toUpperCase()} content={elem.contents} /> 
            })}
        </div> : <div className='fragments-spinner'>
            <MoonLoader color='rgba(250,250,250,1)'/>
            </div>}
    </div>
  )
}

export default FragmentsUI
