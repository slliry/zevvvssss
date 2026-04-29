import cron from 'node-cron';
import telegramService from '../services/telegramService.js';

// Запускать каждые 3 дня в 10:00 утра
// Cron формат: минута час день месяц день_недели
// */3 означает каждые 3 дня
cron.schedule('0 10 */3 * *', async () => {
  console.log('🕐 Running scheduled analytics report...');
  
  try {
    await telegramService.sendAnalyticsReport(3);
    console.log('✅ Scheduled analytics report sent successfully');
  } catch (error) {
    console.error('❌ Error sending scheduled analytics report:', error);
  }
}, {
  timezone: 'Asia/Almaty'
});

console.log('📅 Analytics cron job scheduled: Every 3 days at 10:00 AM (Asia/Almaty)');
