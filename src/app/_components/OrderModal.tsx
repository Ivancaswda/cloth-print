import React from "react";
import {XCircleIcon} from "lucide-react";

const OrderModal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 cursor-pointer">
                <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-full overflow-auto p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute  top-3 right-3 text-gray-600 hover:text-gray-900 transition"
                        aria-label="Close modal"
                    >
                        <XCircleIcon className="w-6 h-6" />
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};
export default OrderModal