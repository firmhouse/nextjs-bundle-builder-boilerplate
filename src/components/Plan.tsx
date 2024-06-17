"use client";
import {
  formatPriceWithCurrency,
  getBillingFrequencyForProduct,
} from "@/lib/utils";
import {
  FirmhousePlan,
  FirmhouseProduct,
  FirmhouseSubscribedPlan,
} from "@firmhouse/firmhouse-sdk";
import Image from "next/image";

export interface PlanProps {
  plan: FirmhousePlan;
  currency?: string | null;
  locale?: string | null;
  children?: React.ReactNode;
  selected?: boolean;
}

export function Plan({ plan, selected }: PlanProps) {
  const { name } = plan;
  return (
    <div
      className={`p-4 m-2 rounded-2xl w-full relative text-center ${
        selected ? "bg-black text-white" : "bg-white"
      }`}
    >
      <span className="font-medium">{name}</span>
    </div>
  );
}
