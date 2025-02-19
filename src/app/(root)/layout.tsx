import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import React from "react";

export const metadata: Metadata = {
    title: 'Next Pizza | Main',
    description: 'Generated by me!',
};

export default function RootLayout({
                                       children,
                                        modal,
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-white">
            <Header/>
            {modal}
            {children}
        </main>
    );
}
