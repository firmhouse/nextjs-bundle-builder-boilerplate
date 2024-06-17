import { firmhouseClient } from "@/lib/firmhouse-client";
import ProductList from "@/components/ProductList";
import { findActiveStep } from "@/lib/steps-config";
import { getCartOrCreate } from "@/lib/cart";
import { notFound } from "next/navigation";
import PlanList from "@/components/PlanList";

export default async function Index({
  params,
}: {
  params: { step?: string[] };
}) {
  const cart = await getCartOrCreate();

  const { activeStep } = findActiveStep(params.step?.join("/"));

  if (activeStep.type === "plan") {
    const { results } = await firmhouseClient.plans.fetchAll({});
    const plans = results.filter(
      (plan) => !activeStep.filter || activeStep.filter(plan, cart)
    );
    return (
      <div className="p-8 w-full h-full">
        <PlanList plans={plans} activePlan={cart.activePlan} />
      </div>
    );
  }
  if (activeStep.type === "product") {
    const { results } = await firmhouseClient.products.fetchAll({});
    const products = results.filter(
      (product) => !activeStep.filter || activeStep.filter(product)
    );
    return (
      <div className="p-8 w-full h-full">
        <ProductList products={products} subscribedPlan={cart.subscribedPlan} cart={cart} allowSingleSelection={activeStep.allowSingleSelection}/>
      </div>
    );
  }

  return notFound();
}
