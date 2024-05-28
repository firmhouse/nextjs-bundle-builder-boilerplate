import { getCartOrCreate, removeFromCart, updateQuantity } from "@/lib/cart";
import Image from "next/image";
import { findActiveStep } from "@/lib/steps-config";
import Link from "next/link";
import { formatPriceWithCurrency } from "@/lib/utils";
import Cart from "@/components/Cart";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export default async function Index({ params }: { params: { step: string } }) {
  const cart = await getCartOrCreate();
  const { nextStep } = findActiveStep(params.step);
  const monthlyChargeStartDate = dayjs().add(3, "month").format("MMMM DD, YYYY");
  return (
    <div className="relative flex md:flex-row flex-col w-full items-center justify-center md:shadow-top">
      {(!!nextStep && (cart.orderedProducts ?? []).length > 0) && (
        <div className="md:absolute right-0 md:bottom-[165px] md:mx-8 w-full md:w-[400px]">
          <details className="[&_summary_img]:open:rotate-180 [&_img]:transition-transform [&_summary]:open:shadow-left [&_#backdrop]:open:block">
            <ul className="h-max bg-white relative z-50 px-6 max-h-[50vh] overflow-y-auto">
              <Cart cart={cart} />
            </ul>
            <summary className="flex justify-center items-center w-full md:w-[400px] h-12 bg-midnightBlue font-bold relative z-50 rounded-t">
              <div id="backdrop" className="bg-black fixed h-screen top-0 left-0 md:left-1/4 w-screen hidden z-20 opacity-40"></div>
              <span className="text-white relative z-50">Bekjik order</span>
              <Image
                className="relative z-50"
                src="/chevron-up.svg"
                height={32}
                width={32}
                alt="Bekjik order"
              />
            </summary>
          </details>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between w-full md:h-[165px] px-4 py-7 md:py-0 md:px-10 items-center bg-gray-300 md:bg-gray-100 md:shadow-top relative z-50">
        <div className="flex w-full md:w-max justify-between md:justify-normal items-center md:h-full">
          <div className="flex flex-col md:pr-20 h-full justify-center">
            <span className="font-bold text-sm md:text-base">Betaal nu</span>
            <span className="text-xs md:text-sm">Totaal (eerste 3 maanden)</span>
            <span className="text-xl md:text-3xl font-bold my-3">
              {formatPriceWithCurrency(
                (cart.amountForStartingSubscriptionCents ?? 0),
                cart.currency,
                cart.locale
              )}
            </span>
          </div>
          <div className="flex flex-col h-full justify-center">
            <span className="font-bold text-sm md:text-base">Maandelijkse kosten</span>
            <span className="text-xs md:text-sm">Begint {monthlyChargeStartDate}</span>
            <span className="text-xl md:text-3xl font-bold my-3">
              {formatPriceWithCurrency(
                cart.monthlyAmountCents ?? 0,
                cart.currency,
                cart.locale
              )} / maand
            </span>
          </div>
        </div>
        <Link
          className="px-6 py-3 my-6 bg-attentionBlue text-white font-bold rounded-full w-full text-center md:w-max ml-auto"
          href={nextStep ? `/bundle/${nextStep.slug}` : cart.checkoutUrl ?? ""}
        >
          {nextStep ? "Volgende stap" : "Akkoord & betaal"}
        </Link>
      </div>
    </div>
  );
}
