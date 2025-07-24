'use client'
import React, {useContext, useEffect, useState} from 'react'
import {redirect, useParams} from "next/navigation";
import axios from "axios";
import {Product} from "@/app/_components/PopularProducts";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Loader2Icon, Palette} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {LoaderOne} from "@/components/ui/loader";
import {CartContext} from "../../../../../context/CartContext";
import {UserDetailContext} from "../../../../../context/UserDetailContext";
const ProductList = () => {
    const {categoryName} = useParams()
    console.log(categoryName)
    const [productList, setProductList] = useState<Product[] | []>()
    const [loading, setLoading] = useState<boolean>(false)
    const {cart, setCart} = useContext(CartContext)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    useEffect(() => {
        getProductByCategory()
    }, [])


    const getProductByCategory = async () => {
        setLoading(true)
        try {
            const result= await axios.get('/api/products?category=' + categoryName)
            console.log(result.data)
            setLoading(false)
            setCart(result.data.cart)
            setProductList(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        }

        if (loading) {
            return <LoaderOne/>
        }

    console.log(productList)
    if (!userDetail) {
        redirect('/')

    }

    return (
        <div className=' px-2 md:px-10 lg:px-20'>
            {/* @ts-ignore */}
            <h2 className='font-semibold text-3xl text-[#81dd1f]/80'>{categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}</h2>
            <p className='text-lg'>Кастомизируй премиальный {categoryName} под собственный вкус</p>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {productList && productList?.length > 0 ? productList?.map((product: Product, index:number) => (
                    <div
                        className='flex flex-col cursor-pointer
                         items-center justify-between rounded-xl transition border p-5 hover:border-[#81dd1f] mt-5 cursor-pointer'
                        key={index}>
                        <Link href={`/product/${product.documentId}`}>


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
                                <span>No Image</span>
                            </div>
                        )} <h2 className='text-lg font-medium'>{product?.title}</h2>
                        <Button className='mt-2 w-full bg-[#81dd1f] hover:bg-[#81dd1f]/80 transition'>
                            <Palette/>
                            Кастомизировать</Button>
                        </Link>
                    </div>
                ))
                :
                    [1,2,3,4,5].map((item, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]"/>
                                <Skeleton className="h-4 w-[200px]"/>
                            </div>
                        </div>
                    ))
                }
            </div>



        </div>
    )
}
export default ProductList
