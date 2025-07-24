import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true, // ✅ Пропускает ошибки типов
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ Пропускает ESLint при build
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'tasteful-car-ac493b6d8a.media.strapiapp.com', 'ik.imagekit.io']
    }
};

export default nextConfig;
