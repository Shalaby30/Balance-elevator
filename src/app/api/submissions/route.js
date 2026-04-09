import fs from 'fs';
import path from 'path';

// Store submissions in a JSON file
const submissionsDir = path.join(process.cwd(), 'data');
const submissionsFile = path.join(submissionsDir, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true });
}

// Get all submissions
export async function GET() {
  try {
    if (!fs.existsSync(submissionsFile)) {
      return Response.json({ submissions: [] });
    }
    
    const data = fs.readFileSync(submissionsFile, 'utf-8');
    const submissions = JSON.parse(data);
    
    return Response.json({ 
      success: true, 
      submissions,
      count: submissions.length 
    });
  } catch (error) {
    console.error('Error reading submissions:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Create new submission
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return Response.json(
        { success: false, error: 'اسم وبريد وجوال مطلوبة' },
        { status: 400 }
      );
    }

    const submission = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || '',
      type: body.type || 'contact',
      createdAt: new Date().toISOString(),
    };

    // Read existing submissions
    let submissions = [];
    if (fs.existsSync(submissionsFile)) {
      const data = fs.readFileSync(submissionsFile, 'utf-8');
      submissions = JSON.parse(data);
    }

    // Add new submission
    submissions.push(submission);

    // Write back to file
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

    // Here you could integrate with email service
    console.log('New submission received:', submission);

    return Response.json({ 
      success: true, 
      message: 'تم استقبال طلبك بنجاح. سيتواصل معك فريقنا قريباً',
      submission 
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
