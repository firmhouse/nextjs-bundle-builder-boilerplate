import { redirect } from 'next/navigation';
import { initializeCart } from '@/lib/cart';

export async function GET(request: Request) {
  // Initialize subscription cart
  await initializeCart();
  redirect('/');
}
