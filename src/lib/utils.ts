import { FirmhouseCart, FirmhouseOrderedProduct, FirmhouseProduct, FirmhouseSubscribedPlan } from "@firmhouse/firmhouse-sdk";

export function formatPriceWithCurrency(
  amountCents: number,
  currency?: string | null,
  locale?: string | null,
  decimalPoints = 2
): string {
  return Intl.NumberFormat(locale ?? undefined, {
    currency: currency ?? 'EUR',
    style: 'currency',
    maximumFractionDigits: decimalPoints,
    minimumFractionDigits: decimalPoints,
  }).format(amountCents / 100);
}

export function frequencyFromInterval(interval: number | null, intervalUnitOfMeasure: string | null) {
  if (
    intervalUnitOfMeasure === null ||
    interval === null ||
    intervalUnitOfMeasure === 'only_once' ||
    typeof intervalUnitOfMeasure !== 'string' ||
    typeof interval !== 'number'
  ) {
    return '';
  }
  if (interval === 1) {
    // interval units are always plural, so we remove the last character
    return ` / ${intervalUnitOfMeasure.slice(0, -1)}`.toLowerCase();
  }

  return ` / ${interval} ${intervalUnitOfMeasure}`.toLowerCase();
}

export function getBillingFrequency(
  orderedProduct: FirmhouseOrderedProduct,
  plan?: FirmhouseSubscribedPlan | null
) {
  const { interval, intervalUnitOfMeasure, recurring } = orderedProduct;
  if (!recurring) {
    return '';
  }
  const isPlanBased = !!plan;
  if (isPlanBased) {
    return frequencyFromInterval(plan.billingCycleInterval, plan.billingCycleIntervalUnit)
  }

  if (intervalUnitOfMeasure === 'default') {
    return frequencyFromInterval(orderedProduct.product.interval, orderedProduct.product.intervalUnitOfMeasure);
  }
  return frequencyFromInterval(interval, intervalUnitOfMeasure);
}

export function getBillingFrequencyForProduct(product: FirmhouseProduct, plan?: FirmhouseSubscribedPlan | null) {
  if (product.productType === 'one_time_purchase') {
    return '';
  }
  if (!!plan) {
    return frequencyFromInterval(plan.billingCycleInterval, plan.billingCycleIntervalUnit);
  }
  return frequencyFromInterval(product.interval, product.intervalUnitOfMeasure);
}

export function findOrderedProductsWithProductIds(cart: FirmhouseCart, productIds: string[]) {
  const orderedProducts =  cart.orderedProducts?.filter((op) => productIds.includes(op.productId));
  return Object.fromEntries(orderedProducts?.map((op) => [op.productId, op.id]) ?? []);
}
