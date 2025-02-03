'use client'

import React, {useState} from "react";
import {Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose} from "../ui/sheet";
import {Alert, Button} from "../ui";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Title} from "./title";
import {CartItem} from "./cartItem";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const showAlert = () => {
        setIsAlertOpen(true);
    };
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
                        {/*<Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120}/>*/}
                        <Title size="sm" text="Your cart is empty" className="text-center font-bold my-2"/>
                        <p className="text-center text-neutral-500 mb-5">
                            Add at least one product to complete the order
                        </p>
                        <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1'}>
                            <div className={'mb-2'}>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
                                <CartItem showAlert={showAlert}
                                          imageUrl={'https://s4d-mth-prd-01-cil-lt-images-cdne.azureedge.net/Products/Original/31-214.png'}
                                          name={'posh pizza'} price={23} quantity={1}/>
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
                            <span className="font-bold text-lg">{33}£</span>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-base"
                            onClick={showAlert}
                        >
                            Complete order
                            <ArrowRight className="w-5 ml-2"/>
                        </Button>
                    </div>
                </SheetFooter>
                <Alert
                    open={isAlertOpen}
                    onOpenChange={setIsAlertOpen}
                    title="Under Construction"
                    description="This feature is currently under development"
                    duration={5000} // Auto-dismiss after 5 seconds
                />
            </SheetContent>
        </Sheet>
    );
};