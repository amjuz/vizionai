import { Resend } from "resend";

const ORGANIZATION_EMAIL = process.env.ORGANIZATION_EMAIL!;

export async function sendEmail({
  emailTemplate,
  to,
  subject
}: {
  to: string[];
  emailTemplate: React.ReactNode;
  subject: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: `Vizion AI <${ORGANIZATION_EMAIL}>`,
    to,
    subject,
    react: emailTemplate,
  });

  if (error || !data) {
    console.log("Email service failed");
  } else if (data) {
    console.log("Email service complete!");
  }
}
