"use client";

import Image from "next/image";
import { QuantityInput } from "./QuantityInput";
import { FirmhouseOrderedProduct, FirmhouseSubscribedPlan } from "@firmhouse/firmhouse-sdk";
import { formatPriceWithCurrency, getBillingFrequency } from "@/lib/utils";
import { startTransition } from "react";
import { removeFromCart, updateQuantity } from "@/lib/cart";
export interface CartProductProps {
  orderedProduct: FirmhouseOrderedProduct;
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  currency?: string | null;
  locale?: string | null;
}

export async function CartProduct({
  orderedProduct,
  subscribedPlan,
  currency,
  locale,
}: CartProductProps) {
  const frequency = getBillingFrequency(orderedProduct, subscribedPlan);
  const {
    id,
    title,
    quantity,
    priceIncludingTaxCents: price,
    plan,
    product,
  } = orderedProduct;
  return (
    <div className="flex flex-row items-center my-2">
      <Image
        className="px-2 h-12 w-16 rounded-2xl object-cover"
        src={product.imageUrl ?? ""}
        width={64}
        height={64}
        alt={title ?? ""}
      />
      <div className="flex-col justify-between px-2">
        <p className="font-semibold">
          {title} x {quantity}
        </p>
        {price && plan === null && (
          <p className="text-sm font-light">
            {formatPriceWithCurrency(price, currency, locale, 0)}
            {frequency}
          </p>
        )}
        {plan !== null && (
          <p className="text-sm font-light">Included in plan</p>
        )}
        <div className="flex items-center">
          <QuantityInput
            onUpdateQuantity={(quantity) => {
              startTransition(() => {
                updateQuantity(id, quantity);
              });
            }}
            quantity={quantity ?? 1}
          />
          <button
            onClick={() => {
              startTransition(() => {
                removeFromCart(id);
              });
            }}
            className="text-sm font-light underline mx-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
