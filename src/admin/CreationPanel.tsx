import FragmentPanel from './FragmentPanel';
import { User } from '../models/user';

type Props = {
    isDisplay: {
        frag: boolean,
        troph: boolean,
        timelines: boolean
    },
    admin: User
}

export default function CreationPanel({isDisplay, admin}: Props) {    

  return (
    <div className='w-2/3 flex flex-col justify-center items-center'>
        {isDisplay.frag ? <FragmentPanel admin={admin} /> : null}
        {isDisplay.troph ? <div className='bg-slate-200 h-2/3 my-auto creationcontainer rounded-md w-1/2'>
            Créer trop
        </div> : null}
        {isDisplay.timelines ? <div className='bg-slate-200 h-2/3 my-auto creationcontainer rounded-md w-1/2'>
            Créer Timelines
        </div> : null}
    </div>
  )
}