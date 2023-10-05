import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'

import './BottomNavBar.css'

const BottomNavBar = () => {
  return (
    <nav className='w-full fixed z-10 bg-black h-fit bottom-0 p-5 bottom-nav-bar'>
        <a href={'/'}><FontAwesomeIcon className='h-8' icon={faHouse} style={{color: "#ffffff",}}/></a>
        <a href={'/fragments'}><FontAwesomeIcon className='h-8' icon={faPuzzlePiece} style={{color: "#ffffff",}}/></a>
    </nav>
  )
}

export default BottomNavBar