'use client'

import React from "react";

import {Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose} from "../ui/sheet";
import {Button} from "../ui";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Title} from "./title";
import {useCartStore} from "../../store/cart";
import {CartItem} from "./cartItem";


export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {

    const totalAmount = useCartStore((state) => state.totalAmount);
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);
    const items = useCartStore((state) => state.items);
    React.useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);


    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="bg-amber-50 flex flex-col justify-between">
                <div className="flex flex-col justify-center pb-0">
                    <div className="flex flex-col h-full justify-center">
                        <SheetHeader>
                            <SheetTitle>Order list</SheetTitle>
                        </SheetHeader>
                    </div>
                    <div className="flex flex-col items-center justify-center w-72 mx-auto">
                        <Title size="sm" text="Your cart is empty" className="text-center font-bold my-2"/>
                        <p className="text-center text-neutral-500 mb-5">
                            Add at least one product to complete the order
                        </p>
                        <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1'}>
                            <div className={'mb-2'}>
                                {items.map((item) => {
                                    return <CartItem key={item.id} id={item.id} price={item.price} name={item.name}
                                                     imageUrl={item.imageUrl} quantity={item.quantity}
                                                     onClickCountButton={() => alert('hi')}/>
                                })}
                            </div>
                        </div>
                        <SheetClose>
                            <Button className="w-56 h-12 text-base" size="lg">
                                <ArrowLeft className="w-5 mr-2"/>
                                Go back
                            </Button>
                        </SheetClose>
                    </div>
                </div>
                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Price:
                                <div
                                    className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </span>
                            <span className="font-bold text-lg">{totalAmount}£</span>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-base"
                            onClick={() => {
                            }}
                        >
                            Complete order
                            <ArrowRight className="w-5 ml-2"/>
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}