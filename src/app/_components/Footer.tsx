import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-300 mt-20 px-6 py-10 md:px-20">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-8">

                {/* Логотип и описание */}
                <div className="max-w-xs">
                   <Image alt='logo' src='/logo.png' width={80} height={80} className='rounded-xl mb-2'/>
                    <p className="text-gray-700 text-sm">
                        Высококачественные принты на заказ для вашей одежды. Выразите свой стиль, воплотите свои идеи.  </p>
                </div>

                {/* Навигация */}
                <nav className="flex flex-col sm:flex-row gap-8">
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-2">Explore</h3>
                        <ul className="space-y-1 text-gray-600 text-sm">
                            <li><a href="/" className="hover:text-[#81dd1f] transition">Главная</a></li>
                            <li><a href="/products" className="hover:text-[#81dd1f] transition">Продукты</a></li>
                            <li><a href="/about" className="hover:text-[#81dd1f] transition">О нас</a></li>
                            <li><a href="/contact" className="hover:text-[#81dd1f] transition">Связь</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-semibold mb-2">Помощь</h3>
                        <ul className="space-y-1 text-gray-600 text-sm">
                            <li><a href="/faq" className="hover:text-[#81dd1f] transition">FAQ</a></li>
                            <li><a href="/orders" className="hover:text-[#81dd1f] transition">Заказы</a></li>
                            <li><a href="/contact" className="hover:text-[#81dd1f] transition">Помощь</a></li>
                            <li><a href="/privacyPolicy" className="hover:text-[#81dd1f] transition">Политика конфидециальности</a></li>
                        </ul>
                    </div>
                </nav>

                {/* Соцсети */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-2">Наши соц. сети</h3>
                    <div className="flex gap-4 text-gray-600">
                        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#81dd1f] transition">
                            <Instagram size={24} />
                        </a>
                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#81dd1f] transition">
                            <Facebook size={24} />
                        </a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#81dd1f] transition">
                            <Twitter size={24} />
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#81dd1f] transition">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Cloth-Print. Все права защищены
            </div>
        </footer>
    )
}

export default Footer;
