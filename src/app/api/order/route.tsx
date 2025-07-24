// api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { axiosClient } from "@/lib/axiosClient";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const response = await axiosClient.get(
            `/orders?filters[consumerEmail][$eq]=${email}&populate[items][populate][products][populate]=productImage`
        );
        console.log(response.data.data)
        return NextResponse.json(response.data.data);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
