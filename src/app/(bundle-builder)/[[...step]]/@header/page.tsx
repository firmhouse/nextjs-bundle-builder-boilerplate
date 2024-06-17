import { findActiveStep } from "@/lib/steps-config";
import Image from "next/image";
import Link from "next/link";

export default async function Index({
  params,
}: {
  params: { step?: string[] };
}) {
  const { previousStep, activeStep } = findActiveStep(params.step?.join("/"));

  return (
    <div className="flex flex-row items-center mx-8 text-left">
      {previousStep && (
        <Link className="p-2" href={`/${previousStep.slug}`}>
          <Image src="/chevron.svg" width={32} height={32} alt="Back" />
        </Link>
      )}
      {!previousStep && <div className="px-6"></div>}
      <div>
        <h1 className="font-semibold text-lg">{activeStep.title}</h1>
        <p>{activeStep.description}</p>
      </div>
    </div>
  );
}
