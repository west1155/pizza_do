import React from "react";
import {ICartItem} from "../../../store/cart";


interface Props {
  name: string;
  pizzaSize?: number | null;
  type?: number | null;
  ingredients?: ICartItem['ingredients'];
}

export const CartItemInfo: React.FC<Props> = ({ name, pizzaSize, type, ingredients }) => {
  const details = [];

  if (pizzaSize) {
    const typeName = type === 1 ? 'Traditional ' : 'Thin';
    details.push(`${typeName} ${pizzaSize} cm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient: any) => ingredient.name));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400">{details.join(', ')}</p>
    </div>
  );
};
