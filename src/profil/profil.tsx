import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { User } from '../models/user'
import { faFeatherPointed, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Trophy, trophies } from '../contentComponent/trophies'

import Hautbrave from '../assets/hautbrave_heroe.png'

import './Profil.css'

export default function ProfilPage() {

  const [user, setUser] = useState<User | null>(null)
  const [userTrophies, setUserTrophies] = useState<Array<Trophy> | null>(null)
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)

  useEffect(() => {
    const jsonUser = localStorage.getItem('user')

    if (jsonUser) {
      const user: User = JSON.parse(jsonUser)
      setUser(user)
    } else {
      window.location.replace('/login')
    }

    const userTrophId = [1,2,3]
    const cleanTrophies: Array<Trophy> = trophies.filter((trophy) => userTrophId.includes(trophy.id))
    setUserTrophies(cleanTrophies)

  }, [])

  const handleMouseEnter = (id: number) => {
    setActiveTooltip(id)
  }

  return (
    user != null ? <div className='profil bg-black overflow-hidden'>
      <div className='profil-body mx-auto bg-orange-950 bg-opacity-50 flex flex-col justify-center'>
        <div className='profil-banner box-border pb-5'>
          <div className='profil-inner-banner pt-10 mx-auto box-border'>
            <div className='flex'>
              <div className='w-52 h-52 flex'><object className=' w-40 h-40 border border-white' data={`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/pic/${user.id}`} type='image/png'><FontAwesomeIcon className=' w-24 h-24' icon={faUser}/></object></div>
              <div className='ml-6 flex flex-col h-auto'>
                <h1 className='h-12 text-white font-bold text-4xl'>{user.pseudo}</h1>
                <p className='h-full flex items-center text-white'>{user.email}</p>
              </div>
              <div className='flex flex-col justify-between items-end h-auto'>
                <h1 className='text-right text-white font-bold text-4xl'>Niveau 15</h1>
                <a href={`/profil/${user.id}/modify?id=${user.id}`}><button className='bg-opacity-20 w-fit p-2 text-gray-300 rounded-sm hover:text-white hover:bg-opacity-30 bg-white'>Modifier le profil</button></a>
              </div>
            </div>
          </div>
        </div>
        <div className='profil-content flex flex-col p-5'>
          <div className='profil-content-trophys py-5 mx-auto h-fit'>
            <h1 className='trophy h-10 flex items-center pl-3 text-white rounded-t'>Trophées</h1>
            <div className='trophy-inner px-5 pt-7 pb-4 rounded-b flex flex-col justify-between'>
              <div className='trophy-display flex justify-evenly items-center rounded-md'>
                {userTrophies ? userTrophies.map((el) => {
                  return <div className='flex justify-center items-center relative' onMouseEnter={() => {handleMouseEnter(el.id)}} onMouseLeave={() => setActiveTooltip(null)} key={el.id}><img src={el.picture} alt={el.title}/>
                    {activeTooltip === el.id ? <div className='trophy-tooltip flex flex-col justify-start items-start'><h3>{el.title}</h3><div className='flex justify-center items-center'><img src={el.picture} alt={el.title} width={80} height={80}/><p className='text-center'>{el.description}</p></div></div> : null}
                  </div>
                }) : null}
                {/* <img alt='trophy_pic' src='https://picsum.photos/200' className='w-20 h-20 cursor-pointer'/>
                <img alt='trophy_pic' src='https://picsum.photos/200' className='w-20 h-20 cursor-pointer'/>
                <img alt='trophy_pic' src='https://picsum.photos/200' className='w-20 h-20 cursor-pointer'/>
                <img alt='trophy_pic' src='https://picsum.photos/200' className='w-20 h-20 cursor-pointer'/>
                <img alt='trophy_pic' src='https://picsum.photos/200' className='w-20 h-20 cursor-pointer'/> */}
              </div>
              <div className='trophy-stats rounded-md'>
                <div>
                  <p className='pl-3 text-white flex items-start text-4xl h-1/2'>1,812</p>
                  <p className='pl-3 text-gray-400 flex items-center h-1/2'>Succès</p>
                </div>
              </div>
            </div>
          </div>
          <div className='profil-content-timelines py-5 mx-auto h-fit'>
            <h1 className='trophy h-10 flex items-center pl-3 text-white rounded-t relative'>Timelines<div className='trophy-modify absolute right-3 text-right justify-center items-center w-fit hidden'><a href={`/profil/${user.id}/timelines-modify`}><button className=''><FontAwesomeIcon className='mr-2' icon={faFeatherPointed}/>Modifier</button></a></div></h1>
            <div className='trophy-inner px-5 pt-7 pb-4 rounded-b flex flex-col justify-between'>
              <div className='timeline-display flex justify-evenly items-start rounded-md'>
                <img alt='trophy_pic' src='https://picsum.photos/200' className=' px-2 w-full h-20 cursor-pointer'/>
              </div>
              <div className='trophy-stats rounded-md flex justify-center items-center'>
                <div className='trophy-stats-inner rounded-md w-5/6 flex justify-center items-center'>
                  <img alt='trophy_pic' src='https://picsum.photos/200' className='px-2 w-full h-20 cursor-pointer'/>
                </div>
              </div>
            </div>
          </div>
          <div className='profil-content-heroes p-5'>
            <div className='profil-content-heroes-bg rounded flex justify-center items-center'>
              <img src={Hautbrave} alt='hautbrave heroe'/>
            </div>
          </div>
        </div>
      </div>
    </div> : <MoonLoader color='rgba(250,250,250,1)'/>
  )
}

// <img alt='profil picture' src={`${process.env.API_URL}/user/pic/${user.id}`} className='w-52 h-52'/>