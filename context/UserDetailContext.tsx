import {createContext} from 'react'
import {User} from "@/app/_components/Header";

export const UserDetailContext = createContext<User | undefined>()