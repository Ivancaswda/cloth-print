'use client'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import {Loader2Icon} from "lucide-react";
import {LoaderOne} from "@/components/ui/loader";

type Category = {
    name:string,
    Icon:{
        url: string
    },
    documentId: string,
    id: number,
    slug:string
}

export const Categories = () => {
    const [categoryList, setCategoryList] = useState<Category[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        GetCategoryList()
    }, [])


    const GetCategoryList = async () => {
        setLoading(true)
        const result = await axios.get('/api/categories')
        console.log(result.data)
        setCategoryList(result.data?.data)
        setLoading(false)
    } // getting categories

    if (loading) {
        return <LoaderOne/>
    }
    console.log(categoryList)
    return (
        <div className=' px-2 md:px-10 lg:px-20'>
            <h1 className='font-semibold text-2xl'>Популярные категории</h1>


         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
             {categoryList?.map((category: Category, index: number) => (
             <div key={index} className='p-4 border rounded-lg hover:border-[#81dd1f] transition cursor-pointer'>
                 <Link href={`/category/${category?.slug}`}>
                     {category?.Icon?.url ? (
                         <Image src={category.Icon.url} className='w-[110px]  h-[110px] object-cover rounded-xl' width={80} height={80} alt={category.name} />
                     ) : (
                         <div className='w-[80px] h-[80px] bg-gray-100 flex items-center justify-center'>
                             <span>Icon</span>
                         </div>
                     )}  <h2 className='text-lg font-medium mt-4'>{category?.name}</h2>
                 </Link>
             </div>
         ))}</div>
        </div>
    )
}
