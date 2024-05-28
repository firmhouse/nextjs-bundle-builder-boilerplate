import { findActiveStep, Steps } from "@/lib/steps-config";
import Link from "next/link";

export default async function ProgressIndicator({
  params,
}: {
  params: { step: string };
}) {
  const { activeStep } = findActiveStep(params.step);
  const activeStepIndex = Steps.findIndex((s) => activeStep.slug === s.slug);
  const steps = Steps.map((s, index) => {
    const active = index === activeStepIndex;
    const visited = index < activeStepIndex;
    return (
      <div
        className="flex md:block w-full md:w-auto justify-between md:items-center"
        key={s.slug}
      >
        <Link
          href={visited ? `/bundle/${s.slug}` : `#`}
          aria-disabled={!visited}
          className="flex items-center md:flex-row flex-col justify-center md:justify-normal h-max w-full md:w-max"
        >
          <div
            className={`p-1 w-8 h-8 border rounded-full text-center font-bold text-sm md:text-base relative md:after:hidden ${
              active
                ? "bg-attentionBlue text-white border-attentionBlue"
                : visited
                ? "bg-white border-2 border-attentionBlue text-attentionBlue"
                : "bg-white border-2 border-gray-500 text-gray-500"
            } ${
              index !== Steps.length - 1 ? "after:absolute after:w-[60px] after:h-1 af after:top-3.5 after:-right-[61px] after:z-0 after:border-t-2" : ""
            } ${
              index !== Steps.length - 1 ? (visited ? "after:border-attentionBlue" : "after:border-gray-500") : ""
            }`}
            
          >
            {index + 1}
          </div>
          <div
            className={`md:w-max md:whitespace-nowrap text-center text-xs md:text-sm md:pl-4 ${
              active
                ? " text-attentionBlue font-bold"
                : visited
                ? "text-attentionBlue"
                : "text-gray-500"
            }`}
          >
            {s.title}
          </div>
        </Link>
        {index !== Steps.length - 1 && (
          <div
            className={`hidden md:block mx-0 w-0 mt-0 border-t-0 h-3.5 border-l-2 ml-4 ${
              visited ? "border-attentionBlue" : "border-gray-500"
            }`}
          ></div>
        )}
      </div>
    );
  });

  return (
    <div className="flex w-full md:flex-col bg-white md:w-min p-6 h-min  max-w-[411px]">{steps}</div>
  );
}
