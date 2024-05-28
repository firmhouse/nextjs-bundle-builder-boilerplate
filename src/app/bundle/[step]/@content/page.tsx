import { firmhouseClient } from "@/lib/firmhouse-client";
import ProductList from "@/components/ProductList";
import { findActiveStep } from "@/lib/steps-config";
import { getCartOrCreate } from "@/lib/cart";
import Cart from "@/components/Cart";

export default async function Index({ params }: { params: { step: string } }) {
  const cart = await getCartOrCreate();
  const { results } = await firmhouseClient.products.fetchAll({});
  const { activeStep } = findActiveStep(params.step);

  const products = results.filter((product) =>
    activeStep.filter ? activeStep.filter(product) : true
  );
  if (activeStep.type === "product") {
    return (
      <div className="px-4 md:px-10 w-full h-full bg-white">
        <ProductList getProductMetadata={activeStep.getProductMetadata} products={products} subscribedPlan={cart.subscribedPlan} cart={cart} groupBy={activeStep.getGroup}/>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-10 w-full h-full bg-white">
      <Cart cart={cart} fullWidth={true} />
    </div>
  );
}
