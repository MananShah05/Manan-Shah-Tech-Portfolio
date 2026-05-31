import { Resend } from 'resend';
import { resumeData } from '@/lib/resume-data';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Log submission to Supabase database
    let dbSuccess = false;
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
      } else {
        dbSuccess = true;
      }
    } catch (dbErr) {
      console.error('Database logging exception:', dbErr);
    }
    
    // 2. Send email via Resend
    let emailSuccess = false;
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_123') {
      try {
        await resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>', // Resend default testing domain
          to: resumeData.personal.email,
          subject: `Portfolio Contact: ${name}`,
          html: `<p><b>${name}</b> (${email})</p><p>${message}</p>`,
        });
        emailSuccess = true;
      } catch (emailErr) {
        console.error('Resend email dispatch failed:', emailErr);
      }
    } else {
      console.log('No valid RESEND_API_KEY provided. Simulated email send:');
      console.log(`From: ${name} (${email})\nMessage: ${message}`);
      emailSuccess = true; // Simulated success
    }

    // Return success if at least database or email send succeeded
    if (dbSuccess || emailSuccess) {
      return Response.json({ 
        success: true, 
        dbLogged: dbSuccess, 
        emailSent: emailSuccess 
      });
    }

    return Response.json({ success: false, error: 'Failed to record contact submission' }, { status: 500 });
  } catch (error) {
    console.error('Email send failed:', error);
    return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
