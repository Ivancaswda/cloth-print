'use client'
import {motion} from "motion/react";
import React from 'react';
import {AuroraBackground} from "@/components/ui/aurora-background";
import Link from "next/link";

const PrivacyPolicyPage = () => {
    return (
        <>

            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl  text-black font-bold dark:text-white text-center">
                        Политика и конфидециальность
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        Мы заботимся о вашей безопасности и прозрачности. Здесь вы найдете всю необходимую информацию о том, как мы защищаем ваши данные.

                    </div>
                    <Link href='/contact'>
                    <button className="bg-[#81dd1f] dark:bg-[#81dd1f] hover:bg-[#81dd1f]/80 transition rounded-full w-fit text-black cursor-pointer dark:text-black px-4 py-2">
                        Связаться с нами
                    </button>
                    </Link>
                </motion.div>
            </AuroraBackground>


            <main className="max-w-4xl mx-auto p-6 sm:p-10">
                <h1 className="text-4xl font-bold mb-6 text-center">Добро пожаловать в <strong className='text-[#81dd1f]'>Cloth-Print</strong>!</h1>

                <p className="mb-4">
                     Мы очень серьезно относимся к защите вашей личной
                    информации. Эта политика конфиденциальности объясняет,
                    как мы собираем, используем и защищаем ваши данные, когда вы пользуетесь нашим сайтом и покупаете
                    наши продукты.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Какие данные мы собираем</h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Личные данные: имя, адрес электронной почты, телефон, адрес доставки.</li>
                    <li>Платежная информация: данные кредитной карты или другие способы оплаты (через сторонние
                        платежные системы).
                    </li>
                    <li>Данные о заказах: информация о выбранных вами товарах и дизайнах.</li>
                    <li>Данные для улучшения сервиса: информация о вашем взаимодействии с сайтом (например, через
                        cookies).
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Как мы используем ваши данные</h2>
                <p className="mb-4">
                    Ваши данные используются для:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Обработки и выполнения ваших заказов.</li>
                    <li>Обеспечения безопасных платежей и предотвращения мошенничества.</li>
                    <li>Связи с вами по поводу ваших заказов, вопросов и отзывов.</li>
                    <li>Персонализации вашего опыта на сайте и улучшения наших услуг.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Безопасность данных</h2>
                <p className="mb-4">
                    Мы применяем современные меры безопасности для защиты ваших данных от несанкционированного доступа,
                    изменения, раскрытия или уничтожения.
                    Платежные данные обрабатываются только через надежных платежных провайдеров и не хранятся на наших
                    серверах.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Передача данных третьим лицам</h2>
                <p className="mb-4">
                    Мы можем передавать ваши данные нашим партнерам (например, курьерам или платежным системам)
                    исключительно для выполнения заказа.
                    Мы не продаем и не передаем вашу личную информацию третьим лицам в коммерческих целях.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Ваши права</h2>
                <p className="mb-4">
                    Вы имеете право запросить доступ, исправление или удаление ваших личных данных. Для этого вы можете
                    связаться с нашей службой поддержки.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Использование файлов cookie</h2>
                <p className="mb-4">
                    Мы используем cookie для улучшения работы сайта и персонализации вашего опыта. Вы можете настроить
                    параметры cookie в вашем браузере.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Изменения в политике конфиденциальности</h2>
                <p className="mb-4">
                    Мы можем время от времени обновлять эту политику. Все изменения будут опубликованы на этой странице
                    с обновленной датой.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Контакты</h2>
                <p>
                    Если у вас есть вопросы или запросы по поводу вашей конфиденциальности, пожалуйста, свяжитесь с
                    нами:
                </p>
                <p className="mt-2 font-medium">
                    Email: support@cloth-print.com
                </p>
                <p className="mt-2 font-medium">
                    Телефон: +7 (999) 455-28-50
                </p>

                <p className="mt-8 text-gray-500 text-sm text-center">
                    © {new Date().getFullYear()} Cloth-Print. Все права защищены.
                </p>
            </main>
        </>

    );
};

export default PrivacyPolicyPage;
