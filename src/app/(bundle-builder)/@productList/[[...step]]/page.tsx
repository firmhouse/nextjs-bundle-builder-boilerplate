import { firmhouseClient } from "@/lib/firmhouse-client";
import ProductList from "@/components/ProductList";
import { findActiveStep } from "@/lib/steps-config";
import { getCartOrCreate } from "@/lib/cart";

export default async function Index({ params }: { params: { step?: string[] } }) {
  const cart = await getCartOrCreate();
  const { results } = await firmhouseClient.products.fetchAll({});
  const { activeStep } = findActiveStep(params.step?.join("/"));
  const products = results.filter((product) => activeStep.filter(product));

  return (
    <div className="p-8 w-full h-full">
      <ProductList products={products} subscribedPlan={cart.subscribedPlan} />
    </div>
  );
}
