import { useState } from "react";
import TextFragment from "../FragTypes/TextFragment";
import AudioFragment from "../FragTypes/AudioFragment";
import VideoFragment from "../FragTypes/VideoFragment";
import ImageFragment from "../FragTypes/ImageFragment";

function Loading({types, id}) {

    const [loading, setLoading] = useState(true)

    const displayUI = (types) => {
        let displayUI = []
        types.forEach(element => {
            switch (element) {
                case "text":
                    displayUI.push(TextFragment(id))
                    break;
                case "audio":
                    displayUI.push(AudioFragment(id))
                    break;
                case "video":
                    displayUI.push(VideoFragment(id))
                    break;
                case "image":
                    displayUI.push(ImageFragment(id))
                    break;
                default:
                    break;
            }
        });
        return displayUI
    }

    return ( loading ? <div>
        ...Loading
    </div> : displayUI(types) );
}

export default Loading;