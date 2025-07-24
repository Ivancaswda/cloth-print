
import { NextResponse } from "next/server";
import {imagekit} from "@/lib/imageKitInstance";

export async function POST(req: Request) {
    const body = await req.json();
    const { file, fileName } = body;

    try {
        const result = await imagekit.upload({
            file,
            fileName,
            isPrivateFile: false,
            useUniqueFileName: true,
        });

        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
