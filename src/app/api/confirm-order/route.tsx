// src/app/api/confirm-order/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { axiosClient } from '@/lib/axiosClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});
function generateOrderCode() {
    const now = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${now}-${random}`;
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'No session ID' }, { status: 400 });
    }

    try {
        // Получаем сессию Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product'],
        });
        console.log(session)
        if (!session) {
            return NextResponse.json({ error: 'No session created' }, { status: 400 });
        }

        const email = session.customer_email;
        if (!email) {
            return NextResponse.json({ error: 'No email in session' }, { status: 400 });
        }

        // Получаем корзину пользователя по email
        const cartRes = await axiosClient.get(`/carts?filters[userEmail][$eq]=${email}&populate[products][populate]=*`);
        console.log(cartRes)
        if (!cartRes) {
            return NextResponse.json({ error: 'No CartResponse received' }, { status: 400 });
        }
        const cartItems = cartRes.data.data;




        const productIds = cartItems
            .map((item: any) => item.products?.[0]?.id)
            .filter(Boolean); // убирает undefined
        console.log('productIDs array')
        console.log(productIds)



        console.log(session.amount_total!)
        // Создаём заказ


        const orderCode = generateOrderCode();
        const items = cartItems.map((item: any) => ({
            product: item.products?.[0]?.id,
            selectedSize: item.selectedSize,
            design: item.design, // или ссылка на изображение
        }));

        console.log(items)

        await axiosClient.post("/orders", {
            data: {
                consumerEmail: email,
                amount: session.amount_total! / 100,
                paymentStatus: 'paid',
                readyForPickup: false,
                orderCode,
                items: cartItems.map((item: any) => ({
                    design: item.design,
                    selectedSize: item.selectedSize,
                    products: [item.products?.[0]?.id], // обязательно массив!
                })),
            },
        });


        for (const item of cartItems) {
            await axiosClient.delete(`/carts/${item.id}`);
        }

        return NextResponse.redirect(`${req.nextUrl.origin}/orders?confirmed=true`);
    } catch (err) {
        console.error('[CONFIRM_ORDER_ERROR]', err?.response?.data || err.message || err);
        return NextResponse.json({ error: 'Failed to confirm order' }, { status: 500 });
    }
}
