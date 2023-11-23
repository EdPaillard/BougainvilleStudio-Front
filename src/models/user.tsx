export type User = {
    pseudo: string
    id: string
    email: string
    role: {
        admin: boolean
        moderator: boolean
    }
    token: string
}