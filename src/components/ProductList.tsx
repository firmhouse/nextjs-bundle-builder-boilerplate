import {
  FirmhouseCart,
  FirmhouseProduct,
  FirmhouseSubscribedPlan,
} from "@firmhouse/firmhouse-sdk";
import { Product, ProductProps } from "./Product";
import { findOrderedProductWithProductId } from "@/lib/utils";
import { SignifyProductMetadata, signifyProducts } from "@/lib/product-config";

export interface ProductListProps {
  products: FirmhouseProduct[];
  subscribedPlan?: FirmhouseSubscribedPlan | null;
  endCursor?: string | null;
  hasNextPage?: boolean;
  ProductComponent?: React.ComponentType<ProductProps>;
  groupBy?: (product: FirmhouseProduct) => string;
  getProductMetadata?: (product: FirmhouseProduct) => SignifyProductMetadata;
  cart: FirmhouseCart;
}

export default function ProductList({
  products,
  ProductComponent = Product,
  subscribedPlan,
  cart,
  groupBy,
  getProductMetadata
}: ProductListProps) {
  if (!groupBy) {
    return (
      <div className="flex overflow-x-auto pb-8">
        {products?.map((product) => (
          <ProductComponent
            key={product.id}
            orderedProductId={
              findOrderedProductWithProductId(cart, product.id)?.id
            }
            product={product}
            subscribedPlan={subscribedPlan}
            description={getProductMetadata ? getProductMetadata(product).description : undefined}
            specs={getProductMetadata ? getProductMetadata(product).specs : undefined}
          />
        ))}
      </div>
    );
  }

  const groups = products.reduce((acc, product) => {
    const key = groupBy(product);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, FirmhouseProduct[]>);

  return (
    <div className="pb-8">
      {Object.entries(groups).map(([groupName, products]) => (
        <div className="my-6 md:my-8 " key={groupName}>
          <h2 className="text-2xl md:text-3xl pb-4 md:pb-6">{groupName}</h2>
          <div className="flex overflow-x-auto -ml-3">
            {products.map((product) => (
              <ProductComponent
                key={product.id}
                orderedProductId={
                  findOrderedProductWithProductId(cart, product.id)?.id
                }
                product={product}
                subscribedPlan={subscribedPlan}
                description={getProductMetadata ? getProductMetadata(product).description : undefined}
                specs={getProductMetadata ? getProductMetadata(product).specs : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
