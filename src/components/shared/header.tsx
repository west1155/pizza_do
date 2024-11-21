import React from "react";
import {cn} from "../../lib/utils";
import Image from "next/image";
import {ArrowRight, ShoppingCart, User} from "lucide-react";
import {Container} from "./container";
import {Button} from "../ui";
import {SearchBar} from "./searchBar";


type PropsType = {
    className?: string;
}


export const Header: React.FC<PropsType> = ({className}) => {
    return (
        <header className={cn('border border-b-gray-100', className)}>
            <Container className={cn('flex items-center justify-between py-8 px-12')}>
                <div className={'flex items-center gap-4'}>
                    <Image src='/logo.png' width={35} height={35} alt="Logo"/>
                    <div>
                        <h1 className={'text-2xl uppercase font-black'}>Pizza Do</h1>
                        <p className={'text-sm text-gray-400 leading-3'}>Order your favourite pizza</p>
                    </div>
                    <div className={'mx-10 flex-1'}>
                       <SearchBar/>
                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <Button variant={'outline'} className={'flex items-center gap-1'}>
                        <User size={16}/>
                        Sign In
                    </Button>
                    <div>
                        <Button className={'relative group'}>
                            <b>45£</b>
                            <span className={'h-full w-[1px] bg-white/30 mx-3 '}/>
                            <div className={'flex items-center gap-1 transition duration-300 group-hover:opacity-0 '}>
                                <ShoppingCart className={'h-4 w-4 relative strokeWidth={2} '}/>
                                <b>3</b>
                            </div>
                            <ArrowRight
                                className={'w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 '}/>
                        </Button>
                    </div>
                </div>
            </Container>


        </header>
    )
}