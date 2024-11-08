import {cn} from "@/lib/utils";


type PropsType = {
    className?: string;
}

const arr = ['all', 'meat', 'vegan', 'gluten-free', 'spicy', 'sweet', 'sour', 'bitter', 'salty', 'umami', 'savory', 'tangy'];
const activeIndex = 0;

export const Categories: React.FC = ({className}: PropsType) => {
    return <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {arr.map((item, index) => {
            return <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary',
            )} key={index}>
                <button>
                    {item}
                </button>
            </a>
        })}
    </div>

}