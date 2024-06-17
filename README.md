# Firmhouse Bundle Builder Next.js Boilerplate

A boilerplate for building a subscription bundle builder with Next.js and Firmhouse SDK. You can use this boilerplate as a starting point to build a subscription bundle builder with Firmhouse SDK.

![Bundle Builder Flow](docs/flow.webp)

It's featuring:
- [Firmhouse SDK](https://github.com/firmhouse/firmhouse-sdk)
- Checkout and payment with Firmhouse
- Next.js App Router
- React Server Components
- Server Actions    
- Edge runtime
- Tailwind CSS
- TypeScript

## Running Locally

You will need to use environment variables defined in [defined in `.env.example`](.env.example) to run this project. You can create a `.env` file in the root of the project and copy the contents of `.env.example` into it. 

The only required environment variable is `NEXT_PUBLIC_PLAN_BASED_FIRMHOUSE_STOREFRONT_ACCESS_TOKEN`. You can get this from the Firmhouse Portal.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Walkthrough

The app is divided into four main sections and uses [parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) to render the pages. The main sections are:

- [Header](src/app/(bundle-builder)/@header) - The header component that displays the page title, description and navigation.
- [Progress Indicator](src/app/(bundle-builder)/@progressIndicator/page.tsx) - The progress indicator component that displays the current step in the bundle builder.
- [Order Summary (Cart)](src/app/(bundle-builder)/@orderSummary/page.tsx) - The order summary component that displays the selected products and the total price.
- [Content](src/app/(bundle-builder)/@content/page.tsx) - The content component that displays content based on the current step in the bundle builder.

### Steps and Product Metadata

The steps are defined in [lib/steps-config.ts](src/lib/steps-config.ts) file. Currently, there are only two types of steps: `product` and `plan`. But this can be extended to include more types of steps. There are some custom logic implemented in the steps to showcase how you can customize the steps based on products selected. The `required` property makes sure that user selects at least one product to proceed to the next step. The `allowSingleSelection` property allows the user to select only one product from the list of products, by default user can select multiple products. These are just examples and the logic can be customized based on the requirements.

The product metadata is defined in [lib/product-config.ts](src/lib/product-config.ts) file. It currently contains the product metadata for the products that are displayed in the bundle builder. It's a simple mapping of SKUs of the products configure in Firmhouse Portal to the product metadata. This can be replaced with a dynamic API call to fetch the product metadata from a 3rd party API or you can also use the product metadata on Firmhouse to configure this.

### Initializing the Cart

As HTTP does not allow setting cookies after streaming starts, we can only set the cookies in a server action or a route handler. This is done in [app/cart/create/route.ts](src/app/cart/create/route.ts) with a route handler. When the user visits the page for the first time, we redirect them to this route handler to initialize the cart. This route also saves the cart token in the cookies so that we can use it later to update the cart.

### Mutations with Server Actions

All the mutations are defined in [lib/cart.ts](src/lib/cart.ts). These run on the server and are used to update the cart state.

### Common Issues

- If you have configured the environment variables and added few products in the Firmhouse Portal, but still not able to see the products in the bundle builder, then make sure that you update the [lib/product-config.ts](src/lib/product-config.ts) file to include the SKUs of the products you have configured in the Firmhouse Portal.


## Learn More

To learn more about Firmhouse SDK, take a look at the following resources:

- [Firmhouse SDK Documentation](https://developer.firmhouse.com/sdks/firmhouse-sdk) - learn about Firmhouse SDK features and API.
- [Creating a Storefront App Guide](https://developer.firmhouse.com/guides/creating-a-storefront-app) - learn how to create a storefront app with Firmhouse SDK.

