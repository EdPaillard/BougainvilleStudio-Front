export type Fragment = {
    id: number,
    title: string,
    description: string,
    number: number,
    miniature: {
        id: number,
        bg_color: Array<number>
    },
    contents: [
        {
            id: number,
            type: string
        }
    ]
}

export type ContentSample = [
    {
        id: number,
        type: string
    }
]

export type Content = {
    content: string
}