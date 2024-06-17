'use client'
import { formatPriceWithCurrency, getBillingFrequencyForProduct } from '@/lib/utils';
import { FirmhouseProduct, FirmhouseSubscribedPlan } from '@firmhouse/firmhouse-sdk';
import Image from 'next/image';

export interface ProductProps  {
  product: FirmhouseProduct;
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  currency?: string | null;
  locale?: string | null;
  children?: React.ReactNode;
  selected?: boolean;
}

export function Product({
  currency,
  locale,
  children,
  product,
  subscribedPlan,
  selected
}: ProductProps) {
  const {
    title,
    imageUrl,
    priceCents,
  } = product;
  const frequency = getBillingFrequencyForProduct(product, subscribedPlan);
  return (
    <div className={`p-4 m-2 rounded-2xl w-full relative 'bg-white' ${selected? 'border-2 border-black' : 'border-2 border-transparent'}`}>
      <Image
        className="rounded-2xl w-64 h-48 object-cover"
        src={imageUrl ?? ''}
        width={256}
        height={192}
        alt={title}
      />
      <div className="flex justify-between my-2 px-2 w-full">
        <div>
          <span className="font-medium">{title}</span>
          {((priceCents ?? 0) > 0) && (
            <span className="px-2 text-sm font-light">
              {formatPriceWithCurrency(priceCents ?? 0, currency, locale)}
              {frequency}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
