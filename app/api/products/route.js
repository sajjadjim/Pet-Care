import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Fetch products
export async function GET(request) {
  try {
    console.log('=== GET /api/products ===');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    const client = await clientPromise;
    console.log('MongoDB client connected');
    
    const db = client.db('winter-dog-care-01'); // ← CHANGE TO YOUR DB NAME
    console.log('Database:', db.databaseName);
    
    // Get user ID from query params (optional)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    console.log('User ID:', userId);

    let products;
    
    if (userId) {
      // Fetch products only for this user
      console.log('Fetching products for user:', userId);
      products = await db
        .collection('products')
        .find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      // Fetch all products
      console.log('Fetching all products');
      products = await db
        .collection('products')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    }

    console.log('Products found:', products.length);

    // Get section info
    const section = await db.collection('sections')
      .findOne({ name: 'popular-products' });

    return NextResponse.json({ 
      success: true,
      products,
      section: section || { title: 'Popular Products', subtitle: 'Best sellers this winter season' }
    }, { status: 200 });

  } catch (error) {
    console.error('=== ERROR in GET /api/products ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request) {
  try {
    console.log('=== POST /api/products ===');
    
    const body = await request.json();
    console.log('Request body:', body);

    // Validate required fields
    if (!body.createdBy) {
      console.log('Error: User ID required');
      return NextResponse.json({ 
        success: false,
        error: 'User ID required' 
      }, { status: 401 });
    }

    if (!body.title || !body.price || !body.category) {
      console.log('Error: Missing required fields');
      return NextResponse.json({ 
        success: false,
        error: 'Missing required fields (title, price, category)' 
      }, { status: 400 });
    }

    const client = await clientPromise;
    console.log('MongoDB client connected');
    
    const db = client.db('winter-dog-care-01'); // ← CHANGE TO YOUR DB NAME
    console.log('Database:', db.databaseName);
    
    // Prepare product data
    const productData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Inserting product:', productData);
    const result = await db.collection('products').insertOne(productData);
    console.log('Insert result:', result);

    return NextResponse.json({ 
      success: true,
      message: 'Product created successfully',
      productId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error('=== ERROR in POST /api/products ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}