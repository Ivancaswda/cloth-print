'use client'
import React from 'react'
import {MaskContainer} from "@/components/ui/svg-mask-effect";

const AboutPage = () => {
    return (
        <>
            <MaskContainer
                revealText={
                    <div className="text-center px-6">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#81dd1f] mb-4">
                            ClothPrint — стиль в каждом отпечатке
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto">
                            Создайте уникальную одежду с индивидуальными изображениями: мемы, арты, фото и логотипы.
                            Мы печатаем под заказ на футболках, худи, свитшотах и многом другом.
                        </p>
                    </div>
                }
                size={20}
                revealSize={720}
            >
                <p className="text-white text-2xl sm:text-3xl font-semibold text-center max-w-3xl leading-relaxed px-4">
                    Добро пожаловать в <span className="text-[#81dd1f] font-bold">ClothPrint</span> платформу, где вы можете
                    заказать печать своих идей на любой одежде.
                </p>
            </MaskContainer>
            <section className="min-h-screen bg-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#81dd1f] mb-6">
                        О компании ClothPrint
                    </h1>
                    <p className="text-gray-700 text-lg leading-8 mb-10">
                        В ClothPrint мы превращаем ваши идеи в стильные и уникальные предметы одежды. Мы
                        специализируемся на индивидуальной печати изображений на футболках, худи, свитшотах и других
                        текстильных изделиях.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 text-left">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#81dd1f] mb-2">
                                Почему выбирают нас?
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Высококачественная печать, устойчивая к стирке</li>
                                <li>Печать от 1 экземпляра – без минимального заказа</li>
                                <li>Быстрая обработка и доставка по всей стране</li>
                                <li>Возможность кастомизации под любой вкус</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#81dd1f] mb-2">
                                Наша миссия
                            </h2>
                            <p className="text-gray-700">
                                Мы верим, что каждый заслуживает уникального стиля. ClothPrint даёт возможность выразить
                                себя через одежду с авторским дизайном или любимыми изображениями — будь то мем, арт или
                                фото из путешествия.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Готовы создать что-то уникальное?</h3>
                        <a
                            href="/"
                            className="inline-block bg-[#81dd1f] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6ac312] transition"
                        >
                            Перейти к каталогу
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutPage
