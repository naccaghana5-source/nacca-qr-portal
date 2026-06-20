import { supabaseAdmin as supabase } from '@/lib/supabase';

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  console.log('🔍 Looking for book with stable_id:', id);
  
  // Method 1: Search by stable_id (exact match)
  const { data: byStableId, error: err1 } = await supabase
    .from('books')
    .select('*')
    .eq('stable_id', id)
    .maybeSingle();
  
  let book = byStableId;
  let error = err1;
  
  // Method 2: If not found, try searching by book_id
  if (!book) {
    console.log('📚 Not found by stable_id, trying book_id...');
    const { data: byBookId, error: err2 } = await supabase
      .from('books')
      .select('*')
      .eq('book_id', id)
      .maybeSingle();
    
    book = byBookId;
    error = err2;
  }
  
  console.log('📊 Result:', book ? 'Book found!' : 'No book found');
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600">⚠️ Book Not Found</h1>
          <p className="mt-2 text-gray-600">This QR code is not recognized in the NaCCA database.</p>
          <p className="mt-4 text-sm text-gray-400">ID: {id}</p>
          <div className="mt-4 text-xs text-gray-500 bg-gray-100 p-4 rounded-lg">
            <p>🔍 Debug: Check your terminal for details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-green-800">✓ NaCCA Approved</h1>
          <p className="text-gray-500 mt-1">This material is officially approved by NaCCA</p>
        </div>

        {book.cover_image && (
          <div className="mt-4 flex justify-center">
            <img 
              src={book.cover_image}  
              alt={book.title}  
              className="max-h-48 rounded-lg object-contain"
            />
          </div>
        )}

        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Book ID</p>
              <p className="font-medium text-gray-900">{book.book_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-medium text-gray-900">{book.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium text-gray-900">{book.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Publisher</p>
              <p className="font-medium text-gray-900">{book.publisher_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium text-gray-900">{book.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved Year</p>
              <p className="font-medium text-gray-900">{book.approved_year}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-green-700">
            <span className="font-semibold">✓ Verified</span> — This book meets NaCCA standards
          </p>
        </div>
      </div>
    </div>
  );
}