import { Resend } from 'resend';
import { resumeData } from '@/lib/resume-data';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
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
