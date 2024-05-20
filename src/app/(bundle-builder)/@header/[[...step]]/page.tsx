import { getCartOrCreate, removeFromCart, updateQuantity } from "@/lib/cart";
import Cart from "@/components/Cart";
import { findActiveStep } from "@/lib/steps-config";
import Link from "next/link";

export default async function Index({ params }: { params: { step?: string[] } }) {
  const { previousStep, activeStep } = findActiveStep(params.step?.join("/"));

  return (
    <div className="flex flex-col mx-8">
      {previousStep && <Link href={`/${previousStep.slug}`}>Back</Link>}
      <h1 className="font-semibold text-lg">{activeStep.title}</h1>
      <p>{activeStep.description}</p>
    </div>
  );
}
