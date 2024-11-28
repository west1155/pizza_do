import {axiosInstance} from "@/services/instance";
import {Ingredient} from "@prisma/client";

export const getAll = async () => {
    const { data } = await axiosInstance.get<Ingredient[]>('/ingredients');

    return data;
};