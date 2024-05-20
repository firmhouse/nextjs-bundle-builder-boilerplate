import { getCartOrCreate, removeFromCart, updateQuantity } from "@/lib/cart";
import Cart from "@/components/Cart";
import { findActiveStep } from "@/lib/steps-config";
import Link from "next/link";

export default async function Index({ params }: { params: { step?: string[] } }) {
  const cart = await getCartOrCreate();
  const { nextStep } = findActiveStep(params.step?.join("/"));

  return (
    <div className="h-full bg-white w-[300px] fixed top-0 right-0 pt-8">
      <Cart cart={cart} hideCheckout={!!nextStep}>
        {nextStep && (
          <Link
            className="block text-center w-full bg-gray-900 text-gray-50 rounded-md p-2 my-4 font-semibold justify-end"
            href={`/${nextStep.slug}`}
          >
            Next
          </Link>
        )}
      </Cart>
    </div>
  );
}
