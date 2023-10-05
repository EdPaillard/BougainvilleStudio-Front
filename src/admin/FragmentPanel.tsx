import { useState } from 'react'
import MetaPanel from './MetaPanel';
import ContentPanel from './ContentPanel';
import MiniPanel from './MiniPanel';
import { User } from '../models/user';


type Props = {
    admin: User
}

export default function FragmentPanel({admin}: Props) {

    const [fragId, setFragId] = useState(0)
    const [activeDiv, setActiveDiv] = useState(1)
    const [alert, setAlert] = useState(false)

  return (
    <div className='bg-slate-200 h-1/2 my-auto creationcontainer rounded-md w-1/2'>
        <MetaPanel admin={admin} setFragId={setFragId} activeDiv={activeDiv} setActiveDiv={setActiveDiv} alert={alert} setAlert={setAlert}/>
        <ContentPanel admin={admin} fragId={fragId} activeDiv={activeDiv} alert={alert} setActiveDiv={setActiveDiv} setAlert={setAlert} />
        <MiniPanel admin={admin} fragId={fragId} activeDiv={activeDiv} alert={alert} setActiveDiv={setActiveDiv} setAlert={setAlert} />
    </div>
  )
}