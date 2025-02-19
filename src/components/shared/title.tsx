import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

interface Props {
    size?: TitleSize;
    className?: string;
    text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
    const mapTagBySize = {
        xs: 'h5',
        sm: 'h4',
        md: 'h3',
        lg: 'h2',
        xl: 'h1',
        xxl: 'h1'
    } as const;

    const mapClassNameBySize = {
        xs: 'text-[16px]',
        sm: 'text-[22px]',
        md: 'text-[26px]',
        lg: 'text-[32px]',
        xl: 'text-[40px]',
        xxl: 'text-[48px]',
    } as const;

    return React.createElement(
        mapTagBySize[size],
        { className: clsx(mapClassNameBySize[size], className) },
        text,
    );
};
