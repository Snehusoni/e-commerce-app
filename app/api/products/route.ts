import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    const products = await getProducts({ category, search, sort, maxPrice });
    return NextResponse.json({ success: true, products, count: products.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, error: 'Product name and price are required' }, { status: 400 });
    }

    const newProduct = await createProduct(body);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
