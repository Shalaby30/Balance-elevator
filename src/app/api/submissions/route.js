import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

// Get all service requests (requires auth)
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: requests, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return Response.json({ 
      success: true, 
      requests: requests || [],
      count: requests?.length || 0
    });
  } catch (error) {
    console.error('Error reading requests:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Create new service request (public - no auth required)
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.service_type) {
      return Response.json(
        { success: false, error: 'الاسم والجوال ونوع الخدمة مطلوبة' },
        { status: 400 }
      );
    }

    const serviceRequest = {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      service_type: body.service_type,
      location: body.location || null,
      message: body.message || null,
    };

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('service_requests')
      .insert([serviceRequest])
      .select();

    if (error) throw error;

    console.log('New service request received:', data);

    return Response.json({ 
      success: true, 
      message: 'تم استقبال طلبك بنجاح. سيتواصل معك فريقنا قريباً',
      request: data?.[0]
    });
  } catch (error) {
    console.error('Error creating request:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
