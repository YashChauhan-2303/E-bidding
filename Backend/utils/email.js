const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = require('../config/config');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransporter({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Send email function
const sendEmail = async (options) => {
  try {
    const message = {
      from: `E-Bidding Platform <${EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to E-Bidding Platform',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining our e-bidding platform.</p>
      <p>Start exploring amazing auctions and happy bidding!</p>
    `
  }),
  
  auctionEnding: (auctionTitle, timeLeft) => ({
    subject: `Auction Ending Soon: ${auctionTitle}`,
    html: `
      <h2>Auction Ending Soon!</h2>
      <p>The auction for "${auctionTitle}" is ending in ${timeLeft}.</p>
      <p>Don't miss your chance to bid!</p>
    `
  }),
  
  bidNotification: (auctionTitle, bidAmount) => ({
    subject: `New Bid on ${auctionTitle}`,
    html: `
      <h2>Someone placed a new bid!</h2>
      <p>A new bid of $${bidAmount} was placed on "${auctionTitle}".</p>
      <p>Check the auction to place a higher bid!</p>
    `
  }),
  
  auctionWon: (auctionTitle, winningBid) => ({
    subject: `Congratulations! You won ${auctionTitle}`,
    html: `
      <h2>Congratulations!</h2>
      <p>You have won the auction for "${auctionTitle}" with a bid of $${winningBid}.</p>
      <p>Please proceed with the payment and shipping arrangements.</p>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
};