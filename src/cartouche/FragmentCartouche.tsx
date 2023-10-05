// import { faFileLines, faHeadphones, faImage, faVideo } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  // const mediaIcon: Map<string,JSX.Element> = new Map<string, JSX.Element>([
  //   ["audio", <FontAwesomeIcon key={'audio'} className='text-xl text-white' icon={faHeadphones}/>],
  //   ["video", <FontAwesomeIcon key={'video'} className='text-xl text-white' icon={faVideo}/>],
  //   ["text", <FontAwesomeIcon key={'text'} className='text-xl text-white' icon={faFileLines}/>],
  //   ["image", <FontAwesomeIcon key={'image'} className='text-xl text-white' icon={faImage}/>]
  // ]);

  // const [mediaIconDisplay, setMediaIconDisplay] = useState<Array<JSX.Element>>([])

  // useEffect(() => {
  //   props.contentType.forEach(el => {
  //     let media: JSX.Element = mediaIcon.get(el)!
  //     setMediaIconDisplay(mediaIconDisplay => [...mediaIconDisplay, media])
  //   });
  // }, [props.contentType])

  return (
    <a href={`/fragment/${props.id}?content_id=${JSON.stringify(props.contentID)}&content_type=${JSON.stringify(props.contentType)}`} className="cartouche-a-frag cartouche frag" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/miniature/${props.image})`}} > 
      <div className={props.isFrags ? 'cartouche-body-frag' : 'cartouche-body'}>
          <div className='cartouche-text'>
            <div className='cartouche-number'>
              {/* {props.contentType? mediaIconDisplay.map((el) => {
                return el
              }) : null} */}
              <div className='cartouche-number-inner text-white text-4xl'>#{props.number}</div>
            </div>
          </div>
          <div className={`cartouche-footer ${props.color}`}>
              <div className='cartouche-frag-title text-white text-3xl'>
                {props.title}
              </div>
          </div>
      </div>
    </a>
  )
}

export default FragmentCartouche