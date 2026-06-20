import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase connection...');
console.log('URL:', supabaseUrl ? '✅ Found' : '❌ Missing');
console.log('Key:', supabaseKey ? '✅ Found' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const stableId = 'NaCCA_Approved_BK0001';

console.log('Looking for stable_id:', stableId);

// Method 1: Direct query
const { data, error } = await supabase
  .from('books')
  .select('*')
  .eq('stable_id', stableId);

console.log('📊 Method 1 result:', data);
console.log('❌ Error:', error);

// Method 2: Show all books
const { data: allBooks } = await supabase
  .from('books')
  .select('stable_id, title');
  
console.log('📚 All books:', allBooks);