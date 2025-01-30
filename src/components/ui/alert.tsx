"use client";

import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
    title: string;
    description?: string;
    duration?: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const Alert: React.FC<AlertProps> = ({
                                         title,
                                         description,
                                         duration = 5000, // Default duration: 5 seconds
                                         open,
                                         onOpenChange,
                                     }) => {
    return (
        <ToastPrimitive.Provider swipeDirection="right">
            <ToastPrimitive.Root
                className={cn(
                    "group relative pointer-events-auto flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
                    "bg-background border-border text-foreground"
                )}
                open={open}
                onOpenChange={onOpenChange}
            >
                {/* Content */}
                <div className="flex flex-col space-y-1">
                    <ToastPrimitive.Title className="text-sm font-semibold">
                        {title}
                    </ToastPrimitive.Title>
                    {description && (
                        <ToastPrimitive.Description className="text-sm text-muted-foreground">
                            {description}
                        </ToastPrimitive.Description>
                    )}
                </div>

                {/* Close Button */}
                <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/70 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </ToastPrimitive.Close>
            </ToastPrimitive.Root>

            {/* Viewport */}
            <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex w-full max-w-xs flex-col gap-4" />
        </ToastPrimitive.Provider>
    );
};


