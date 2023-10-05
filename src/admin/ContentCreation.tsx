import { useState } from 'react'
import CreationPanel from './CreationPanel'
import { User } from '../models/user'

type Props = {
    admin: User
}

export default function ContentCreation({admin}: Props) {

    const [isDisplay, setIsDisplay] = useState({
        frag: false,
        troph: false,
        timelines: false
    })

    const handleClick = () => {
        setIsDisplay({
            frag: true,
            troph: false,
            timelines: false
        })
    }
    const handleClick2 = () => {
        setIsDisplay({
            frag: false,
            troph: true,
            timelines: false
        })
    }
    const handleClick3 = () => {
        setIsDisplay({
            frag: false,
            troph: false,
            timelines: true
        })
    }

  return (
    <div className='px-10 flex box-border'>
        <div className='w-1/3'>
            <div className='h-full flex flex-col justify-evenly'>
                <div onClick={handleClick} className='cursor-pointer rounded-md bg-slate-400 w-2/3 h-40 my-5 flex justify-center items-center text-white text-2xl hover:bg-gradient-to-br from-slate-400 to-slate-800 border-4 border-white'>Créer un Fragment</div>
                <div onClick={handleClick2} className='cursor-pointer rounded-md bg-slate-500 w-2/3 h-40 my-5 flex justify-center items-center text-white text-2xl hover:bg-gradient-to-br from-slate-500 to-slate-900 border-4 border-white'>Créer un Trophée</div>
                <div onClick={handleClick3} className='cursor-pointer rounded-md bg-slate-600 w-2/3 h-40 my-5 flex justify-center items-center text-white text-2xl hover:bg-gradient-to-br from-slate-600 to-slate-950 border-4 border-white'>Voir les Timelines</div>
            </div>
        </div>
        <CreationPanel admin={admin} isDisplay={isDisplay} />
    </div>
  )
}