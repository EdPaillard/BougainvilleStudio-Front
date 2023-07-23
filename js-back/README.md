Home()/Fragments() => Loading(
    const frags = fetchFrags()
    frags = {
        id,
        [{content, type}],
        name,
        description,
        number
    }
) => FragmentUI(
    fragmentUI = []
    contents.foreach(element => {
        type = element.type
        switch (type) {
            case "text"
                fragmentUI.push(TextFragment(frags))
                break;
            case "audio"
                fragmentUI.push(AudioFragment(frags))
                break;
            case "video"
                fragmentUI.push(VideoFragment(frags))
                break;
            case "image"
                fragmentUI.push(ImageFragment(frags))
                break;
            default:
                fragmentUI.push(ErrorFragment(frags))
                break;
        }
    })
)