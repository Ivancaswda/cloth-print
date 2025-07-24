import React from 'react'
import {useParams} from "next/navigation";
import ProductList from "@/app/(routes)/category/_components/ProductList";

const CategoryNamePage = () => {


    return (
        <div className='my-20'>
            <ProductList/>
        </div>
    )
}
export default CategoryNamePage