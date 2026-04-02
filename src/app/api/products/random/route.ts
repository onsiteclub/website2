import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    // Fetch all active products from Supabase REST API (PostgREST)
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/app_shop_products?is_active=eq.true&select=name,slug,base_price,primary_image,images,sku`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error(`Supabase ${res.status}`);

    const products = await res.json();

    // Filter out products without images
    const withImages = products.filter(
      (p: { primary_image?: string; images?: string[] }) =>
        p.primary_image || (p.images && p.images.length > 0),
    );

    // Shuffle and pick 3
    const shuffled = withImages.sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, 3).map(
      (p: {
        name: string;
        slug: string;
        base_price: number;
        primary_image?: string;
        images?: string[];
        sku?: string;
      }) => ({
        name: p.name,
        slug: p.slug,
        price: p.base_price,
        image: p.primary_image || p.images?.[0] || '',
        sku: p.sku || '',
      }),
    );

    return NextResponse.json({ products: picked });
  } catch {
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
