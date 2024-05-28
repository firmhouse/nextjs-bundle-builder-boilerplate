import { FirmhouseCart, FirmhouseProduct } from "@firmhouse/firmhouse-sdk";
import { SignifyProductMetadata, signifyProducts } from "./product-config";
export interface Step {
  slug: string;
  title: string;
  description: string;
  filter?: (product: FirmhouseProduct, cart?: FirmhouseCart) => boolean;
  type: 'product' | 'summary';
  image?: string;
  getGroup?: (product: FirmhouseProduct) => string;
  getProductMetadata?: (product: FirmhouseProduct, locale?: "nl") => SignifyProductMetadata;
}

export const containsTag = (product: FirmhouseProduct, tag: string): boolean => {
  const metadata = product.metadata as { tags?: string[] };
  return !!metadata.tags && metadata.tags.includes(tag)
}

export const Steps: Step[] = [
  {
    slug: "lampen",
    title: "Lampen",
    description: "Bedien elke lamp met de app, uw stem of een slimme schakelaar.",
    filter: (product) => !!signifyProducts.lamps[product.id],
    type: 'product',
    image: '/step-1.jpg',
    getGroup: (product) => signifyProducts.lamps[product.id].nl.type ?? '',
    getProductMetadata: (product, locale) => signifyProducts.lamps[product.id][locale ?? 'nl']
  },
  {
    slug: "accessoires",
    title: "Accessoires",
    description: "Want to control your lights with more than the app? You’ll need a Bridge in your setup to use accessories.",
    filter: (product) => !!signifyProducts.accessories[product.id],
    type: 'product',
    image: '/step-2.jpg',
    getGroup: (product) => signifyProducts.accessories[product.id].nl.type ?? '',
    getProductMetadata: (product, locale) => signifyProducts.accessories[product.id][locale ?? 'nl']
  },
  {
    slug: "bridge",
    title: "Bridge",
    description: "Want to control your lights with more than the app? You’ll need a Bridge in your setup to use accessories.",
    filter: (product) => !!signifyProducts.bridges[product.id],
    type: 'product',
    image: '/step-3.jpg',
    getProductMetadata: (product, locale) => signifyProducts.bridges[product.id][locale ?? 'nl']
  },
  {
    slug: "order",
    title: "Order overzicht",
    description: "Bijna klaar! Onthoud dat je op elk moment je setup kunt uitbreiden of wijzigen.",
    type: 'summary',
    image: '/step-4.jpg'
  }
]

export const findActiveStep = (slug?: string): { activeStep: Step, nextStep?: Step, previousStep?: Step } => {
  const query = slug 
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