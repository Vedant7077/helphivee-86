
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, subject, message } = formData;

    console.log("Received contact form submission:", { name, email, subject });

    // Send notification email to site owner
    const emailToOwner = await resend.emails.send({
      from: "Charity Website <onboarding@resend.dev>",
      to: ["vedantpalekar21@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to the person who submitted the form
    const emailToSender = await resend.emails.send({
      from: "Charity Website <onboarding@resend.dev>",
      to: [email],
      subject: "We've received your message",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We've received your message regarding "${subject}" and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message for your records:</p>
        <p><em>${message.replace(/\n/g, '<br>')}</em></p>
        <p>Best regards,<br>The Charity Team</p>
      `,
    });

    console.log("Emails sent successfully:", { 
      ownerEmailId: emailToOwner.id,
      senderEmailId: emailToSender.id 
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Contact form submitted successfully" 
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
