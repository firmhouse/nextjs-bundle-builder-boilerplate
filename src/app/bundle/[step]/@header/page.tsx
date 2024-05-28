import { findActiveStep } from "@/lib/steps-config";
import Link from "next/link";
import Image from "next/image";

export default async function Index({ params }: { params: { step: string } }) {
  const { previousStep, activeStep } = findActiveStep(params.step);

  return (
    <div className="flex flex-col md:px-10 px-4">
      {previousStep && (
        <Link href={`/bundle/${previousStep.slug}`} className="hidden md:flex items-center pb-6">
          <Image className="" src="/chevron.svg" alt="Back" width={32} height={32} />
          <span className="text-sm font-bold" >
            Terug
          </span>
        </Link>
      )}
      <h1 className="text-3xl md:text-4xl font-light pb-2 md:pb-0">{activeStep.title}</h1>
      <p className="text-sm md:text-base ">{activeStep.description}</p>
    </div>
  );
}
