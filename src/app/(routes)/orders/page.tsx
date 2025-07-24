'use client'

import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import axios from 'axios';
import { LoaderOne } from '@/components/ui/loader';
import {
    CheckCircleIcon,
    PackageOpenIcon,
    ShoppingCartIcon,
    XIcon,
    XCircleIcon,
} from 'lucide-react';
import OrderItem from "@/app/_components/OrderItem";
import OrderModal from "@/app/_components/OrderModal";
export type Order = {
    id: string;
    userEmail: string;
    products: any;
    items?:any;
    amount: number;
    paymentStatus: string;
    createdAt: string;
    readyForPickup: boolean;
    orderCode: string;
};

const OrdersPage = () => {
    const { userDetail } = useContext(UserDetailContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!userDetail?.email) return;

        setLoading(true);
        axios
            .get(`/api/order?email=${userDetail.email}`)
            .then((res) => {
                // Сортируем заказы по дате, новые сверху
                const sortedOrders = res.data.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders(sortedOrders);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [userDetail?.email]);

    if (loading || !userDetail) {
        return <LoaderOne />;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                <PackageOpenIcon className="w-16 h-16 mb-4 text-[#81dd1f]" />
                <p className="text-lg font-semibold">У вас пока нету заказов</p>
                <p className="mt-2 text-sm text-gray-400">Видимо вы еще ничего у нас не купили.</p>
                <a
                    href="/products"
                    className="mt-6 inline-block rounded-sm bg-[#81dd1f] px-6 py-3 text-white hover:bg-[#81dd1f]/90 transition"
                >
                    Смотреть продукты
                </a>
            </div>
        );
    }

    // Показываем только первые 5 заказов
    const visibleOrders = orders.slice(0, 5);
    // Остальные для модалки
    const hiddenOrders = orders.slice(5);
    console.log(orders)
    return (
        <section className="px-6 py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Ваши заказы</h1>
            <ul className="space-y-6">
                {visibleOrders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </ul>

            {hiddenOrders.length > 0 && (
                <div className="mt-6 text-center w-full cursor-pointer">
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-block w-full rounded-sm bg-[#81dd1f] px-6 py-3 text-white hover:bg-[#81dd1f]/90 transition"
                    >
                        Показать еще ({hiddenOrders.length})
                    </button>
                </div>
            )}

            {showModal && (
                <OrderModal onClose={() => setShowModal(false)}>
                    <h2 className="text-2xl font-bold mb-4">Все заказы</h2>
                    <ul className="space-y-6 max-h-[60vh] overflow-y-auto">
                        {hiddenOrders.map((order) => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                    </ul>
                    <div className="mt-6 text-right ">
                        <button
                            onClick={() => setShowModal(false)}
                            className="rounded  bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                        >
                            Закрыть
                        </button>
                    </div>
                </OrderModal>
            )}
        </section>
    );
};





export default OrdersPage;
