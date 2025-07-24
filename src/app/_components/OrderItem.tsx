'use client'
import {ArrowLeftCircle, ArrowRightCircle, CheckCircleIcon, XIcon} from "lucide-react";
import React, {useState} from "react";
import {Order} from "@/app/(routes)/orders/page";
import Image from "next/image";

const OrderItem = ({ order }: { order: Order }) =>
{
    const [modalImages, setModalImages] = useState<string[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const closeModal = () => {
        setModalImages(null);
        setCurrentIndex(0);
    };

    const handleImageClick = (images: string[], index: number = 0) => {
        if (images.length > 1) {
            setModalImages(images);
            setCurrentIndex(index);
        }
    };

    const nextImage = () => {
        if (modalImages) {
            setCurrentIndex((prev) => (prev + 1) % modalImages.length);
        }
    };

    const prevImage = () => {
        if (modalImages) {
            setCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
        }
    };




   return (
       <li className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
           {/* Заголовок */}
           <div className="flex items-center justify-between mb-3">
               <div>
                   <p className="text-sm text-gray-500">
                       Айди заказа: <span className="font-medium">{order.orderCode}</span>
                   </p>
                   <p className="text-sm text-gray-500">
                       Дата: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                   </p>
               </div>
               <div className="flex flex-col items-end">
          <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${
                  order.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
              }`}
          >
            {order.paymentStatus === 'paid' ? 'Оплачено' : 'Не оплачено'}
          </span>

                   {order?.readyForPickup ? (
                       <div className="mt-1 flex items-center text-green-600 text-sm font-medium">
                           <CheckCircleIcon className="w-4 h-4 mr-1"/>
                           Готов к выдаче
                       </div>
                   ) : (
                       <div className="mt-1 flex items-center text-red-600 text-sm font-medium">
                           <XIcon className="w-4 h-4 mr-1"/>
                           Не готов
                       </div>
                   )}
               </div>
           </div>

           {/* Тело */}
           <div className="border-t pt-4">
               <p className="font-semibold mb-2">Вещи: ({order?.items.length})</p>
               <ul className="space-y-4">
                   {order?.items?.map((item: any, i: number) => {
                       const product = item.products?.[0];
                       const images: string[] = product?.productImage ?? [];
                       console.log(images)
                       return (
                           <li key={i} className="flex items-start gap-4 border rounded p-3">
                               {/* Изображения: продукт и дизайн */}
                               <div className="flex  gap-2">
                                   {/* Фото продукта */}
                                   {images.length > 0 ? (
                                       <div
                                           onClick={() => handleImageClick(images)}
                                           className="w-20 h-20 relative rounded overflow-hidden cursor-pointer"
                                       >
                                           <Image
                                               src={images[0].url}
                                               alt="Product Image"
                                               fill
                                               className="object-cover"
                                           />
                                       </div>
                                   ) : (
                                       <div
                                           className="w-20 h-20 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded">
                                           Нет фото
                                       </div>
                                   )}

                                   {/* Кастомный дизайн */}
                                   {item.design ? (
                                       <div className="w-20 h-20 relative rounded border border-[4px] border-[#81dd1f] overflow-hidden">
                                           <Image
                                               src={item.design}
                                               alt="Custom Design"
                                               fill
                                               className="object-cover"
                                           />
                                       </div>
                                   ) : (
                                       <div
                                           className="w-20 h-20 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded">
                                           Нет дизайна
                                       </div>
                                   )}
                               </div>

                               {/* Инфо */}
                               <div className="flex flex-col flex-1">
                                   <p className="font-semibold text-sm">{product?.title || 'Неизвестный товар'}</p>
                                   <p className="text-sm text-gray-500">
                                       Размер: <span className="font-medium">{item.selectedSize || '—'}</span>
                                   </p>
                                   <p className="text-sm text-gray-500">
                                       Цена:{' '}
                                       <span className="font-medium">
                      €{product?.pricing ?? product?.purePrice ?? '—'}
                    </span>
                                   </p>
                               </div>
                           </li>
                       );
                   })}
               </ul>

               <p className="mt-4 font-bold text-right">Итого: €{order.amount.toFixed(2)}</p>
           </div>

           {/* Модалка с изображениями */}
           {modalImages && (
               <div
                   className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                   onClick={closeModal}
               >
                   <button
                       onClick={(e) => {
                           e.stopPropagation();
                           prevImage();
                       }}
                       className="absolute flex items-center justify-center rounded-full px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 left-4 text-white text-3xl"
                   >

                       <ArrowLeftCircle/>
                   </button>

                   <div className="relative w-full max-w-2xl h-[70vh]">
                       <Image
                           src={modalImages[currentIndex].url}
                           alt={`Image ${currentIndex + 1}`}
                           fill
                           className="object-contain"
                       />
                   </div>

                   <button
                       onClick={(e) => {
                           e.stopPropagation();
                           nextImage();
                       }}
                       className="absolute flex items-center justify-center rounded-full px-4 py-4 transition bg-neutral-800 hover:bg-neutral-800/80 right-4 text-white text-3xl"
                   >

                       <ArrowRightCircle/>
                   </button>
               </div>
           )}
       </li>
   );

}
export default OrderItem