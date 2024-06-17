"use client";
import {
  FirmhousePlan,
  FirmhouseSubscribedPlan,
} from "@firmhouse/firmhouse-sdk";
import { startTransition } from "react";
import { updatePlan } from "@/lib/cart";
import { Plan, PlanProps } from "./Plan";

export interface PlanListProps {
  plans: FirmhousePlan[];
  endCursor?: string | null;
  hasNextPage?: boolean;
  PlanComponent?: React.ComponentType<PlanProps>;
  activePlan: FirmhousePlan | null;
}

export default function PlanList({
  plans,
  activePlan,
  PlanComponent = Plan,
}: PlanListProps) {
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-8 ">
      {plans?.map((plan) => {
        const selected = !!activePlan && plan.slug === activePlan.slug;
        return (
          <button
            key={plan.slug}
            onClick={() => {
              startTransition(() => {
                updatePlan(plan.slug);
              });
            }}
            disabled={selected}
          >
            <PlanComponent plan={plan} selected={selected} />
          </button>
        );
      })}
    </div>
  );
}
