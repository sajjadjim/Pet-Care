import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'Pet_Care';
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build Dynamic Query
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    const products = await db
      .collection('products')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      products 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const newProduct = {
      ...body,
      price: Number(`parseFloat(${body.price}).toFixed(2)`),
      createdAt: new Date(),
    };
    
    const result = await db.collection('products').insertOne(newProduct);
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}