const cron = require('node-cron');
const Blood = require('../models/Blood');

const archiveOldData = () => {
  cron.schedule('0 0 * * *', async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    try {
      await Blood.deleteMany({ date: { $lt: oneYearAgo } });
      console.log('Old blood donation/request data archived successfully');
    } catch (error) {
      console.error('Error archiving old data:', error.message);
    }
  });
};

module.exports = { archiveOldData };
