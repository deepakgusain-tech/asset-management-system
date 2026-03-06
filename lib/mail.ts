import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e0635acc4f418b",
    pass: "7327a51f568ffc"
  }
});

export async function sendMail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    return transport.sendMail({
        from: `Asset Management <deepak@gmail.com>`,
        to,
        subject,
        html,
    });
}
