import {Categories, Container} from "@/components/shared";
import {SortPopup} from "@/components/shared/SortPopup";
import {cn} from "@/lib/utils";

type PropsType = {
    className?: string;
}

export const TopBar: React.FC<PropsType> = ({className}) => {
    return (
            <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
                <Container className="flex items-center justify-between ">
                    <Categories className={'font-light'} />
                    <SortPopup />
                </Container>
            </div>
    )
}