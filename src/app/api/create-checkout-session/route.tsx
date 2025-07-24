// src/app/api/create-checkout-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { cart, email } = body;

    try {
        const line_items = cart.map((cartItem: any) => {
            const product = cartItem.products[0];
            const price = cartItem.design ? product.pricing : product.purePrice;
            const discountedPrice = price * 0.8;
            const unit_amount = Math.round(discountedPrice * 100);

            return {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: product.title,
                        images: product.productImage?.map((img: any) => img.url) || [],
                    },
                    unit_amount,
                },
                quantity: 1

            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: `${req.headers.get('origin')}/api/confirm-order?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/carts`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return NextResponse.json({ error: 'Stripe checkout session creation failed' }, { status: 500 });
    }
};
