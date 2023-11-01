import { User } from "@/models/users"
import { createContext } from "react"

type UserContextType = {
    user: User | null,
    isAuthenticated: boolean,
    updateUser: (value: User | null) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    isAuthenticated: false,
    updateUser: (value: User | null) => { }
})

export default UserContext