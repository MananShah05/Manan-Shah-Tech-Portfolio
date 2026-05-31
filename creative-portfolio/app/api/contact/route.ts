import { Resend } from 'resend';
import { resumeData } from '@/lib/resume-data';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Log submission to Supabase database
    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name,
            email,
            subject: 'Creative Portfolio Contact',
            message,
          }
        ]);
      if (dbError) {
        console.error('Database logging failed:', dbError);
      }
    } catch (dbErr) {
      console.error('Database logging exception:', dbErr);
    }
    
    // 2. Send email via Resend
    // Fallback if no API key is provided during dev
    if (!process.env.RESEND_API_KEY) {
      console.log('No RESEND_API_KEY provided. Simulated email send:');
      console.log(`From: ${name} (${email})\nMessage: ${message}`);
      return Response.json({ success: true, simulated: true });
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Resend default testing domain
      to: resumeData.personal.email,
      subject: `Portfolio Contact: ${name}`,
      html: `<p><b>${name}</b> (${email})</p><p>${message}</p>`,
    });
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
