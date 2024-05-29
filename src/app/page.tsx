import { getCartOrCreate } from "@/lib/cart";
import Link from "next/link";

export const runtime = "edge";

export default async function Index({}) {
  await getCartOrCreate();
  return (
    <div className="flex h-screen pt-12">
      <aside className="hidden md:block w-1/4 h-full bg-[url('/step-0.jpg')] bg-cover">
      </aside>
      <main className="md:w-3/4 w-full h-full bg-[url('/step-0.jpg')] md:bg-none flex flex-col justify-end md:justify-center px-10 py-7 text-white md:text-black">
        <h1 className="text-4xl font-light">Welkom!</h1>
        <p className="text-sm">Je abonnement moet minstens een Hue Bridge, één lamp en één accessoire bevatten.</p>
        <Link className="px-6 py-4 my-6 text-center bg-attentionBlue text-white font-bold rounded-full md:w-min" href="/bundle/lampen">Starten</Link>
      </main>
    </div>
  );
}
