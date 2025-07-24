'use client'
import React, {useEffect, useRef, useState} from 'react'
import {Product} from "@/app/_components/PopularProducts";
import Image from "next/image";
import {
    CropIcon,
    GalleryVerticalEndIcon,
    ImageOff,
    ImageUpscale,
    Loader2Icon,
    PictureInPictureIcon,
    Upload
} from "lucide-react";
import fabric, {FabricImage} from 'fabric';
import {Canvas} from "fabric";

import {imagekit} from "@/lib/imageKitInstance";

type Props = {
    product: Product,
    setDesignUrl: any
}
const AITransformOptions = [
    {
        name: 'Удалить фон',
        icon: ImageOff,
        imageKitTr: 'e-bgremove'
    },
    {
        name: 'Увеличить',
        icon: ImageUpscale,
        imageKitTr: 'e-upscale'
    },
    {
        name: 'Обрезать',
        icon: CropIcon,
        imageKitTr: 'fo-auto'
    },
    {
        name: 'Тени',
        icon: GalleryVerticalEndIcon,
        imageKitTr: 'e-shadow'
    },


]

const DEFAULT_IMAGE= 'https://ik.imagekit.io/kq4bbqvwa/j974z8heawz2xke2ghfnw25cv97kd9dc.png?updatedAt=1752080480423'


const CustomizeStudio =  ({product, setDesignUrl}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [scale, setScale] = useState(1);

    const canvasRef = useRef<any>(null)
    const [uploadedImage, setUploadedImage] = useState<string>()
    const [canvasInstance, setCanvasInstance] = useState<any>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 200,
                height:200,
                backgroundColor: 'transparent'
            })
            initCanvas.renderAll()
            setCanvasInstance(initCanvas)
            return () => {
                initCanvas.dispose()
            }
        }
    }, [])

    useEffect(() => {
        if (canvasInstance && uploadedImage) {
            AddDefaultImageToCanvas(uploadedImage);
            setDesignUrl(uploadedImage);
        }
    }, [canvasInstance, uploadedImage]);

    const AddDefaultImageToCanvas = async () => {
        canvasInstance.clear()
        canvasInstance.renderAll()
        const img = await FabricImage.fromURL(uploadedImage!, {
            crossOrigin: 'anonymous',
        });

        img.set({
            originX: 'center',
            originY: 'center',
            left: canvasInstance.getWidth() / 2,
            top: canvasInstance.getHeight() / 2,
            scaleX: scale,
            scaleY: scale,
        });

        canvasInstance.add(img);
        canvasInstance.renderAll()
        setIsLoading(false)
    }

    const onHandleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Преобразуем файл в base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result;

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        file: base64,
                        fileName: file.name,
                    }),
                });

                const data = await res.json();

                if (res.ok) {
                    const uploadedImageUrl = data.url;
                    setUploadedImage(uploadedImageUrl);


                } else {
                    console.error("ImageKit upload error:", data?.error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const OnApplyAITransformation = (transformation: string, add: boolean) => {
        if (!uploadedImage) return;

        setIsLoading(true); //

        const [baseUrl, queryParams] = uploadedImage.split('?');
        const existingTr = new URLSearchParams(queryParams).get('tr') || '';
        let trList = existingTr ? existingTr.split(',') : [];

        if (add) {
            if (!trList.includes(transformation)) {
                trList.push(transformation);
            }
        } else {
            trList = trList.filter(t => t !== transformation);
        }

        const newUrl = `${baseUrl}?tr=${trList.join(',')}`;
        setUploadedImage(newUrl);
    };



    const isTransformationApplied = (transformation: string) => {
        return uploadedImage?.includes(transformation) ?false : true
    }

    useEffect(() => {
        if (canvasInstance && uploadedImage) {
            AddDefaultImageToCanvas();
        }
    }, [scale]);


    const handleScaleIncrease = () => {
        setScale(prev => Math.min(prev + 0.1, 3)); //max 3
    };

    const handleScaleDecrease = () => {
        setScale(prev => Math.max(prev - 0.1, 0.1)); // min 0.1
    };


    return (
        <div className='flex items-center flex-col  '>
            <div className='relative flex items-center justify-center  '>
                <div className='absolute  z-10  h-[200px] w-[200px]'>
                    <canvas id='canvas' ref={canvasRef}
                            className=' rounded-2xl border-dashed '/>
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 rounded-2xl z-20">

                        <Loader2Icon className='animate-spin text-green-600'/>
                        </div>
                    )}

                </div>

                {product?.productImage ?
                    <Image width={400} height={400} src={product?.productImage[0]?.url} alt={product?.title}/>
                    : <div className='flex items-center justify-center w-[400px] h-[400px]'>
                        Нет изображения
                    </div>}

            </div>

            <label htmlFor="uploadImage" className='w-full mt-4'>
                <div
                    className='border flex flex-col items-center p-5 border rounded-lg  hover:bg-[#81dd1f] transition cursor-pointer'>
                    <Upload/>
                    <h2 className='text-center'>Загрузить</h2>

                </div>
                <input onChange={onHandleImageUpload} className='hidden' type="file" id='uploadImage'/>


            </label>
            <div className='flex flex-col-reverse gap-5 my-5 items-center '>

                <div className='flex gap-5 my-5'>
                    {AITransformOptions.map((item, index) => (
                        <div
                            onClick={() => OnApplyAITransformation(item?.imageKitTr, isTransformationApplied(item.imageKitTr))}
                            key={index}

                            className={` border flex flex-col items-center p-5 border rounded-lg hover:bg-[#81dd1f] transition cursor-pointer  ${uploadedImage?.includes(item?.imageKitTr) ? 'border-[#81dd1f]' : null}

                                `}
                        >
                            <item.icon/>
                            <h2 className='text-center'>{item.name}</h2>

                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-4">
                    <button onClick={handleScaleDecrease}
                            className="px-3 py-1 bg-[#81dd1f] flex items-center justify-center text-white rounded hover:bg-[#81dd1f]/90 transition">-
                    </button>
                    <button onClick={handleScaleIncrease}
                            className="px-3 py-1 bg-[#81dd1f] flex items-center justify-center text-white rounded hover:bg-[#81dd1f]/90 transition">+
                    </button>
                    <span className="ml-2">Масштаб: <span className='text-green-800'>{(scale * 100).toFixed(0)}%</span> </span>
                </div>
            </div>
        </div>
    )
}
export default CustomizeStudio