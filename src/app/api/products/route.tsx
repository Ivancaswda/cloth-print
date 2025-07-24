import {NextRequest} from "next/server";
import {axiosClient} from "@/lib/axiosClient";
import {NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const isPopular = searchParams.get("isPopular");
    const category = searchParams.get("category");
    const productId = searchParams.get("productId");

    try {
        if (isPopular === "1") {
            const result = await axiosClient.get("/products?populate=*");
            console.log(result?.data?.data)
            return NextResponse.json(result?.data?.data);
        } else if (category) {
            const safeCategory = encodeURIComponent(category);
            const result = await axiosClient.get(
                `/products?populate=*&filters[category][slug][$eq]=${safeCategory}`
            );
            console.log(result?.data?.data)
            return NextResponse.json(result?.data?.data);
        } else if (productId) {
            const result = await axiosClient.get(
                `/products/${productId}?populate=*`
            );
            console.log(result?.data?.data)
            return NextResponse.json(result?.data?.data);
        } else {
            return NextResponse.json({});
        }
    } catch (error: any) {
        console.error("API error:", error?.message || error);
        return new NextResponse(
            JSON.stringify({ error: "Internal server error", detail: error?.message }),
            { status: 500 }
        );
    }
}