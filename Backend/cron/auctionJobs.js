const cron = require('node-cron');

// End expired auctions every minute
const endExpiredAuctions = cron.schedule('* * * * *', () => {
  console.log('Checking for expired auctions...');
  // TODO: Add logic to end expired auctions
}, {
  scheduled: false
});

// Send auction reminder emails every hour
const sendAuctionReminders = cron.schedule('0 * * * *', () => {
  console.log('Sending auction reminder emails...');
  // TODO: Add logic to send reminder emails
}, {
  scheduled: false
});

module.exports = {
  endExpiredAuctions,
  sendAuctionReminders
};