import { SocialMedias } from '../models/socialMedias'

type Props = {
    presText: JSX.Element,
    linkRS: SocialMedias,
    socialNetwork: any,
}

const PresCartouche = ({presText, linkRS, socialNetwork}: Props) => {
  return (
    <div className='main cart-full overflow-hidden flex flex-col'>
        <div className='flex-1 flex items-center box-border p-8'>
            <div className='h-full flex items-end text-white font-black italic text-lg'>{presText}</div>
        </div>
        <div className='h-20 relative'>
            <div className='cartouche-footer flex justify-center items-center' style={{backgroundColor: `rgb(48,172,36)`}}>
                <a className='cartouche-link-icon' href={linkRS["link1"]}>{socialNetwork[linkRS["icon1"]]}</a>
                <a className='cartouche-link-icon' href={linkRS["link2"]}>{socialNetwork[linkRS["icon2"]]}</a>
            </div>
        </div>
    </div>
  )
}

export default PresCartouche