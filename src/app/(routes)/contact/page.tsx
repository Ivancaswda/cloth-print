'use client'
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function ContactPage() {
    const [category, setCategory] = useState("Ошибка");
    const [message, setMessage] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Отправка...");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, message, userEmail }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("✅ Спасибо! Обращение отправлено.");
                setCategory("Ошибка");
                setMessage("");
                setUserEmail("");
            } else {
                setStatus(`❌ Ошибка: ${data.error || "Не удалось отправить"}`);
            }
        } catch (error) {
            setStatus("❌ Ошибка сети. Попробуйте позже.");
        }
    };

    const selectTypeOfComplaint = ['Ошибка', 'Вопрос', 'Предложение', 'Другое'];

    return (
        <section className="min-h-screen bg-white py-20 px-4">
            <div className="max-w-xl mx-auto bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-[#81dd1f] text-center mb-6">
                    Обратная связь
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <Label className="text-gray-700 block mb-1">
                            Тип обращения
                        </Label>
                        <Select onValueChange={setCategory} value={category}>
                            <SelectTrigger className="w-full bg-white border border-gray-300">
                                <SelectValue placeholder="Выберите тип..." />
                            </SelectTrigger>
                            <SelectContent>
                                {selectTypeOfComplaint.map((s, i) => (
                                    <SelectItem value={s} key={i}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-gray-700 block mb-1">
                            Email (необязательно)
                        </Label>
                        <input
                            type="email"
                            id="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#81dd1f]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="message" className="text-gray-700 block mb-1">
                            Сообщение
                        </Label>
                        <textarea
                            id="message"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Опишите вашу проблему или предложение..."
                            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#81dd1f]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#81dd1f] hover:bg-[#6ac312] text-white py-3 rounded-lg font-semibold transition"
                    >
                        Отправить
                    </button>

                    {status && (
                        <p className="text-center text-sm text-gray-600 mt-2">
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
