'use client'
import React, {useState} from 'react'
import {UserDetailContext} from "../../context/UserDetailContext";
import Header, {User} from "@/app/_components/Header";
import {CartContext} from "../../context/CartContext";
import Footer from "@/app/_components/Footer";

const Provider = ({children}: Readonly<{children: React.ReactNode}>) => {
    const [userDetail, setUserDetail] = useState<User | undefined>(undefined)
    const [cart, setCart] = useState([]);





    return (
        <div>
            <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
                <CartContext.Provider value={{cart, setCart}}>
                    <Header/>
                    {children}
                    <Footer/>
                </CartContext.Provider>

            </UserDetailContext.Provider>
            </div>
    )
}
export default Provider
