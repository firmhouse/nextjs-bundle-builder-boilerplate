'use server';
import 'server-only';
import { cookies } from 'next/headers';
import { firmhouseClient } from './firmhouse-client';
import { revalidatePath } from 'next/cache';
import { FirmhouseCart, SubscriptionStatus } from '@firmhouse/firmhouse-sdk';
import { redirect } from 'next/navigation';
import test from 'node:test';

const CART_TOKEN_COOKIE = 'firmhouse:cart';

export async function isInitialized(): Promise<boolean> {
  return cookies().get(CART_TOKEN_COOKIE) !== undefined;
}

export async function getCartToken(): Promise<string> {
  const token = cookies().get(CART_TOKEN_COOKIE)?.value;
  if(!token) {
    throw new Error("Token is not initialized")
  }
  return token
}

export async function clearCartToken(): Promise<void> {
  cookies().delete(CART_TOKEN_COOKIE);
}

export async function getCartOrCreate() : Promise<FirmhouseCart> {
  try {
    const cartToken = await getCartToken()
    const cart = await firmhouseClient.carts.get(cartToken)
    if(cart.status !== SubscriptionStatus.Draft) {
      throw new Error('Cart is already checked out')
    }
    return cart
  } catch(e) {
    // If the cart does not exists or already checked out we can redirect to create the cart
  }
  redirect('/cart/create')
}

export async function initializeCart() {
  try {
    const cartToken = await getCartToken()
    const cart = await firmhouseClient.carts.getOrCreate(cartToken);
    cookies().set(CART_TOKEN_COOKIE, cart.token);
    return
  } catch(e) {
    cookies().set(CART_TOKEN_COOKIE, (await firmhouseClient.carts.create()).token)
  }
}

export async function addToCart(productId: string, quantity = 1, pathToRevalidate = '/') {
  if (!(await isInitialized())) {
    await initializeCart();
  }
  const cartToken = await getCartToken();
  await firmhouseClient.carts.addProduct(cartToken, {
    productId,
    quantity,
  });
  revalidatePath(pathToRevalidate);
}

export async function removeFromCart(id: string) {
  await firmhouseClient.carts.removeProduct(await getCartToken(), id);
  revalidatePath('/');
}

export async function updateQuantity(id: string, quantity: number) {

  await firmhouseClient.carts.updateOrderedProductQuantity(
    await getCartToken(),
    id,
    quantity
  );
  revalidatePath('/');
}

export async function updatePlan(planSlug: string) {
  await firmhouseClient.carts.updatePlan(
    await getCartToken(),
    planSlug
  );
  revalidatePath('/');
}
