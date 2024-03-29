import * as React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import ImageFragment from './ImageFragment';
import AudioFragment from './AudioFragment';
import VideoFragment from './VideoFragment';
import TextFragment from './TextFragment';
import { ContentSample } from '../models/fragments';
import { useParams } from 'react-router-dom';

import "./FragmentUI.css"

export interface IFragmentUIProps {
  params: {
    id: number
  }
}

const FragmentUI: React.FunctionComponent<IFragmentUIProps> = ({params}) => {

  const [displayFragUI, setDisplayFragUI] = React.useState<Array<React.JSX.Element>>([])
  let { fragID } = useParams()
  console.log(fragID)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const contentID = JSON.parse(urlParams.get("content_id")!)
    const contentType = JSON.parse(urlParams.get("content_type")!)
    console.log(urlParams)
    const formatContent: ContentSample = contentID.map((num: number, index: number) => ({
      id: num,
      type: contentType[index]
    }));
    console.log(formatContent)

    let fragmentDisplay: Array<React.JSX.Element> = []

    formatContent.forEach(element => {
      switch (element.type) {
        case "text":
          fragmentDisplay.push(<TextFragment key={element.id} id={fragID as string} contentID={element.id} />)
          break;
        case "image":
          fragmentDisplay.push(<ImageFragment key={element.id} id={fragID as string} contentID={element.id} />)
          break;
        case "audio":
          fragmentDisplay.push(<AudioFragment key={element.id} id={fragID as string} contentID={element.id} />)
          break;
        case "video":
          fragmentDisplay.push(<VideoFragment key={element.id} id={fragID as string} contentID={element.id} />)
          break;
        default:
          fragmentDisplay.push(<TextFragment key={element.id} id={fragID as string} contentID={element.id} />)
          break;
      }
    });
    setDisplayFragUI(fragmentDisplay)
  }, [fragID])

  return (
    <div className='bg-black flex justify-center items-center'>
      {displayFragUI.length !== 0 ? displayFragUI.map((el) => {
        return el
      }) : <MoonLoader color='rgba(250,250,250,1)'/>}
    </div>
  );
}

export default FragmentUI