import nodemailer from "nodemailer";

/*
Sukūriau nauja gmail, kuris bus mažiau saugus,
bet galės siūsti žinutes.
mail.iearn.ziezmariai@gmail.com

mail.ziezmariai.2021 
*/

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, html: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  console.log(process.env.EMAIL_ADRESS);
  console.log(process.env.EMAIL_PASSWORD);
  let transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 587,
    secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADRESS, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"iEARN Žiežmariai" <${process.env.EMAIL_ADRESS}>`, // sender address
    to, // list of receivers
    subject: "Užmiršau slaptažodį!", // Subject line
    html, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
