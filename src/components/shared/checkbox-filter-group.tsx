import React, {ChangeEvent} from 'react';
import {FilterChecboxProps, FilterCheckbox} from "./filter-checkbox";
import {Input} from "../ui";


type PropsType = {
    className?: string;
    title: string;
    items: FilterChecboxProps[];
    defaultItems?: FilterChecboxProps[];
    limit?: number;
    loading?: boolean;
    onChange?: (values: string[]) => void;
}


export const CheckboxFilterGroup: React.FC<PropsType> = ({
                                                             className,
                                                             title,
                                                             items,
                                                             limit = 5,
                                                             loading = false,


                                                         }) => {
    const [showAll, setShowAll] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const list = showAll ?
        items.filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())) : items.slice(0, limit);
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    if (loading) {
        return (
            <div className={className}>
                <p className={"font-bold mb-3"}>{title}</p>
            </div>
        )

    }
    return (
        <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {showAll && (
                <div className={'mb-5'}>
                    <Input
                        className={'bg-gray-50 border-none'}
                        onChange={onChangeSearch}
                        placeholder={'Search ...'}/>
                </div>)}
            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(checked) => {
                            console.log(checked)
                        }}

                    />
                ))}
            </div>
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={'text-primary font-bold text-sm'}>
                        {showAll ? 'Show less' : 'Show all'}
                    </button>
                </div>)}

        </div>
    );
}