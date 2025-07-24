import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {GoogleOAuthProvider} from '@react-oauth/google'
import Provider from "@/app/Provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClothPrint",
  description: "my lovable next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <div className=''>
              <Provider>
                  {children}
              </Provider>
          </div>
      </GoogleOAuthProvider>

      </body>
    </html>
  );
}
