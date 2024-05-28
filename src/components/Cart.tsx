import { FirmhouseCart } from "@firmhouse/firmhouse-sdk";
import { CartProduct } from "./CartProduct";
export interface CartProps {
  cart?: FirmhouseCart | null;
  hideCheckout?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Cart({ cart, hideCheckout, children, fullWidth }: CartProps) {
  const {
    orderedProducts,
    currency,
    locale,
  } = cart ?? { orderedProducts: [] };
  return (  
    <div className="flex w-full flex-col">
      <div className="max-h-auto overflow-y-auto">
        {orderedProducts?.length === 0 && (
          <p className="text-gray-500 p-4">No products in cart</p>
        )}
        {orderedProducts?.map((orderedProduct) => (
          <CartProduct
            key={orderedProduct.id}
            orderedProduct={orderedProduct}
            subscribedPlan={cart?.subscribedPlan}
            currency={currency}
            locale={locale}
            fullWidth={fullWidth}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
