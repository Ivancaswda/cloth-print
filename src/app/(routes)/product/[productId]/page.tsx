'use client'
import React, { useContext, useEffect, useState } from 'react'
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import PopularProducts, { Product } from "@/app/_components/PopularProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LoaderOne } from "@/components/ui/loader";
import { ArrowLeftCircle, ArrowRightCircle, Palette } from "lucide-react";
import CustomizeStudio from "@/app/(routes)/product/_components/ImageCustomizeStuido";
import { CartContext } from "../../../../../context/CartContext";
import { UserDetailContext } from "../../../../../context/UserDetailContext";

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState<string>('S');
    const { userDetail } = useContext(UserDetailContext);
    const [modalImages, setModalImages] = useState<{ url: string }[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { productId } = useParams();
    const [designUrl, setDesignUrl] = useState<string>('');
    const [enableCustomizeStudio, setEnableCustomizeStudio] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        if (productId) getProductById();
    }, [productId]);

    const getProductById = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`/api/products?productId=${productId}`);
            setProduct(result.data);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoaderOne />;
    if (!userDetail) redirect('/');

    const addToCart = async () => {
        setCart(prev => [...(Array.isArray(prev) ? prev : []), {
            design: designUrl,
            products: product,
            userEmail: userDetail?.email,
            selectedSize
        }]);

        await axios.post('/api/cart', {
            product,
            designUrl,
            userEmail: userDetail?.email,
            selectedSize
        });
    };

    const openModal = (images: { url: string }[], index: number) => {
        setModalImages(images);
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setModalImages(null);
        setCurrentIndex(0);
    };

    const nextImage = () => {
        if (modalImages) setCurrentIndex((currentIndex + 1) % modalImages.length);
    };

    const prevImage = () => {
        if (modalImages) setCurrentIndex((currentIndex - 1 + modalImages.length) % modalImages.length);
    };

    return (
        <div className='px-2 md:px-10 lg:px-20 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10 w-full relative'>

                {product && !enableCustomizeStudio ? (
                    product.productImage && product.productImage.length > 0 ? (
                        <div className='flex justify-center items-center border rounded-2xl cursor-pointer' onClick={() => openModal(product.productImage, 0)}>
                            <Image
                                width={400}
                                height={400}
                                src={product.productImage[0].url}
                                alt={product.title}
                                className='rounded-md hover:opacity-90 transition'
                            />
                        </div>
                    ) : (
                        <div className='w-[400px] h-[400px] flex items-center justify-center'>нет изображения</div>
                    )
                ) : enableCustomizeStudio ? (
                    <CustomizeStudio product={product} setDesignUrl={(url: string) => setDesignUrl(url)} />
                ) : (
                    <Skeleton className='w-full h-[300px]' />
                )}

                <div className='flex flex-col gap-3'>
                    {product ? <>
                        <h2 className='font-semibold text-3xl'>{product.title}</h2>
                        <h2 className='font-semibold text-3xl'>{product.pricing}ß</h2>
                        <p className='text-gray-500'>{product.description}</p>
                        <div>
                            <h2 className='text-lg'>Размер</h2>
                            <div className='flex gap-3'>
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? 'default' : 'outline'}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {!enableCustomizeStudio && (
                            <Button size='lg' onClick={() => setEnableCustomizeStudio(true)}>
                                <Palette /> Кастомизировать
                            </Button>
                        )}

                        <Button
                            disabled={!userDetail}
                            size='lg'
                            className={!enableCustomizeStudio ? 'bg-[#81dd1f] cursor-pointer hover:bg-[#81dd1f]/90 transition' : 'bg-neutral-500 hover:bg-neutral-400 transition cursor-pointer'}
                            onClick={addToCart}
                        >
                            Добавить в корзину
                        </Button>
                    </> : (
                        <>
                            <Skeleton className='w-full h-[20px]' />
                            <Skeleton className='w-full h-[30px]' />
                            <Skeleton className='w-full h-[50px]' />
                        </>
                    )}
                </div>
            </div>

            <div className='mt-10 w-full'>
                <h2 className='text-lg font-semibold'>Описание продукта</h2>
                <p className='text-gray-500 md:w-[50%] w-full'>{product?.longDescription}</p>
                <PopularProducts />
            </div>


            {modalImages && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="absolute flex items-center justify-center rounded-full z-20 px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 left-4 text-white text-3xl"
                    >
                        <ArrowLeftCircle />
                    </button>

                    <div className="relative w-full max-w-2xl h-[70vh]">
                        <Image
                            src={modalImages[currentIndex].url}
                            alt={`Image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <button
                        onClick={e => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute flex items-center justify-center rounded-full px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 right-4 text-white text-3xl"
                    >
                        <ArrowRightCircle />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
