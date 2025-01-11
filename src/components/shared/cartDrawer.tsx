import React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"; // Ensure imports are correct

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {/* Add your cart items here */}
            </SheetContent>
        </Sheet>
    );
};
