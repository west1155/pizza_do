// src/app/api/products/search/route.ts
import { NextResponse } from 'next/server';
import { GETSearchParams } from '../../../lib/get-pizzas';
import { prisma } from '../../../../../prisma/prisma-client';


const getSearchParams = <T>(url: string) => {
  const { searchParams } = new URL(url);

  const params = Object.fromEntries(searchParams);

  return params as T;
};

export async function GET(req: Request) {
  const params = getSearchParams<GETSearchParams>(req.url);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: params.query,
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  return NextResponse.json(products);
}