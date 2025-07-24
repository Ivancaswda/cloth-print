import React from 'react'
import Header from "@/app/_components/Header";
import Hero from "@/app/_components/Hero";
import {Categories} from "@/app/_components/Categories";
import PopularProducts from "@/app/_components/PopularProducts";

const Page = () => {
    return (
        <div className=''>

        <Hero/>
            <Categories/>
            <PopularProducts/>

        </div>
    )
}
export default Page
