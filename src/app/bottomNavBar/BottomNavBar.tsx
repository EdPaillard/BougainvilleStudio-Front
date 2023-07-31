import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import './BottomNavBar.css'
import Link from 'next/link'

type Props = {}

const BottomNavBar = (props: Props) => {
  return (
    <nav className='w-full fixed z-10 bg-black h-fit bottom-0 p-5 bottom-nav-bar'>
        <Link href={'/'}><FontAwesomeIcon className='h-8' icon={faHouse} style={{color: "#ffffff",}}/></Link>
        <Link href={'/fragments'}><FontAwesomeIcon className='h-8' icon={faPuzzlePiece} style={{color: "#ffffff",}}/></Link>
    </nav>
  )
}

export default BottomNavBar