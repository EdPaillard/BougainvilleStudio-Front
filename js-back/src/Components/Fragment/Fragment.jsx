import React, { useState, useRef, useEffect } from 'react'
import MoonLoader from "react-spinners/MoonLoader"
import { useParams } from "react-router-dom";

import './Fragment.css'
import { texts } from '../../Texts/Texts';

export default function Fragment() {

    const params = useParams()
    const id = params.id;
    const [frags, setFrags] = useState()
    const [content, setContent] = useState([])
    const [mediaSource] = useState(new MediaSource())
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)


    useEffect(() => {
      const fetchFrag = async () => {
        const response = await (await fetch(`http://localhost:4000/fragment/${id}`)).json()
        setFrags({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          types: response.data.types,
          number: response.data.number
        })
      }
      const fetchContent = async () => {
        const response = await (await fetch(`http://localhost:4000/content/${id}`)).json()
        let fragContent = []
        response.data.content.forEach(element => {
          fragContent.push(element)
        });
        setContent(fragContent)
      }
      fetchFrag()
      fetchContent()
    }, [id])

    useEffect(() => {
      mediaSource.addEventListener('sourceopen', setBufferSource())
    }, [content])

    useEffect(() => {
      videoRef.current.src = URL.createObjectURL(mediaSource)
    }, [videoRef])

    const displayUI = () => {
      let fragDisplay = []
      frags.types.forEach(element => {
        fragDisplay.push(selectUI(element))
      });
    }

    const selectUI = (type) => {
      switch (type) {
        case "text":
          return <p>{content}</p>
        case "video":
          return <video ref={videoRef}></video>
        case "audio":
          return <audio ref={audioRef}></audio>
        case "image":
          return <img ref={imageRef} alt='fragment illustration'/>
        default:
          return <p>Something wrong happened, please contact an administrator</p>
      }
    }

    const setBufferSource = () => {
      const sourceBuffer = mediaSource.addSourceBuffer("video/mp4")
      sourceBuffer.appendBuffer()
    }

    return (
      <div>
        {frags ? <div>
          {displayUI}
        </div> : null}
      </div>
    )

}
    

    // useMemo(() => {
    //   axios.get(`http://localhost:4000/fragment/${id}`)
    //     .then(res => {
    //         console.log(res.data.data);
            
    //         setFrags({
    //             id: res.data.data.id,
    //             title: res.data.data.title,
    //             description: res.data.data.description,
    //             number: res.data.data.number
    //         });
    //     })
    // }, [id])

    
    // useEffect(() =>  {
    //   const setMediaSource = async () => {     
    //     const mediaSource = new MediaSource();
    //     /** @type {HTMLVideoElement} */
    //     const video = videoRef.current
    //     video.src = URL.createObjectURL(mediaSource)
    //     console.log(video.src)

    //     /** @type {SourceBuffer} */
    //     const sourceBuffer = await new Promise((resolve, reject) => {
    //       console.log("PROMISE ?")
    //       const getSourceBuffer = () => {
    //         try {
    //           console.log(mediaSource.readyState)
    //           console.log("TRYPROM")
    //           console.log(mediaSource.readyState)
    //           const sourceBuffer = mediaSource.addSourceBuffer('video/mp4')
    //           resolve(sourceBuffer)
    //         } catch (e) {
    //           console.log("REJECT")
    //           reject(e)
    //         }
    //       }
    //       if (mediaSource.readyState === 'open') {
    //         console.log("IFPROMISE")
    //         getSourceBuffer()
    //       } else {
    //         console.log("ELSEPROMISE")
    //         mediaSource.addEventListener('sourceopen', getSourceBuffer())
    //         console.log(mediaSource.readyState)
    //       }
    //     })
  
    //     console.log(sourceBuffer + " SourceBUFFER")
    //     sourceBuffer.appendBuffer(content)
    //     console.log(sourceBuffer.buffered)
    //     sourceBuffer.onupdateend = () => {
    //       mediaSource.endOfStream()
    //       video.play()
    //     }
    //   }

    //   const fetchVideo = async () => {
    //     const response = await fetch(`http://localhost:4000/content/${id}`);
    //     const buf = await response.arrayBuffer();
    //     setContent(buf)

    //     setMediaSource()
    //   };
    //   const fetchFragMeta = async () => {
    //     const response = await (await fetch(`http://localhost:4000/fragment/${id}`)).json()
    //       setFrags({
    //         id: response.data.id,
    //         title: response.data.title,
    //         description: response.data.description,
    //         number: response.data.number
    //       })
    //     await fetchVideo()
    //   }
    //   fetchFragMeta()
    // }, [id, content])

    // useEffect(() => {
    //     axios.get(`http://localhost:4000/fragment/${id}`)
    //     .then(res => {
    //         console.log(res.data.data);
    //         setFrags({
    //             title: res.data.data.title,
    //             description: res.data.data.description,
    //             number: res.data.data.id,
    //             contents: res.data.data.contents,
    //         });
    //     })
    // }, [])

    // const base64ToBlob = (base64Data) => {
    //   const byteCharacters = atob(base64Data);
    //   const byteArrays = [];
  
    //   for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    //     const slice = byteCharacters.slice(offset, offset + 1024);
    //     const byteNumbers = new Array(slice.length);
  
    //     for (let i = 0; i < slice.length; i++) {
    //       byteNumbers[i] = slice.charCodeAt(i);
    //     }
  
    //     const byteArray = new Uint8Array(byteNumbers);
    //     byteArrays.push(byteArray);
    //   }
  
    //   return new Blob(byteArrays, { type: 'video/mp4' });
    // };

    // function selectType({title, type, frag, css}) {
    //     if(type === "audio") {
    //       return <audio controls src={`data:audio/mp3;base64,${frag}`} className={`fragment__content ${css}`}></audio>
    //     }
    //     if(type === "video") {
          // const blob = base64ToBlob(frag);
          // const videoUrl = URL.createObjectURL(blob);
          // console.log(`VIDEOURL ${videoUrl}`)
          // videoRef.current.src = videoUrl;
          // console.log(`VIDEOREF ${videoRef}`)

          // return <video key={frag.id} ref={videoRef} controls className={`fragment__content ${css}`}>
          //   <source src={videoUrl} type="video/mp4" />
          // </video>
          // src={`data:video/mp4;base64,${frag}`}
        // }
        // if(type === "text") {
        //   const formatText = frag.split('\\<br>');
        //   const finalText = [];
        //   formatText.forEach(element => {
        //       finalText.push(<p>{element}</p>);
        //   });
          //   console.log(atob(frag))
          //   let blob = new Blob([Base64.decode(frag), { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }])
          //   let url = URL.createObjectURL(blob)

          //   let reader = new FileReader();
          //   let test = reader.readAsArrayBuffer(blob)

          //   console.log(test)

          // return <iframe src={`${url}`} title={`${title}`} />

          // NUMBER NULL IN DB

    //       const text = texts[frags.number]
    //       return <p key={frags.id} className='text'>{text}</p>
    //     }
    //     if(type === "image") {
    //       return <img alt="fragment content" src={`url(data:image/png;base64,${frag})`} className={`fragment__content ${css}`}/>
    //     }
    // } 

    // function displayContent() {
    //     let fragContent = []
    //     for (let index = 0; index < frags.contents.length; index++) {
    //       console.log("HEY")
    //         const element = frags.contents[index].body;
    //         fragContent.push(selectType({title: frags.title, type: frags.contents[index].type, frag: element}))
    //     }

    //     return fragContent;
    //   }

    // function displayContent() {
    //   let fragContent = []
      // for (let index = 0; index < content.length; index++) {
      //   console.log("HEY")
      //     const element = content.body;
      //     fragContent.push(selectType({title: frags.title, type: "video", frag: element}))
      // }

    //   console.log("HEYHEY")
    //   fragContent.push(selectType({title: frags.title, type: "video", frag: content}))

    //   return fragContent;
    // }


  // return (
  //   <div className='fragment-body'>
        {/* {content ? <div  key={frags.id} className='fragment-frags'>
            <h1 className='fragment-title'>{frags.title}</h1>
            <p className='fragment-description'>{frags.description}</p>
            <div className='fragment-content' key={frags.id}>{displayContent()}</div>
        </div> : <div className='fragment-content fragment-spinner'>
            <MoonLoader color='rgba(250,250,250,1)'/>
            </div>} */}
      {/* <video ref={videoRef} controls className={`fragment__content`}></video>
    </div>
  )
} */}



        // const video = videoRef.current;
        // console.log(video + " video")
        // console.log(mediaSource + " Mediasource")
        
        // video.src = URL.createObjectURL(mediaSource);
        // mediaSource.addEventListener('sourceopen', () => {
        //   if (mediaSource.readyState !== 'open') {
        //     console.log("Mediasource killed")
        //     return
        //   } else {
        //     console.log(mediaSource.readyState)
        //     const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
        //     console.log(sourceBuffer + " sourceBuffer")

        //     let receivedLength = 0;

        //     const processChunk = async ({ done, value }) => {
        //       if (done) {
        //         mediaSource.endOfStream();
        //         return;
        //       }

        //       const chunk = value.buffer;
        //       receivedLength += chunk.byteLength;
        //       console.log(...chunk + " Chunk")

              // Decode the chunk from base64
              // const chunkData = new Uint8Array(chunk);
              // console.log(chunkData + " ChunkData")
              // const chunkString = String.fromCharCode(chunkData);
              // console.log(chunkString + " Chunkstring")
              // const base64Data = btoa(chunkData);
              // console.log(base64Data + " Base64")
              // const buffer = new ArrayBuffer(base64Data)
              // console.log(buffer, " Buffer")

              // Append the chunk to the video buffer
              // sourceBuffer.appendBuffer(chunk);

              // Start playing the video after receiving a few chunks
              // if (receivedLength > 5 * 1024 * 1024) {
              //   video.play()
              // }

              // Continue fetching the next chunk
              // return reader.read().then(processChunk);
            // };
            // return reader.read().then(processChunk);
        //   }
        // });