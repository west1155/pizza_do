import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";


type PropsType = {
    className?: string;
    title: string;
    items: FilterChecboxProps[];
    defaultItems?: FilterChecboxProps[];
    limit?: number;
    onChange?: (values: string[]) => void;
    defaultValues?: string[];
}


export const CheckboxFilterGroup: React.FC<PropsType> = ({
                                                             className,
                                                             title,
                                                             defaultValues,
                                                             onChange,
                                                             limit,
                                                             items,

                                                         }) => {
    return (<div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            <div className={'mb-5'}>
                <Input placeholder={'Search ...'} className={'bg-gray-50 border-none'} />
            </div>
            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {items.map((item, index) => {
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        onChange={onChange}
                        defaultChecked={defaultValues?.includes(item.value)}
                    />
                })}
            </div>

        </div>
    );
}