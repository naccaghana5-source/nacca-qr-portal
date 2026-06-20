import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Try to fetch one book
    const { data, error } = await supabase
      .from('books')
      .select('stable_id, title')
      .limit(1);
    
    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: 'Supabase query failed'
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      books: data,
      count: data?.length || 0
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    });
  }
}