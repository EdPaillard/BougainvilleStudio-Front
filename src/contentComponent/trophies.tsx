import Troph1 from '../assets/trophies/1.png'
import Troph2 from '../assets/trophies/2.png'
import Troph3 from '../assets/trophies/3.png'

export type Trophy = {
    id: number
    picture: string,
    description: string,
    title: string,
    exp: number,
    rarity: string
}


export const trophies: Array<Trophy> = [
    {
        id: 1,
        picture: Troph1,
        description: "1er trophée!",
        title: 'Trophée 1',
        exp: 100,
        rarity: "epique"
    },
    {
        id: 2,
        picture: Troph2,
        description: "2eme trophée !",
        title: 'Trophée 2',
        exp: 50,
        rarity: "rare"
    },
    {
        id: 3,
        picture: Troph3,
        description: "3eme trophée !",
        title: 'Trophée 3',
        exp: 10,
        rarity: "commun"
    }
]