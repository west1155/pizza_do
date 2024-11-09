import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filter-checkbox";


type PropType = {
    className?: string
}

export const Filters: React.FC<PropType> = ({className}) => {
    return (
        <div className={className}>
            <Title text={'filtration'} size={'sm'} className={'mb-5 font-bold'}/>
            <div className={'flex flex-col gap-4'}>
                <FilterCheckbox text={'can pick up'} value={'1'}/>
                <FilterCheckbox text={'new pizzas'} value={'2'}/>
            </div>
        </div>
    );
}