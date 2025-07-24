'use client'
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from "../../../../context/CartContext";
import { Product } from "@/app/_components/PopularProducts";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import {ArrowLeftCircle, ArrowRightCircle, Loader2Icon, ShoppingCartIcon} from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useCallback } from "react";
import CartItemComponent from "@/app/_components/CartItem";
export type CartItemType = {
    documentId: string,
    products: Product[],
    design: string,
    id: number,
    selectedSize?: string,
};



const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const { userDetail } = useContext(UserDetailContext);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImagesClick = (images: string[], index: number) => {
        setLightboxImages(images);
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);
    const prevImage = () => setCurrentIndex((i) => (i > 0 ? i - 1 : i));
    const nextImage = () => setCurrentIndex((i) => (i < lightboxImages.length - 1 ? i + 1 : i));


    const fetchCart = useCallback(async () => {
        if (!userDetail?.email) return;
        try {
            const res = await axios.get('/api/cart?email=' + userDetail.email);
            setCart(res.data);
        } catch (e) {
            console.error(e);
        }
    }, [userDetail?.email, setCart]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const removeFromCart = async (documentId: string) => {
        if (!userDetail?.email) {
            console.warn("Email не загружен");
            return;
        }
        setLoading(true);
        try {
            await axios.delete('/api/cart', { data: { documentId } });
            await fetchCart();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getTotalCartAmount = () => {
        if (!cart || cart.length === 0) return 0;
        return cart.reduce((total: number, item: CartItemType) => {
            const productsArray = Array.isArray(item.products) ? item.products : item.products ? [item.products] : [];
            const sum = productsArray.reduce((acc, product) => {
                if (item.design && item.design.trim() !== "") {
                    return acc + (product.pricing ?? 0);
                } else {
                    return acc + (product.purePrice ?? 0);
                }
            }, 0);
            return total + sum;
        }, 0);
    };

    if (!userDetail) redirect('/');

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/create-checkout-session', {
                cart,
                email: userDetail.email,
            });
            if (response.data.url) window.location.href = response.data.url;
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="px-2 md:px-10 lg:px-20">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Ваша корзина</h1>
                    </header>

                    <div className="mt-8">
                        {(!cart || cart.length === 0) ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                                <ShoppingCartIcon className="w-16 h-16 mb-4 text-[#81dd1f]" />
                                <p className="text-lg font-semibold">Ваша корзина пустая</p>
                                <p className="mt-2 text-sm text-gray-400">Похоже, вы пока ничего не добавили.</p>
                                <a
                                    href="/products"
                                    className="mt-6 inline-block rounded-sm bg-[#81dd1f] px-6 py-3 text-white hover:bg-[#81dd1f]/90 transition"
                                >
                                    Смотреть продукты
                                </a>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item: CartItemType) => (
                                    <CartItemComponent



                                        onImagesClick={handleImagesClick}

                                        key={item.documentId}
                                        item={item}
                                        onRemove={removeFromCart}
                                        onImageClick={setModalImage}
                                        loading={loading}
                                    />
                                ))}
                            </ul>
                        )}

                        {cart && cart.length > 0 && (
                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Всего (без скидки)</dt>
                                            <dd>£{getTotalCartAmount().toFixed(2)}</dd>
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
                        <div className='flex items-center justify-end w-full'>


                                    <button
                                        onClick={handleCheckout}
                                        className="flex cursor-pointer  items-center py-2 justify-center gap-2 bg-[#81dd1f] hover:bg-[#81dd1f]/90 rounded-sm px-5 text-sm font-bold text-black transition-transform hover:scale-105"
                                    >
                                        {loading ? (
                                            <Loader2Icon className="animate-spin text-black" />
                                        ) : (
                                            <>
                                                <p className="mb-1">Оплатить через</p>
                                                <Image
                                                    width={60}
                                                    height={40}
                                                    src="/stripe.png"
                                                    alt="stripe"
                                                    className="w-[60px] h-[40px]"
                                                />
                                            </>
                                        )}
                                    </button>
                        </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Кастомная модалка для увеличенного просмотра изображения */}
            {modalImage && (
                <div
                    onClick={() => setModalImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer"
                >
                    <img
                        src={modalImage}
                        alt="Preview"
                        className="max-h-[80vh] max-w-[90vw] object-contain rounded"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}

            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white text-3xl font-bold"
                    >
                        &times;
                    </button>
                    <button
                        disabled={currentIndex === 0}
                        onClick={prevImage}
                        className="absolute flex items-center justify-center rounded-full px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 right-4 text-white text-3xl"
                    >
                        <ArrowLeftCircle/>
                    </button>
                    <img
                        src={lightboxImages[currentIndex]}
                        alt="Full"
                        className="max-w-[90%] max-h-[90%] object-contain"
                    />


                    <button
                        disabled={currentIndex === lightboxImages.length - 1}
                        onClick={nextImage}
                        className="absolute flex items-center justify-center rounded-full px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 right-4 text-white text-3xl"
                    >
                        <ArrowRightCircle/>
                    </button>
                </div>
            )}
        </section>
    );
};

export default CartPage;