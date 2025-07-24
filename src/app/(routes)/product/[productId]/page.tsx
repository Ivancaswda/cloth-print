'use client'
import React, {useContext, useEffect, useState} from 'react'
import {redirect, useParams} from "next/navigation";
import axios from "axios";
import Image from "next/image";
import PopularProducts, {Product} from "@/app/_components/PopularProducts";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {Loader2Icon, Palette} from "lucide-react";
import CustomizeStudio from "@/app/(routes)/product/_components/ImageCustomizeStuido";
import {CartContext} from "../../../../../context/CartContext";
import {UserDetailContext} from "../../../../../context/UserDetailContext";
import {LoaderOne} from "@/components/ui/loader";
const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState<string>('S')
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const {productId} = useParams()
    const [designUrl, setDesignUrl] = useState<string>('')
    const [enableCustomizeStudio, setEnableCustomizeStudio] = useState(false)
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(false)
    const {cart, setCart} = useContext(CartContext)
    console.log(productId)
    useEffect(() => {
        productId && GetProductId()
    }, [])
    const GetProductId = async () => {
        setLoading(true)
        const result = await axios.get(`/api/products?productId=${productId}`)
        console.log(result.data)
        setProduct(result.data)
        setLoading(false)
    }

    console.log(designUrl)
    const AddToCart = async () => {
        console.log(designUrl)
        console.log('Current cart:', cart);
        setCart(prev => {
            console.log('Prev inside setCart:', prev);
            return [...(Array.isArray(prev) ? prev : []), {
                design: designUrl,
                products: product,
                userEmail: userDetail?.email,
                selectedSize:selectedSize
            }]
        });

        //save to db
        const result = await axios.post('/api/cart', {
            product: product,
            designUrl: designUrl,
            userEmail: userDetail?.email,
            selectedSize: selectedSize
        })

        console.log(result)
    }
    console.log(product)
    console.log(enableCustomizeStudio)

    if (loading) {
        return  <LoaderOne/>
    }
    console.log(selectedSize)
    if (!userDetail) {
        redirect('/')

    }

    return (
        <div className=' px-2 md:px-10 lg:px-20 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10 w-full relative'>
                {product ? !enableCustomizeStudio ? product?.productImage ?
                <div className='flex items-center justify-center border rounded-2xl'>
                                <Image width={400} height={400} src={product?.productImage[0]?.url} alt={product?.title}/>
                </div>
                            :
                            <div className='w-[400px] h-[400px] flex items-center justify-center'>
                               нет изображения
                            </div>
                        : <CustomizeStudio product={product} setDesignUrl={(url: string) => setDesignUrl(url)}/> :
                    <Skeleton className='w-full h-[300px]'/>
                }
                {product ? <div className='flex flex-col gap-3'>
                    <h2 className='font-semibold text-3xl'>{product?.title}</h2>
                    <h2 className='font-semibold text-3xl'>{product?.pricing}ß</h2>
                    <p className='text-gray-500'>{product?.description}</p>
                    <div>
                        <h2 className='text-lg'>Размер</h2>
                        <div className='flex gap-3'>
                            {['S', 'M', 'L', 'XL'].map((size) => (
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
                    {!enableCustomizeStudio &&
                        <Button size='lg'
                                onClick={() => setEnableCustomizeStudio(true)}><Palette/> Кастомизировать</Button>}

                    <Button disabled={!userDetail} size='lg' className={!enableCustomizeStudio ? 'bg-[#81dd1f] cursor-pointer hover:bg-[#81dd1f]/90 transition' : 'bg-neutral-500 hover:bg-neutral-400 transition cursor-pointer'} onClick={() => AddToCart()}
                            >Добавить в корзину</Button>
                </div> : <div className='flex flex-col'>
                    <Skeleton className='w-full h-[20px]'/>
                    <Skeleton className='w-full h-[30px]'/>
                    <Skeleton className='w-full h-[50px]'/>
                </div>}


            </div>
            <div className='mt-10 w-full '>
                <h2 className='text-lg font-semibold'>Описание продукта</h2>
                <p className='text-gray-500 md:w-[50%] w-full'>{product?.longDescription}</p>
                <PopularProducts/>
            </div>
        </div>

    )
}
export default ProductDetail
