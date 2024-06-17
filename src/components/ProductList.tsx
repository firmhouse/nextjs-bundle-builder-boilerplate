"use client";
import { FirmhouseCart, FirmhouseProduct, FirmhouseSubscribedPlan } from "@firmhouse/firmhouse-sdk";
import { startTransition, useState } from "react";
import { addToCart, removeFromCart } from "@/lib/cart";
import { Product, ProductProps } from "./Product";
import { findOrderedProductsWithProductIds } from "@/lib/utils";

export interface ProductListProps {
  products: FirmhouseProduct[];
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  cart: FirmhouseCart;
  endCursor?: string | null;
  hasNextPage?: boolean;
  allowSingleSelection?: boolean;
  ProductComponent?: React.ComponentType<ProductProps>;
}

export default function ProductList({
  products,
  ProductComponent = Product,
  subscribedPlan,
  allowSingleSelection,
  cart
}: ProductListProps) {
  const selectedOrderProductIds = findOrderedProductsWithProductIds(cart, products.map((product) => product.id));
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-8 ">
      {products?.map((product) => (
        <button key={product.id} onClick={() => {
          startTransition(async () => {
            if(selectedOrderProductIds[product.id]) {
              removeFromCart(selectedOrderProductIds[product.id]);
              return
            }
            if(allowSingleSelection && Object.keys(selectedOrderProductIds).length > 0){
              await Promise.all(Object.values(selectedOrderProductIds).map((op) => { removeFromCart(op) }));
            }
            addToCart(product.id);
          });
        }}>
          <ProductComponent product={product} subscribedPlan={subscribedPlan} selected={!!selectedOrderProductIds[product.id]}/>
        </button>
      ))}
    </div>
  );
}
