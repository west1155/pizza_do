import type {Metadata} from "next";
import {Nunito} from 'next/font/google';
import "../globals.css";
import {Header} from "@/components/shared/header";

const nunito = Nunito({
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: "Pizza do | Dashboard",
};

export default function DashboardLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${nunito.variable} antialiased`}>
        <main className={"min-h-screen"}>
            <div>DASHBOARD</div>
            {children}
        </main>
        </body>
        </html>
    );
}
