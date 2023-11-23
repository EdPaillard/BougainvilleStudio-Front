import { useEffect, useState } from 'react'

import './Cartouche.css'

type Props = {
    image: string,
    color: Array<number>,
    id: number,
    content: [
        {
            id: number,
            type: string
        }
    ],
    number: number,
    title: string
}

const FragCartouche = ({image, content, color, id, number, title}: Props) => {

    const [contentID, setContentID] = useState<Array<number>>()
    const [contentType, setContentType] = useState<Array<string>>()
    const [black, setBlack] = useState(false)
    const backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]})`

    useEffect(() => {
        let contentID: Array<number> = []
        let contentType: Array<string> = []
        content.forEach(element => {
        contentID.push(element.id)
        contentType.push(element.type)
        });
        setContentID(contentID)
        setContentType(contentType)
        if ((color[0] + color[1] + color[2]) > 700) {
            setBlack(true)
        }
    }, [content, color])

  return (
    contentID !== undefined ? <a href={`/fragment/${id}?content_id=${JSON.stringify(contentID)}&content_type=${JSON.stringify(contentType)}`} className='cart-full overflow-clip overflow-x-visible h-full w-full frag' style={{ backgroundImage: `url(http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/miniature/${image})`}}>
        <div className='flex-1 flex justify-center items-center res-cartouche-body'>
            <p className='text-4xl font-extrabold mt-20'>#{number}</p>
        </div>
        <div className='h-20 relative'>
            <div className='cartouche-footer flex justify-evenly items-center p-2 overflow-hidden' style={{backgroundColor: backgroundColor}}>
                <p className='h-full w-full flex justify-center items-center text-white text-4xl font-black italic text-center' style={{color: black ? 'black' : 'white'}}>
                    {title.toUpperCase()}
                </p>
            </div>
        </div>
    </a> : null
  )
}

//  className="cartouche-a-frag cartouche frag" style={{ backgroundImage: `url(${process.env.API_URL}/miniature/${props.image})`}} 

export default FragCartouche