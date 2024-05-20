import { findActiveStep, Steps } from "@/lib/steps-config";
import Link from "next/link";

export default async function ProgressIndicator({
  params,
}: {
  params: { step?: string[] };
}) {
  const { activeStep } = findActiveStep(params.step?.join("/"));
  const activeStepIndex = Steps.findIndex((s) => activeStep.slug === s.slug);
  const steps = Steps.map((s, index) => {
    const active = index === activeStepIndex;
    const visited = index < activeStepIndex;
    return (
      <Link href={visited ? `/${s.slug}` : `#`} aria-disabled={!visited} key={s.slug} className="flex flex-col p-2 text-center items-center">
        <div
          className={`p-1 w-8 h-8 border rounded-full text-center ${
            active
              ? "bg-gray-900 text-gray-50"
              : (visited
              ? "bg-gray-200"
              : "border-1 text-gray-900")
          }`}
        >
          {index + 1}
        </div>
        <div>{s.title}</div>
      </Link>
    );
  });

  return (
    <div className="flex w-full justify-evenly items-center">{steps}</div>
  );
}
