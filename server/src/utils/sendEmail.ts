import nodemailer from "nodemailer";

/*
Sukūriau nauja gmail, kuris bus mažiau saugus,
bet galės siūsti žinutes.
*/

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, html: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  console.log(process.env.EMAIL_ADRESS);
  console.log(process.env.EMAIL_PASSWORD);

  console.log({
    user: process.env.EMAIL_ADRESS,
    pass: process.env.EMAIL_PASSWORD,
  });

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
  console.log("Created transport");

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: `"iEARN Žiežmariai" <${process.env.EMAIL_ADRESS}>`, // sender address
      to, // list of receivers
      subject: "Pasikeisk iEARN Admin slaptažodį!", // Subject line
      html, // plain text body
    })
    .catch(console.log);

  if (info) {
    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
};
