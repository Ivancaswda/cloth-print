'use client';

import React from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import {WavyBackground} from "@/components/ui/wavy-background";
import {faqs} from "../../../../constant";
import {Button} from "@/components/ui/button";
import Link from "next/link";


const FaqPage = () => {
    return (
        <div >
            <WavyBackground className="flex flex-col items-center justify-center px-6 py-24 sm:py-32">
                <h1 className="text-5xl font-extrabold text-[#81dd1f] drop-shadow-lg text-center max-w-4xl">
                    Часто задаваемые вопросы
                </h1>
                <p className="mt-4 text-lg text-zinc-200 dark:text-zinc-200 text-center max-w-2xl">
                    Ответы на популярные вопросы о нашем сервисе и процессе заказа
                </p>
            </WavyBackground>

            <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border-l-4 border-[#81dd1f] pl-4">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {faq.question}
                        </h2>
                        <p className="mt-2 text-zinc-700 dark:text-zinc-400">{faq.answer}</p>
                    </div>
                ))}





                <div className="text-center space-y-4">
                    <p className="text-sm text-zinc-500">
                        Не нашли ответ? Напишите нам:{" "}
                        <span className="text-[#81dd1f] font-medium">katkovskaya.2017@yandex.ru</span>
                    </p>
                    <div className="relative flex items-center justify-center my-12">
                        <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700"></div>
                        <span
                            className="absolute px-4 bg-white dark:bg-zinc-900 text-zinc-500 text-sm uppercase tracking-wider">
            или
          </span>
                    </div>
                    <Button
                        variant="default"
                        className="bg-[#81dd1f] cursor-pointer hover:bg-[#6cba1a] text-black font-semibold px-6 py-2 rounded-xl  transition"
                    >
                        <Link href='/contact'>
                            Свяжитесь с нами
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default FaqPage;
