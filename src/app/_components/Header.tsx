'use client'
import React, {useContext, useEffect, useState} from 'react'
import Image from "next/image";
import {ArrowBigDownDashIcon, MenuIcon, PackageOpenIcon, ShoppingCart, UserIcon, XIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {UserDetailContext} from "../../../context/UserDetailContext";
import {CartContext} from "../../../context/CartContext";
import Link from "next/link";
import {LoaderOne} from "@/components/ui/loader";
import {redirect} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {menu} from "../../../constant";

export type User = {
    email: string;
    name: string;
    picture: string
}

const Header = () => {
    const {cart, setCart} = useContext(CartContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const [user, setUser] = useState<User>()
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    useEffect(() => {

        if (typeof  window !== undefined) {
            const raw = localStorage.getItem('tokenResponse');
            let tokenResponse;

            try {
                tokenResponse = raw ? JSON.parse(raw) : null;
                if (tokenResponse) {
                    GetUserProfile(tokenResponse.access_token);
                }
            } catch (e) {
                console.error("Invalid tokenResponse JSON:", e);
                localStorage.removeItem('tokenResponse');
            }
            if (tokenResponse) {
               GetUserProfile(tokenResponse?.access_token)
            }
        }


    }, [!userDetail])



    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {

            localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse))
           await GetUserProfile(tokenResponse?.access_token)
            //save to db and share throught of application
        },
        onError: errorResponse => console.log(errorResponse)
    })


    const GetUserProfile = async (access_token: string) => {
        setLoading(true)
        try {
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
              {headers: {Authorization: 'Bearer ' + access_token}})


          setUser(userInfo?.data)
          setUserDetail(userInfo?.data)
         await SaveNewUser(userInfo?.data)
      } catch (error) {
          localStorage.setItem('tokenResponse', '')
      }
        setLoading(false)

    }

    const SaveNewUser = async (user:User) => {
        setLoading(true)
        const result = await axios.post('/api/users', {
            name: user.name,
            email: user.email,
            picture: user.picture
        })

        setLoading(false)
    }
    useEffect(() => {

            GetCartList()

    }, [userDetail?.email])

    const handleLogout = () => {
        localStorage.removeItem('tokenResponse');
        setUser(undefined);
        setUserDetail(undefined);
        setCart([]);


        window.location.href = '/';
    };



    const GetCartList = async () => {
        const result = await axios.get('/api/cart?email=' + userDetail?.email)


        setCart(result.data)
    }

    if (loading ) {
        return <LoaderOne/>
    }




    return (
        <div className='w-full'>

            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
                />
            )}


            <div className={`fixed z-40 top-0 left-0 h-full w-[250px] bg-white dark:bg-zinc-900 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-300 dark:border-zinc-700">
                    <Image src='/logo.png' alt='logo' className='rounded-xl' width={40} height={40} />
                    <XIcon className="cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
                <ul className="p-4 space-y-4">
                    {menu.map((item, idx) => (
                        <li key={idx} onClick={() => setIsMobileMenuOpen(false)}>
                            <Link href={item.path} className="block text-zinc-800 dark:text-zinc-100 hover:text-[#81dd1f] transition">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href='/carts' className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                            <ShoppingCart size={20} />
                            Корзина
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={handleLogout} className="text-red-600 hover:text-red-400 transition">Выйти</button>
                        ) : (
                            <Button
                                onClick={() => googleLogin()}
                                className="bg-[#81dd1f] text-black hover:bg-[#6cba1a] w-full"
                            >
                                Войти через Google
                            </Button>
                        )}
                    </li>
                </ul>
            </div>


            <header className="flex items-center  justify-between px-6 md:px-16 py-4 w-full">
                <div className="flex items-center gap-4">

                        <MenuIcon className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
                        <Link href='/'>
                            <Image src='/logo.png' alt='logo' className='rounded-xl' width={60} height={60} />
                        </Link>
                    </div>


                <ul className='hidden md:flex gap-5 items-center'>
                    {menu.map((item, index) => (
                        <li key={index} className='text-lg hover:text-[#81dd1f] cursor-pointer transition'>
                            <Link href={item?.path}>{item?.name}</Link>
                        </li>
                    ))}
                </ul>


                <div className='flex items-center gap-5'>
                    <div className='relative'>
                        <Link href='/carts'>
                            <ShoppingCart />
                            <span className='absolute -right-2 -top-2 w-[15px] h-[15px] text-xs flex items-center justify-center bg-[#81dd1f] text-black rounded-full'>
                                {cart?.length ?? 0}
                            </span>
                        </Link>
                    </div>

                    {user ? (
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} width={40} height={40} className='rounded-full cursor-pointer' alt={user?.name} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col'>
                                    <Link href='/orders'>
                                        <p className='py-3 px-4 hover:bg-neutral-200 transition cursor-pointer flex items-center gap-2'>
                                            <PackageOpenIcon />
                                            Заказы
                                        </p>
                                    </Link>
                                    <Link href='/profile'>
                                        <p className='py-3 px-4 hover:bg-neutral-200 transition cursor-pointer flex items-center gap-2'>
                                            <UserIcon />
                                            Профиль
                                        </p>
                                    </Link>
                                    <p onClick={handleLogout} className='py-3 px-4 hover:bg-neutral-200 transition cursor-pointer flex items-center gap-2'>
                                        <ArrowBigDownDashIcon />
                                        Выйти
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Button
                            className='hidden md:flex items-center gap-2 bg-white text-gray-800 border border-neutral-500 hover:bg-neutral-100 hover:scale-105 transition'
                            onClick={() => googleLogin()}
                        >
                            <Image src="/google.png" width={30} height={30} alt="" />
                            Войти
                        </Button>
                    )}
                </div>
            </header>
            </div>
    )
}
export default Header
