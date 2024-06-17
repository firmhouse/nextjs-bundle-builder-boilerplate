import { FirmhouseCart, FirmhousePlan, FirmhouseProduct } from "@firmhouse/firmhouse-sdk";
import { productConfig } from "./product-config";

interface BaseStep  {
  slug: string;
  title: string;
  description: string;
  required?: boolean;
}

export interface ProductStep extends BaseStep {
  type: 'product';
  filter?: (product: FirmhouseProduct, cart?: FirmhouseCart) => boolean;
  allowSingleSelection?: boolean;
}

export interface PlanStep extends BaseStep {
  type: 'plan';
  filter?: (plan: FirmhousePlan, cart?: FirmhouseCart) => boolean;
}

export type Step = ProductStep | PlanStep;

export const steps: Step[] = [
  {
    slug: "frequency",
    title: "Frequency",
    description: "Choose how often you want to send your box",
    type: 'plan'
  },
  {
    slug: "box",
    title: "Box",
    description: "Start with a box to keep your items",
    filter: (product) => !!product.sku && productConfig[product.sku]?.type === 'box',
    required: true,
    type: 'product',
    allowSingleSelection: true
  },
  {
    slug: "content",
    title: "Content",
    description: "Select the types of items you want to include in your box. A random assortment of items will be included in your box each time.",
    filter: (product, cart?: FirmhouseCart) => !!product.sku && productConfig[product.sku]?.type === 'random-item',
    type: 'product',
    required: true
  } as ProductStep
]

export const findActiveStep = (slug?: string): { activeStep: Step, nextStep?: Step, previousStep?: Step } => {
  const query = slug ?? steps[0].slug;
  const stepIndex = steps.findIndex(s => s.slug === query);
  if (stepIndex === -1) {
    throw new Error('Not found');
  }
  return {
    activeStep: steps[stepIndex],
    nextStep: stepIndex <= steps.length - 1 ? steps[stepIndex + 1] : undefined,
    previousStep: stepIndex > 0 ? steps[stepIndex - 1] : undefined
  }
}