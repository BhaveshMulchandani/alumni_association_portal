const cron = require('node-cron');
const Session = require('../models/sessionmodel');

cron.schedule('*/5 * * * *', async () => {
    try {
        const now = new Date();

        const result = await Session.updateMany(
            {
                status: 'active',
                endTime: { $ne: null, $lt: now }
            },
            {
                status: 'expired'
            }
        );

        console.log(`Expired sessions updated: ${result.modifiedCount}`);

    } catch (error) {
        console.error("Cron error:", error.message);
    }
});