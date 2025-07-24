// '/api/cart'

import {NextRequest, NextResponse} from "next/server";
import {axiosClient} from "@/lib/axiosClient";

export async function GET (req: NextRequest) {

    const {searchParams} = new URL(req.url)
    const email = searchParams.get('email')

    try {           // in order to get 2 level info means image we are adding such populate
        const result = await axiosClient.get('/carts?filters[userEmail][$eq]=' + email + '&populate[products][populate][0]=productImage')
        console.log(result.data.data)
        return NextResponse.json(result.data.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req:NextRequest) {
    const { userEmail, designUrl, product, selectedSize} = await req.json();

    const data = {
        data: {
            userEmail,
            design: designUrl,
            products: {
                connect: [product?.documentId],
            },
            selectedSize,

        },
    };
    console.log(data)

    try {
       const result = await axiosClient.post('/carts', data)
        console.log(result.data)
        return  NextResponse.json(result.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req: NextRequest) {
    const {documentId} = await req.json()
    const result = await axiosClient.delete('/carts/' + documentId)

    return NextResponse.json(result.data)

}