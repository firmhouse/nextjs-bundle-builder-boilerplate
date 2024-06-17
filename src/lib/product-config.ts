type ProductMetadata = {
  size?: 'small' | 'medium' | 'large';
  type: string;
}

// SKU to product configuration mapping
export const productConfig: Record<string, ProductMetadata> = {
  "box-small": {
    size: "small",
    type: "box"
  },
  "box-medium": {
    size: "medium",
    type: "box"
  },
  "box-large": {
    size: "large",
    type: "box"
  },
  "random-beauty": {
    type: "random-item"
  },
  "random-toys": {
    type: "random-item"
  },
  "random-snacks": {
    type: "random-item"
  }
}