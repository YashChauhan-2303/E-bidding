const { endExpiredAuctions, sendAuctionReminders } = require('./auctionJobs');

const initCronJobs = () => {
  console.log('Starting cron jobs...');
  
  // Start all cron jobs
  endExpiredAuctions.start();
  sendAuctionReminders.start();
  
  console.log('Cron jobs started successfully');
};

module.exports = { initCronJobs };