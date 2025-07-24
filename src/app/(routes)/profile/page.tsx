'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from "../../../../context/UserDetailContext";
import axios from 'axios'
import { LoaderOne } from '@/components/ui/loader'
import Image from 'next/image'

type Order = {
    id: number
    amount: number
    orderCode: string
    createdAt: string
    paymentStatus: string
}

const ProfilePage = () => {
    const { userDetail } = useContext(UserDetailContext)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userDetail?.email) return

            setLoading(true)
            try {
                const res = await axios.get(`/api/order?email=${userDetail.email}`)
                setOrders(res.data || [])
            } catch (err) {
                console.error('Ошибка при получении заказов:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [userDetail?.email])

    if (loading) return <LoaderOne />

    if (!userDetail) {
        return <div className="p-10 text-center text-xl">Пожалуйста, войдите, чтобы просмотреть профиль.</div>
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex flex-col items-center gap-4 mb-8">
                <Image src={userDetail.picture} alt={userDetail.name} width={100} height={100} className="rounded-full" />
                <h2 className="text-3xl font-bold text-[#81dd1f]">{userDetail.name}</h2>
                <p className="text-gray-500">{userDetail.email}</p>
                <p className="text-sm text-neutral-600">
                    Кол-во заказов: <span className="font-semibold text-black">{orders.length}</span>
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#81dd1f]">История заказов</h3>
                {orders.length === 0 ? (
                    <p className="text-gray-500">У вас пока нет заказов.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.id} className="border-b pb-4 last:border-none">
                                <p className="text-sm text-gray-800 flex items-center gap-2">
                                    <strong>Код:</strong>
                                    <p className='text-green-800'>
                                        {order.orderCode}
                                    </p>
                                    </p>
                                    <p className="text-sm text-gray-800 flex items-center gap-2">
                                        <strong>Статус:</strong>
                                        <p className='text-[#81dd1f]'>
                                            {order.paymentStatus === 'paid' ?
                                                <p className='text-green-800'>Оплачен</p> :
                                                <p className='text-red-800'>Не оплачен</p>}</p>
                                    </p>
                                    <p className="text-sm text-gray-800 flex items-center gap-2">
                                        <strong>Готов к выдаче:</strong>

                                        {order.readyForPickup ? <p className='text-[#81dd1f]'>Да</p>  : <p className='text-yellow-800'>Ожидание товара</p>}
                                    </p>
                                    <p className="text-sm text-gray-800 flex items-center gap-2">
                                        <strong>Сумма:</strong>
                                        <p className={'text-gray-900 font-semibold'}>{(order.amount / 100).toFixed(2)} Euro</p>
                                    </p>
                                    <p className="text-xs text-gray-800 flex items-center gap-2">
                                        <strong>Дата:</strong>
                                        <p className={'text-gray-900 font-semibold'}>{new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
