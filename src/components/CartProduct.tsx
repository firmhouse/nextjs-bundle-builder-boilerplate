"use client";

import Image from "next/image";
import { QuantityInput } from "./QuantityInput";
import {
  FirmhouseOrderedProduct,
  FirmhouseSubscribedPlan,
} from "@firmhouse/firmhouse-sdk";
import { formatPriceWithCurrency, getBillingFrequency } from "@/lib/utils";
import { startTransition } from "react";
import { removeFromCart, updateQuantity } from "@/lib/cart";
export interface CartProductProps {
  orderedProduct: FirmhouseOrderedProduct;
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  currency?: string | null;
  locale?: string | null;
  fullWidth?: boolean;
}

export async function CartProduct({
  orderedProduct,
  subscribedPlan,
  currency,
  locale,
  fullWidth,
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
    <div
      className={`flex flex-row items-center my-2 py-4 border-[#d9d9d9] ${
        fullWidth ? "border-b [&:last-of-type]:border-0" : ""
      }`}
    >
      {fullWidth && (
        <Image
          className="pr-2 w-[120px] h-[120px] md:h-12 md:w-16 rounded-2xl object-cover"
          src={product.imageUrl ?? ""}
          width={120}
          height={120}
          alt={title ?? ""}
        />
      )}
      <div
        className={`flex w-full ${
          fullWidth ? "flex-col md:flex-row  items-start" : " items-center"
        }`}
      >
        <div className="flex-col justify-between px-2">
          <p className="font-bold">{title}</p>
          {price && plan === null && (
            <p className="font-bold text-attentionBlue">
              {formatPriceWithCurrency(price, currency, locale, 2)}
              {frequency}
            </p>
          )}
        </div>
        <div className={`flex ${fullWidth ? "pt-2.5 md:pt-0 md:ml-auto" : "ml-auto"}`}>
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
            <Image src="/trash.svg" width={32} height={32} alt="Remove" />
          </button>
        </div>
      </div>
    </div>
  );
}
