import React from 'react'
import Link from 'next/link'

type Props = {
    image: string,
    color: string,
    id: number,
    contentID: Array<number>,
    contentType: Array<string>,
    number: number,
    title: string,
    isFrags?: boolean
}

const FragmentCartouche = (props: Props) => {
  return (
    <Link href="/fragment/[id]?content_id=[content_id]&content_type=[content_type]" as={`/fragment/${props.id}?content_id=${JSON.stringify(props.contentID)}&content_type=${JSON.stringify(props.contentType)}`} className="cartouche-link-frag cartouche frag" style={{ backgroundImage: `url(${process.env.API_URL}/miniature/${props.image})`}} > 
      <div className={props.isFrags ? 'cartouche-body-frag' : 'cartouche-body'}>
          <div className='cartouche-text'>
            <div className='cartouche-number'>
              <div className='cartouche-number-inner'># {props.number}</div>
            </div>
          </div>
          <div className={`cartouche-footer ${props.color}`}>
              <div className='cartouche-frag-title'>
                {props.title}
              </div>
          </div>
      </div>
    </Link>
  )
}

export default FragmentCartouche