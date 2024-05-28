"use client";
import { addToCart, removeFromCart } from "@/lib/cart";
import {
  formatPriceWithCurrency,
  getBillingFrequencyForProduct,
} from "@/lib/utils";
import {
  FirmhouseProduct,
  FirmhouseSubscribedPlan,
} from "@firmhouse/firmhouse-sdk";
import Image from "next/image";
import { useFloating, useHover, useInteractions } from "@floating-ui/react";
import { useCallback, useTransition, useState } from "react";

export interface ProductProps {
  product: FirmhouseProduct;
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  currency?: string | null;
  orderedProductId?: string;
  locale?: string | null;
  children?: React.ReactNode;
  description?: string;
  specs?: string[];
}

export function Product({
  currency,
  locale,
  children,
  product,
  subscribedPlan,
  orderedProductId,
  description,
  specs,
}: ProductProps) {
  const { title, imageUrl, priceCents } = product;
  const frequency = getBillingFrequencyForProduct(product, subscribedPlan);

  const [pending, startTransition] = useTransition();
  const selected =
    (!pending && orderedProductId) || (pending && !orderedProductId);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const onClick = useCallback(() => {
    startTransition(() => {
      if (!!orderedProductId) {
        removeFromCart(orderedProductId);
      } else {
        addToCart(product.id);
      }
    });
  }, [product.id, orderedProductId]);

  return (
    <button disabled={pending} onClick={onClick}>
      <div className="my-2 mx-4 rounded-sm w-[200px] h-[380px] border border-gray-300 bg-white relative">
        <div
          ref={refs.setReference}
          {...getReferenceProps()}
          className="absolute right-2 top-2 p-2 group"
        >
          <Image src="/info.svg" height={18} width={18} alt="Details" />
        </div>
        {isOpen && <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="text-start [&_p]:text-start bg-black text-white rounded p-4 w-[300px] max-w-[80vw] z-20 [&_hr]:border-none [&_hr]:my-2"
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        />}
        <Image
          className="object-cover w-full h-1/2"
          src={imageUrl ?? ""}
          width={200}
          height={200}
          alt={title}
        />
        <div
          className={`w-8 h-8 absolute top-4 left-4 rounded border border-gray-300 flex items-center justify-center ${
            selected ? "bg-attentionBlue" : ""
          }`}
        >
          {selected && (
            <Image src="/check.svg" width={13} height={10} alt="Selected" />
          )}
        </div>
        <div className="flex flex-col items-start justify-between w-full h-1/2 p-4 bg-gray-100">
          <span className="font-bold text-left">{title}</span>
          <ul className="font-light text-gray-900 text-left list-disc text-xs px-3">
            {specs?.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          {priceCents && (
            <span className="font-bold text-attentionBlue">
              {formatPriceWithCurrency(priceCents, currency, locale)}
              {frequency}
            </span>
          )}
          {children}
        </div>
      </div>
    </button>
  );
}
