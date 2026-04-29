import telegramService from '../services/telegramService.js';

const days = process.argv[2] ? parseInt(process.argv[2]) : 3;

console.log(`📊 Отправка статистики за ${days} дней...`);

telegramService.sendAnalyticsReport(days)
  .then((result) => {
    if (result.success) {
      console.log('✅ Статистика успешно отправлена в Telegram!');
      process.exit(0);
    } else {
      console.error('❌ Ошибка:', result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Ошибка отправки:', error);
    process.exit(1);
  });
