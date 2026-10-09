const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInquiryEmail = async ({ inquiryId, customerName, customerEmail, message }) => {
  const { error } = await resend.emails.send({
    from: 'Aristhos <onboarding@resend.dev>',
    to: process.env.INQUIRY_INBOX,
    replyTo: customerEmail,
    subject: `New custom project inquiry ${inquiryId}`,
    text: `Name: ${customerName}\nEmail: ${customerEmail}\n\n${message}`,
  });

  if (error) throw new Error(error.message);
};

module.exports = { sendInquiryEmail };