import { FirmhouseCart } from "@firmhouse/firmhouse-sdk";
import { CartProduct } from "./CartProduct";
import Link from "next/link";
import { formatPriceWithCurrency } from "@/lib/utils";
export interface CartProps {
  cart?: FirmhouseCart | null;
  hideCheckout?: boolean;
  children?: React.ReactNode;
}

export default function Cart({ cart, hideCheckout, children }: CartProps) {
  const {
    orderedProducts,
    amountForStartingSubscriptionCents,
    monthlyAmountCents,
    currency,
    locale,
    subscribedPlan
  } = cart ?? { orderedProducts: [] };
  const isCheckoutEnabled = (cart?.orderedProducts ?? []).length > 0;
  const sortedOrderedProducts = orderedProducts?.sort((a, b) => a.id.localeCompare(b.id)) ?? [];
  return (
    <div className="flex h-full w-full align-middle justify-between flex-col p-8">
      <div className={`max-h-auto overflow-y-auto`}>
        <h2 className="font-bold text-xl">Cart</h2>
        {orderedProducts?.length === 0 && (
          <p className="text-gray-500 p-4">No products in cart</p>
        )}
        {sortedOrderedProducts.map((orderedProduct) => (
          <CartProduct
            key={orderedProduct.id}
            orderedProduct={orderedProduct}
            subscribedPlan={subscribedPlan}
            currency={currency}
            locale={locale}
          />
        ))}
      </div>
      {isCheckoutEnabled && (
        <div className="mt-auto">
          <div className="flex flex-row justify-between border-t-gray-100 border-t my-4 pt-8">
            <p className="font-semibold">Subtotal (pay now)</p>
            <p className="font-light">
              {formatPriceWithCurrency(
                amountForStartingSubscriptionCents ?? 0,
                currency,
                locale
              )}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-light">Total per month</p>
            <p className="font-light">
              {formatPriceWithCurrency(
                monthlyAmountCents ?? 0,
                currency,
                locale
              )}
            </p>
          </div>
          {cart?.checkoutUrl && !hideCheckout && (
            <Link
              className="block text-center w-full bg-gray-900 text-gray-50 rounded-md p-2 my-4 font-semibold"
              href={cart?.checkoutUrl}
            >
              Checkout
            </Link>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
