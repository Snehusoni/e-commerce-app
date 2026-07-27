import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrderStatus } from '@/lib/db';

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders, count: orders.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderStatus } = body;

    if (!orderId || !orderStatus) {
      return NextResponse.json({ success: false, error: 'orderId and orderStatus are required' }, { status: 400 });
    }

    const updated = await updateOrderStatus(orderId, orderStatus);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
