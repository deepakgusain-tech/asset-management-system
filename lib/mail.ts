import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7e96b9a3755d2e",
    pass: "09cb419003a174"
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
