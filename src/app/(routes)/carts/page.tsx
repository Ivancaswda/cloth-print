'use client'
import axios from "axios";
import React, {useContext, useEffect, useState} from 'react'
import {CartContext} from "../../../../context/CartContext";
import {Product} from "@/app/_components/PopularProducts";
import {UserDetailContext} from "../../../../context/UserDetailContext";
import {LoaderOne} from "@/components/ui/loader";
import {Loader2Icon, ShoppingCartIcon} from "lucide-react";
import {redirect} from "next/navigation";
import Image from "next/image";
type CartItem = {
    documentId: string,
    products: Product[],
    design:string,
    id:number
}
const Page = () => {



    const [loading, setLoading] = useState<boolean>()
    const {cart, setCart} = useContext(CartContext)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    console.log(cart)

    const removeFromCart = async (documentId:string) => {
        setLoading(true);
        if (!userDetail?.email) {
            console.warn("Email is not loaded yet");
            setLoading(false);
            return;
        }
        try {
            const result = await axios.delete('/api/cart', { data: { documentId } });
            console.log(result);
            await GetCartList(userDetail.email); // await обязательно
        } catch (error) {
            console.error('Error removing from cart:', error);
        } finally {
            setLoading(false);
        }
    }
    console.log(userDetail?.email)

    const GetCartList = async (email:string) => {
        const result = await axios.get('/api/cart?email=' + email)
        console.log(result.data)
        setCart(result.data)
    }
    useEffect(() => {
        if (userDetail?.email) {
            GetCartList(userDetail.email);
        }
    }, [userDetail?.email]);
    console.log(cart)
    const getTotalCartAmount = () => {
        if (!cart || cart.length === 0) return 0;

        const totalPrice = cart?.reduce((total: number, cartItem?: CartItem) => {
            const productsArray = Array.isArray(cartItem?.products)
                ? cartItem.products
                : cartItem?.products
                    ? [cartItem.products]
                    : []; // ← если products вообще нет, вернём пустой массив


            const itemTotal = productsArray.reduce((sum, product) => {

                const hasDesign = cartItem?.design;


                if (hasDesign && hasDesign.trim() !== "") {
                    return sum + (product?.pricing ?? 0);
                } else {
                    return sum + (product?.purePrice ?? 0);
                }
            }, 0);

            return total + itemTotal;
        }, 0);

        return totalPrice;
    };
    console.log(userDetail)

    if (!userDetail) {
        redirect('/')

    }


    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/create-checkout-session', {
                cart,
                email: userDetail?.email,
            });
            if (response.data.url) {
                window.location.href = response.data.url; // Перенаправление на Stripe Checkout
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='px-2 md:px-10 lg:px-20'>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Ваша корзина</h1>
                    </header>

                    <div className="mt-8">
                        {(!cart || cart.length === 0) ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                                <ShoppingCartIcon className="w-16 h-16 mb-4 text-[#81dd1f]"/>
                                <p className="text-lg font-semibold">Ваша корзина пустая</p>
                                <p className="mt-2 text-sm text-gray-400">Походу вы пока еще ничего сюда не добавили.</p>
                                <a
                                    href="/products"
                                    className="mt-6 inline-block rounded-sm bg-[#81dd1f] px-6 py-3 text-white hover:bg-[#81dd1f]/90 transition"
                                >
                                    Смотреть продукты
                                </a>
                            </div>
                        ) : (
                            <ul className="space-y-4 ">
                                {cart?.map((cartItem: CartItem, index: number) => (
                                    <li key={index} className="flex items-center gap-4">
                                        {cartItem?.products[0]?.productImage ? <img
                                            src={cartItem?.products[0]?.productImage[0]?.url}
                                            alt={cartItem.id}
                                            className="size-20 p-2  rounded-sm border-[2px] border-[#81dd1f] object-cover"
                                        /> : <div
                                            className={'size-20  p-2  rounded-sm text-sm flex items-center justify-center border-[2px] border-[#81dd1f] text-center '}>
                                            Нет изображения
                                        </div>}

                                        <img
                                            src={cartItem?.design}
                                            alt='no design'
                                            className="size-20  rounded-sm border-[2px] border-[#81dd1f] object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900 font-medium">{cartItem?.products[0]?.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                                                <div>
                                                    <dt className="inline">Цена: </dt>
                                                    <dd className="inline font-medium"> {cartItem?.design ? cartItem?.products[0]?.pricing : cartItem?.products[0]?.purePrice}</dd>
                                                </div>

                                            </dl>
                                            <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                                                <div>
                                                    <dt className="inline">Размер: </dt>
                                                    <dd className="inline font-medium"> { cartItem?.selectedSize}</dd>
                                                </div>

                                            </dl>
                                        </div>

                                        <div className="flex flex-1 items-center justify-end gap-2">
                                            <form>
                                                <label htmlFor="Line1Qty" className="sr-only">Количество </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    disabled={true}
                                                    defaultValue="1"
                                                    id="Line1Qty"
                                                    className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                />
                                            </form>
                                            {loading ? <Loader2Icon className='animate-spin text-green-300'/> :
                                                <button className="text-gray-600 transition hover:text-red-600"
                                                        onClick={() => removeFromCart(cartItem?.documentId)}>
                                                    <span className="sr-only">Удалить</span>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>}

                                        </div>
                                    </li>
                                ))}


                            </ul>
                        )}

                        {/* Остальной UI, например, итоги заказа */}
                        {cart && cart.length > 0 && (
                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Всего (без скидки)</dt>
                                            <dd>£{getTotalCartAmount()?.toFixed(2) ?? '0.00'}</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>Скидка (20%)</dt>
                                            <dd>-£{(getTotalCartAmount() * 0.2).toFixed(2)}</dd>
                                        </div>

                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Итого</dt>
                                            <dd>£{(getTotalCartAmount() * 0.8).toFixed(2)}</dd>
                                        </div>
                                    </dl>

                                    <button className="flex w-full   py-2 justify-end">
                                        <a
                                            href="/orders"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCheckout();
                                            }}
                                            className="block hover:scale-105 transition flex font-bold items-center gap-2 bg-[#81dd1f] hover:bg-[#81dd1f]/90 rounded-sm px-5 py-2 text-sm text-black transition cursor-pointer"
                                        >

                                            {loading ? <Loader2Icon className='animate-spin text-black'/> : <>
                                                <p className='mb-1'>Оплатить через</p>
                                                <Image width={60} height={40}
                                                    src="/stripe.png"
                                                    className='w-[60px] h-[40px]' alt="strie"/>

                                            </>}

                                        </a>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Page
