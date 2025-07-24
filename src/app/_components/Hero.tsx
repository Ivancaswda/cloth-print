import React from 'react'
import Image from "next/image";

const Hero = () => {
    return (
        <section className="bg-white lg:grid w-full  ">
            <div
                className="mx-auto  px-4 py-16 sm:px-6 sm:py-24  md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8">

                <div className="max-w-prose text-left mb-4">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                       Создавай
                        <strong className="text-[#81dd1f]"> Кастомизируй & </strong>
                        Заказывай
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Создайте уникальную одежду с индивидуальными изображениями: мемы, арты, фото и логотипы.
                        Мы печатаем под заказ на футболках, худи, свитшотах и многом другом.
                    </p>

                    <div className="mt-4 flex gap-4 sm:mt-6">
                        <a
                            className="inline-block rounded border border-[#81dd1f] bg-[#81dd1f] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                            href="#"
                        >
                            Начать сейчас
                        </a>

                        <a
                            className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            href="#"
                        >
                            Подробнее
                        </a>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <Image src='/hero.png' alt='hero image' width={400} height={400} className='rounded-xl'/>

                </div>
               </div>
        </section>
    )
}
export default Hero
