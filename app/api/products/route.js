import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'Pet_Care'; // Exactly as you specified

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = {};
    if (category) query.category = category;
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
    const { title, price, category, image, createdBy } = body;

    if (!title || !price || !category || !createdBy) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const productData = {
      ...body,
      price: Number(parseFloat(price).toFixed(2)),
      createdAt: new Date(),
    };
    
    const result = await db.collection('products').insertOne(productData);
    return NextResponse.json({ success: true, productId: result.insertedId }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}