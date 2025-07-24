import {NextRequest} from "next/server";
import {axiosClient} from "@/lib/axiosClient";

import {NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
         const result = await axiosClient.get('/categories?populate=*')
        return NextResponse.json(result.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}