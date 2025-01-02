import {axiosInstance} from "./instance";
import {Ingredient} from "@prisma/client";

export const getAll = async () => {
    const { data } = await axiosInstance.get<Ingredient[]>('/ingridients');

    return data;
};