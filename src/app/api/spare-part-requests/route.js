import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qlnekecubhblxpzlynab.supabase.co';
const SUPABASE_KEY = 'sb_publishable_knJxUIQ1kPMutanPNjtnSA_eobmdbs8';

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

// Get all spare part requests
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: requests, error } = await supabase
      .from('spare_part_requests')
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

// Create new spare part request
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.parts || body.parts.length === 0) {
      return Response.json(
        { success: false, error: 'الاسم والجوال والقطع المطلوبة مطلوبة' },
        { status: 400 }
      );
    }

    const sparePartRequest = {
      name: body.name,
      phone: body.phone,
      location: body.location || null,
      parts: body.parts,
      notes: body.notes || null
    };

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('spare_part_requests')
      .insert([sparePartRequest])
      .select();

    if (error) throw error;

    console.log('New spare part request received:', data);

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

// Update request status
export async function PATCH(request) {
  try {
    const body = await request.json();
    
    if (!body.id || !body.status) {
      return Response.json(
        { success: false, error: 'معرف الطلب والحالة مطلوبة' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('spare_part_requests')
      .update({ status: body.status, updated_at: new Date().toISOString() })
      .eq('id', body.id)
      .select();

    if (error) throw error;

    return Response.json({ 
      success: true, 
      message: 'تم تحديث الحالة بنجاح',
      request: data?.[0]
    });
  } catch (error) {
    console.error('Error updating request:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete request
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { success: false, error: 'معرف الطلب مطلوب' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('spare_part_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return Response.json({ 
      success: true, 
      message: 'تم حذف الطلب بنجاح'
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
