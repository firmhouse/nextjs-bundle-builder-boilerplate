import { getCartOrCreate } from "@/lib/cart";
import Cart from "@/components/Cart";
import { findActiveStep } from "@/lib/steps-config";
import Link from "next/link";
import { findOrderedProductsWithProductIds } from "@/lib/utils";
import { firmhouseClient } from "@/lib/firmhouse-client";

export default async function Index({
  params,
}: {
  params: { step?: string[] };
}) {
  const cart = await getCartOrCreate();
  const { activeStep, nextStep } = findActiveStep(params.step?.join("/"));
  
  let nextStepDisabled = false;
  if (activeStep.type === "product" && activeStep.required) {
    const { results } = await firmhouseClient.products.fetchAll({});
    const products = results.filter(
      (product) => !activeStep.filter || activeStep.filter(product)
    );
    nextStepDisabled =
      activeStep.required &&
      activeStep.type === "product" &&
      Object.keys(findOrderedProductsWithProductIds(
        cart,
        products.map((product) => product.id)
      )).length === 0;
  }

  return (
    <div className="h-[370px] md:h-full w-full bg-white md:w-[300px] fixed bottom-0 md:top-0 md:right-0 md:pt-8 md:border-l">
      <Cart cart={cart} hideCheckout={!!nextStep || nextStepDisabled}>
        {(nextStep && !nextStepDisabled) && (
          <Link
            className="block text-center w-full bg-gray-900 text-gray-50 rounded-md p-2 my-4 font-semibold justify-end"
            href={`/${nextStep.slug}`}
          >
            Next
          </Link>
        )}
        {nextStepDisabled && (
          <span className="block text-center w-full p-2 my-4 justify-end" >You need to select a product to continue</span>
        )}
      </Cart>
    </div>
  );
}
