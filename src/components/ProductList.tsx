"use client";
import { FirmhouseProduct, FirmhouseSubscribedPlan } from "@firmhouse/firmhouse-sdk";
import { startTransition, useState } from "react";
import { addToCart } from "@/lib/cart";
import { Button } from "./Button";
import { Product, ProductProps } from "./Product";
import { Steps } from "@/lib/steps-config";

export interface ProductListProps {
  products: FirmhouseProduct[];
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  endCursor?: string | null;
  hasNextPage?: boolean;
  ProductComponent?: React.ComponentType<ProductProps>;
}

export default function ProductList({
  products,
  ProductComponent = Product,
  subscribedPlan
}: ProductListProps) {

  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-8 ">
      {products?.map((product) => (
        <button key={product.id} onClick={() => {
          startTransition(() => {
            addToCart(product.id);
          });
        }}>
          <ProductComponent  product={product} subscribedPlan={subscribedPlan}/>
        </button>
      ))}
    </div>
  );
}
