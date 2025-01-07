'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {Dialog} from "../../ui";
import {DialogContent} from "../../ui/dialog";


type PropsType = {
    product: any
}

export const ChooseProductModal: React.FC<PropsType> = ({ product }) => {

    const router = useRouter();

    const onCloseModal = () => {
        router.back();
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
                    Choose product form
            </DialogContent>
        </Dialog>
    );
};
