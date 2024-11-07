import type {Metadata} from "next";
import {Nunito} from 'next/font/google';
import "./globals.css";

const nunito = Nunito({
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: "Pizza do | Home",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${nunito.variable} antialiased`}>
             <main className={"min-h-screen"}> {children}</main>
        </body>
        </html>
    );
}
