import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch single product
export async function GET(request, { params }) {
  try {
    const { id } =await params;
    console.log("API Fetching ID:", id);

    // Validate ObjectId
        if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid product ID' 
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('winter-dog-care-01'); // Replace with your DB name
    
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      product 
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch product' 
    }, { status: 500 });
  }
} // ← GET FUNCTION CLOSED HERE

// DELETE - Delete a product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid product ID' 
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('winter-dog-care-01'); // Replace with your DB name
    
    const result = await db
      .collection('products')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to delete product' 
    }, { status: 500 });
  }
} // ← DELETE FUNCTION CLOSED HERE

// PUT - Update a product
export async function PUT(request, { params }) {
  try {
    const { id } =await params;
    const body = await request.json();

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid product ID' 
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('winter-dog-care-01'); // Replace with your DB name
    
    // Remove _id from body if present
    const { _id, ...updateData } = body;
    
    const result = await db
      .collection('products')
      .updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Product updated successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update product' 
    }, { status: 500 });
  }
} 