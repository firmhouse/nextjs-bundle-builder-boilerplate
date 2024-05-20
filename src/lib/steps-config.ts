import { FirmhouseCart, FirmhouseProduct } from "@firmhouse/firmhouse-sdk";

export interface Step {
  slug: string;
  title: string;
  description: string;
  filter: (product: FirmhouseProduct, cart?: FirmhouseCart) => boolean;
  required?: boolean;
}

export const containsTag = (product: FirmhouseProduct, tag: string): boolean => {
  const metadata = product.metadata as { tags?: string[] };
  return !!metadata.tags && metadata.tags.includes(tag)
}

export const Steps: Step[] = [
  {
    slug: "box",
    title: "Choose your box",
    description: "Start with a box to keep your items",
    filter: (product) => true,
    required: true
  },
  {
    slug: "gift",
    title: "Choose your gift",
    description: "Choose your gift to put in the box",
    filter: (product, cart?: FirmhouseCart) => {
      const selectedBox = cart?.orderedProducts?.find((op) => containsTag(op.product, 'box'))?.product
      const { size } = (selectedBox?.metadata ?? {}) as { size?: string }
      return containsTag(product, 'gift') && (!size || containsTag(product, size))
    },
  },
  {
    slug: "ribbon",
    title: "Choose a ribbon",
    description: "Choose a ribbon to wrap the box",
    filter: (product) => containsTag(product, 'ribbon')
  }
]

export const findActiveStep = (slug?: string): { activeStep: Step, nextStep?: Step, previousStep?: Step } => {
  const query = slug ?? 'box'
  const stepIndex = Steps.findIndex(s => s.slug === query);
  if (stepIndex === -1) {
    throw new Error('Not found');
  }
  return {
    activeStep: Steps[stepIndex],
    nextStep: stepIndex <= Steps.length - 1 ? Steps[stepIndex + 1] : undefined,
    previousStep: stepIndex > 0 ? Steps[stepIndex - 1] : undefined
  }
}