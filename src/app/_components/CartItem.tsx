import {Loader2Icon, TrashIcon} from "lucide-react";
import React from "react";
import {CartItemType} from "@/app/(routes)/carts/page";

const CartItemComponent = ({
                               item,
                               onRemove,
                               onImageClick,
                               loading,
                               onImagesClick
                           }: {
    item: CartItemType,
    onRemove: (documentId: string) => void,
    onImageClick: (url: string) => void,
    loading: boolean,
    onImagesClick: (images: string[], startIndex: number) => void
}) => {
    const product = item.products[0];

    return (
        <li className="flex items-center gap-4 border-b border-gray-200 py-4">

           <div className='flex items-center flex-col sm:flex-row gap-2 '>



            {product?.productImage && product.productImage[0]?.url ? (
                <img
                    src={product.productImage[0].url}
                    alt={product.title}
                    className="w-20 h-20 rounded-sm border-2 border-[#81dd1f] object-cover cursor-pointer"
                    onClick={() =>
                        onImagesClick(
                            [
                                ...(product?.productImage?.map((img) => img.url) || []),
                                ...(item.design ? [item.design] : [])
                            ],
                            0
                        )
                    }
                />
            ) : (
                <div className="w-20 h-20 rounded-sm border-2 border-[#81dd1f] flex items-center justify-center text-xs text-gray-400">
                    Нет изображения
                </div>
            )}


            {item.design ? (
                <img
                    src={item.design}
                    alt="design"
                    className="w-20 h-20 rounded-sm border-2 border-[#81dd1f] object-cover cursor-pointer"
                    onClick={() =>
                        onImagesClick(
                            [
                                ...(product?.productImage?.map((img) => img.url) || []),
                                ...(item.design ? [item.design] : [])
                            ],
                            product?.productImage?.length || 0
                        )
                    }
                />
            ) : (
                <div className="w-20 h-20 rounded-sm border-2 border-[#81dd1f] flex items-center justify-center text-xs text-gray-400">
                    Нет дизайна
                </div>
            )}
           </div>

            <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-900">{product?.title}</h3>
                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                    <div>
                        <dt className="inline">Цена: </dt>
                        <dd className="inline font-medium">
                            {item.design?.trim() !== "" ? product?.pricing : product?.purePrice}£
                        </dd>
                    </div>
                    <div>
                        <dt className="inline">Размер: </dt>
                        <dd className="inline font-medium">{item.selectedSize ?? '-'}</dd>
                    </div>
                </dl>
            </div>


            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={1}
                    disabled
                    defaultValue={1}
                    className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 text-center text-xs text-gray-600"
                />
                {loading ? (
                    <Loader2Icon className="animate-spin text-green-300" />
                ) : (
                    <button
                        className="text-gray-600 hover:text-red-600 transition"
                        onClick={() => onRemove(item.documentId)}
                        aria-label="Удалить"
                    >
                       <TrashIcon/>
                    </button>
                )}
            </div>
        </li>
    );
};
export default CartItemComponent