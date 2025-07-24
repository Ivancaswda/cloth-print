'use client'

import React, {useEffect, useState} from 'react'
import axios from "axios";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Loader2Icon, Palette} from "lucide-react";
import Link from "next/link";
import {LoaderOne} from "@/components/ui/loader";

export type Product = {
    title: string;
    publishedAt: string;
    updatedAt: string;
    id: number;
    longDescription: string;
    pricing: number;
    purePrice?: number;
    isFeatured:boolean;
    size:any;
    productImage: Array<{
        url: string
    }>
    documentId: string
}

const PopularProducts = () => {
    const [productList, setProductList] = useState<Product[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        GetPopularProducts()
    }, [])

    const GetPopularProducts = async () => {
        setLoading(true)

        const result = await axios.get('/api/products?isPopular=1')
        console.log(result?.data)

        setProductList(result?.data)
        setLoading(false)
    }

    if (loading) {
        return <LoaderOne/>
    }

    return (
        <div className='w-full h-full  px-2 md:px-10 lg:px-20 mt-10 '>
            <h1 className='font-semibold text-3xl'>Популярные продукты</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 mt-5'>
                {productList?.map((product:Product, index:number) => (
                    <div className='flex flex-col items-center transition justify-between rounded-xl border p-5 hover:border-[#81dd1f] cursor-pointer' key={index}>
                        {Array.isArray(product?.productImage) && product.productImage.length > 0 && product.productImage[0].url ? (
                            <Image
                                className='h-[150px] w-full aspect-square object-contain'
                                src={product.productImage[0].url}
                                alt={product.title}
                                width={150}
                                height={150}
                            />
                        ) : (
                            <div className='h-[150px] w-full bg-gray-100 flex items-center justify-center'>
                                <span>Нет изображения</span>
                            </div>
                        )} <h2 className='text-lg font-medium'>{product?.title}</h2>
                        <Link href={`/product/${product.documentId}`}>
                        <Button className='mt-2 text-xs sm:text-sm w-[120px] sm:w-full bg-[#81dd1f]'>
                            <Palette className='hidden sm:block'/>
                            Кастомизировать</Button>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PopularProducts
