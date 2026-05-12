import TelegramBot from 'node-telegram-bot-api';
import env from '../config/env.js';
import analyticsService from './analyticsService.js';

class TelegramService {
  constructor() {
    if (!env.telegramBotToken) {
      console.warn('⚠️  Telegram bot token not configured');
      this.bot = null;
      return;
    }

    this.bot = new TelegramBot(env.telegramBotToken, { polling: true });
    this.chatId = env.telegramChatId;
    
    this.setupCommands();
    console.log('🤖 Telegram bot started with interactive commands');
  }

  setupCommands() {
    if (!this.bot) return;

    // Команда /start
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const message = `👋 <b>Привет! Я бот Zeus GRC</b>\n\n` +
        `Я отправляю уведомления о новых заявках и статистику посещений сайта.\n\n` +
        `<b>Доступные команды:</b>\n` +
        `/statistics - Статистика за последние 3 дня\n` +
        `/stats7 - Статистика за 7 дней\n` +
        `/stats30 - Статистика за 30 дней\n` +
        `/help - Показать эту справку`;
      
      this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    });

    // Команда /help
    this.bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      const message = `ℹ️ <b>Справка по командам</b>\n\n` +
        `<b>📊 Дашборд:</b>\n` +
        `/dashboard - Главная панель управления\n` +
        `/statistics - Статистика за 3 дня\n` +
        `/stats7 - За 7 дней\n` +
        `/stats30 - За 30 дней\n\n` +
        `<b>🌍 Аналитика:</b>\n` +
        `/geo - География трафика\n` +
        `/pages - Популярные страницы\n` +
        `/devices - Устройства и браузеры\n` +
        `/live - Кто сейчас онлайн\n\n` +
        `<b>📋 Заявки:</b>\n` +
        `/requests - Последние заявки\n\n` +
        `<b>⚙️ Система:</b>\n` +
        `Автоматические отчеты каждые 3 дня в 10:00 (Алматы)\n` +
        `Уведомления о новых заявках`;
      
      this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    });

    // Команда /dashboard - главная панель с кнопками
    this.bot.onText(/\/dashboard/, async (msg) => {
      const chatId = msg.chat.id;
      
      const keyboard = {
        inline_keyboard: [
          [
            { text: '📊 Статистика 3д', callback_data: 'stats_3' },
            { text: '📊 Статистика 7д', callback_data: 'stats_7' }
          ],
          [
            { text: '📊 Статистика 30д', callback_data: 'stats_30' },
            { text: '🌍 География', callback_data: 'geo' }
          ],
          [
            { text: '📄 Страницы', callback_data: 'pages' },
            { text: '📱 Устройства', callback_data: 'devices' }
          ],
          [
            { text: '🔴 Live', callback_data: 'live' },
            { text: '📋 Заявки', callback_data: 'requests' }
          ]
        ]
      };

      const stats = analyticsService.getStats(7);
      const message = `📊 <b>Zeus GRC Analytics Dashboard</b>\n\n` +
        `📈 <b>Последние 7 дней:</b>\n` +
        `• Визитов: ${stats.totalVisits}\n` +
        `• Уникальных: ${stats.uniqueVisitors}\n\n` +
        `Выберите раздел:`;

      await this.bot.sendMessage(chatId, message, { 
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    });

    // Обработчик callback кнопок
    this.bot.on('callback_query', async (query) => {
      const chatId = query.message.chat.id;
      const data = query.data;

      try {
        await this.bot.answerCallbackQuery(query.id);

        switch(data) {
          case 'stats_3':
          case 'stats_7':
          case 'stats_30':
            const days = parseInt(data.split('_')[1]);
            const stats = analyticsService.getStats(days);
            const statsMsg = this.formatAnalyticsMessage(stats);
            await this.bot.sendMessage(chatId, statsMsg, { parse_mode: 'HTML' });
            break;

          case 'geo':
            await this.sendGeographyReport(chatId);
            break;

          case 'pages':
            await this.sendPagesReport(chatId);
            break;

          case 'devices':
            await this.sendDevicesReport(chatId);
            break;

          case 'live':
            await this.sendLiveReport(chatId);
            break;

          case 'requests':
            await this.sendRequestsReport(chatId);
            break;
        }
      } catch (error) {
        console.error('Error handling callback:', error);
        await this.bot.sendMessage(chatId, '❌ Ошибка при обработке запроса');
      }
    });

    // Команда /statistics (3 дня)
    this.bot.onText(/\/statistics/, async (msg) => {
      const chatId = msg.chat.id;
      await this.bot.sendMessage(chatId, '📊 Собираю статистику за последние 3 дня...');
      
      try {
        const stats = analyticsService.getStats(3);
        const message = this.formatAnalyticsMessage(stats);
        await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } catch (error) {
        await this.bot.sendMessage(chatId, '❌ Ошибка при получении статистики');
        console.error('Error getting stats:', error);
      }
    });

    // Команда /stats7 (7 дней)
    this.bot.onText(/\/stats7/, async (msg) => {
      const chatId = msg.chat.id;
      await this.bot.sendMessage(chatId, '📊 Собираю статистику за последние 7 дней...');
      
      try {
        const stats = analyticsService.getStats(7);
        const message = this.formatAnalyticsMessage(stats);
        await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } catch (error) {
        await this.bot.sendMessage(chatId, '❌ Ошибка при получении статистики');
        console.error('Error getting stats:', error);
      }
    });

    // Команда /stats30 (30 дней)
    this.bot.onText(/\/stats30/, async (msg) => {
      const chatId = msg.chat.id;
      await this.bot.sendMessage(chatId, '📊 Собираю статистику за последние 30 дней...');
      
      try {
        const stats = analyticsService.getStats(30);
        const message = this.formatAnalyticsMessage(stats);
        await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } catch (error) {
        await this.bot.sendMessage(chatId, '❌ Ошибка при получении статистики');
        console.error('Error getting stats:', error);
      }
    });
  }

  async sendAnalyticsReport(days = 3) {
    if (!this.bot || !this.chatId) {
      console.warn('⚠️  Telegram bot not configured, skipping report');
      return;
    }

    try {
      const stats = analyticsService.getStats(days);
      const message = this.formatAnalyticsMessage(stats);

      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
      console.log('✅ Analytics report sent to Telegram');
      return { success: true };
    } catch (error) {
      console.error('❌ Error sending Telegram message:', error.message);
      return { success: false, error: error.message };
    }
  }

  formatAnalyticsMessage(stats) {
    let message = `📊 <b>Статистика сайта Zeus GRC</b>\n`;
    message += `📅 Период: ${stats.period}\n\n`;

    message += `👥 <b>Посещения:</b>\n`;
    message += `• Всего визитов: ${stats.totalVisits}\n`;
    message += `• Уникальных посетителей: ${stats.uniqueVisitors}\n\n`;

    if (stats.byCountry.length > 0) {
      message += `🌍 <b>По странам:</b>\n`;
      stats.byCountry.forEach((item, index) => {
        const flag = this.getCountryFlag(item.country);
        message += `${index + 1}. ${flag} ${item.country || 'Unknown'}: ${item.count}\n`;
      });
      message += `\n`;
    }

    if (stats.byRegion.length > 0) {
      message += `📍 <b>По регионам (топ-5):</b>\n`;
      stats.byRegion.slice(0, 5).forEach((item, index) => {
        message += `${index + 1}. ${item.country}, ${item.region}: ${item.count}\n`;
      });
      message += `\n`;
    }

    if (stats.byCity.length > 0) {
      message += `🏙 <b>По городам (топ-5):</b>\n`;
      stats.byCity.slice(0, 5).forEach((item, index) => {
        message += `${index + 1}. ${item.city}, ${item.country}: ${item.count}\n`;
      });
      message += `\n`;
    }

    if (stats.byPage.length > 0) {
      message += `📄 <b>Популярные страницы:</b>\n`;
      stats.byPage.slice(0, 5).forEach((item, index) => {
        message += `${index + 1}. ${item.page_path}: ${item.count}\n`;
      });
      message += `\n`;
    }

    if (stats.byDay.length > 0) {
      message += `📈 <b>По дням:</b>\n`;
      stats.byDay.forEach(item => {
        message += `• ${item.date}: ${item.count} визитов\n`;
      });
    }

    return message;
  }

  getCountryFlag(countryCode) {
    if (!countryCode) return '🌐';
    
    const flags = {
      'RU': '🇷🇺',
      'KZ': '🇰🇿',
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'DE': '🇩🇪',
      'FR': '🇫🇷',
      'CN': '🇨🇳',
      'JP': '🇯🇵',
      'KR': '🇰🇷',
      'UZ': '🇺🇿',
      'KG': '🇰🇬',
      'TR': '🇹🇷',
      'UA': '🇺🇦',
      'BY': '🇧🇾',
      'AZ': '🇦🇿',
      'AM': '🇦🇲',
      'GE': '🇬🇪',
      'TJ': '🇹🇯',
      'TM': '🇹🇲'
    };

    return flags[countryCode] || '🌐';
  }

  async sendCustomMessage(message) {
    if (!this.bot || !this.chatId) {
      console.warn('⚠️  Telegram bot not configured');
      return { success: false, error: 'Bot not configured' };
    }

    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
      return { success: true };
    } catch (error) {
      console.error('❌ Error sending Telegram message:', error.message);
      return { success: false, error: error.message };
    }
  }

  async sendRequestNotification(request) {
    if (!this.bot || !this.chatId) {
      console.warn('⚠️  Telegram bot not configured');
      return { success: false, error: 'Bot not configured' };
    }

    try {
      const createdAt = new Date(request.created_at).toLocaleString('ru-RU', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Almaty',
      });

      let message = `🆕 <b>Новая заявка с сайта</b>\n\n`;
      message += `👤 <b>Имя:</b> ${request.name}\n`;
      message += `🏢 <b>Компания:</b> ${request.company}\n`;
      message += `📧 <b>Email:</b> ${request.email}\n`;
      message += `📱 <b>Телефон:</b> ${request.phone || '-'}\n`;
      message += `💼 <b>Должность:</b> ${request.role || '-'}\n`;
      message += `💬 <b>Сообщение:</b> ${request.message || '-'}\n\n`;
      message += `🆔 <b>ID заявки:</b> ${request.id}\n`;
      message += `📅 <b>Создано:</b> ${createdAt}`;

      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
      console.log('✅ Request notification sent to Telegram');
      return { success: true };
    } catch (error) {
      console.error('❌ Error sending request notification:', error.message);
      return { success: false, error: error.message };
    }
  }

  // География трафика
  async sendGeographyReport(chatId) {
    const stats = analyticsService.getStats(7);
    
    let message = `🌍 <b>География трафика</b>\n`;
    message += `📅 Последние 7 дней\n\n`;

    if (stats.byCountry.length > 0) {
      message += `<b>По странам:</b>\n`;
      stats.byCountry.forEach((item, index) => {
        const flag = this.getCountryFlag(item.country);
        const percent = ((item.count / stats.totalVisits) * 100).toFixed(1);
        message += `${index + 1}. ${flag} ${item.country || 'Unknown'}: ${item.count} (${percent}%)\n`;
      });
      message += `\n`;
    }

    if (stats.byCity.length > 0) {
      message += `<b>Топ-10 городов:</b>\n`;
      stats.byCity.slice(0, 10).forEach((item, index) => {
        message += `${index + 1}. ${item.city}, ${item.country}: ${item.count}\n`;
      });
    }

    await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }

  // Популярные страницы
  async sendPagesReport(chatId) {
    const stats = analyticsService.getStats(7);
    
    let message = `📄 <b>Популярные страницы</b>\n`;
    message += `📅 Последние 7 дней\n\n`;

    if (stats.byPage.length > 0) {
      stats.byPage.forEach((item, index) => {
        const percent = ((item.count / stats.totalVisits) * 100).toFixed(1);
        message += `${index + 1}. <code>${item.page_path}</code>\n`;
        message += `   └ ${item.count} визитов (${percent}%)\n\n`;
      });
    } else {
      message += `Нет данных`;
    }

    await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }

  // Устройства и браузеры
  async sendDevicesReport(chatId) {
    const devices = analyticsService.getDeviceStats(7);
    
    let message = `📱 <b>Устройства и браузеры</b>\n`;
    message += `📅 Последние 7 дней\n\n`;

    if (devices.browsers.length > 0) {
      message += `<b>Браузеры:</b>\n`;
      devices.browsers.forEach((item, index) => {
        const icon = this.getBrowserIcon(item.browser);
        message += `${icon} ${item.browser}: ${item.count}\n`;
      });
      message += `\n`;
    }

    if (devices.os.length > 0) {
      message += `<b>Операционные системы:</b>\n`;
      devices.os.forEach((item, index) => {
        const icon = this.getOSIcon(item.os);
        message += `${icon} ${item.os}: ${item.count}\n`;
      });
    }

    await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }

  // Live - кто сейчас на сайте
  async sendLiveReport(chatId) {
    const live = analyticsService.getLiveVisitors();
    
    let message = `🔴 <b>Live посетители</b>\n`;
    message += `⏱ Последние 5 минут\n\n`;

    if (live.count > 0) {
      message += `👥 <b>Активных посетителей:</b> ${live.count}\n\n`;
      
      if (live.visitors.length > 0) {
        message += `<b>Последние действия:</b>\n`;
        live.visitors.forEach((visitor, index) => {
          const flag = this.getCountryFlag(visitor.country);
          const time = new Date(visitor.visited_at).toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'Asia/Almaty'
          });
          message += `${flag} ${visitor.city || 'Unknown'} • ${time}\n`;
          message += `   └ <code>${visitor.page_path}</code>\n\n`;
        });
      }
    } else {
      message += `Нет активных посетителей`;
    }

    await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }

  // Последние заявки
  async sendRequestsReport(chatId) {
    const requests = analyticsService.getRecentRequests(5);
    
    let message = `📋 <b>Последние заявки</b>\n\n`;

    if (requests.length > 0) {
      requests.forEach((req, index) => {
        const date = new Date(req.created_at).toLocaleString('ru-RU', {
          dateStyle: 'short',
          timeStyle: 'short',
          timeZone: 'Asia/Almaty'
        });
        
        message += `${index + 1}. <b>${req.name}</b> • ${req.company}\n`;
        message += `   📧 ${req.email}\n`;
        message += `   📅 ${date}\n`;
        message += `   🏷 Статус: ${req.status}\n\n`;
      });
    } else {
      message += `Нет заявок`;
    }

    await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }

  getBrowserIcon(browser) {
    const icons = {
      'Chrome': '🌐',
      'Firefox': '🦊',
      'Safari': '🧭',
      'Edge': '🔷',
      'Opera': '🎭'
    };
    return icons[browser] || '🌐';
  }

  getOSIcon(os) {
    const icons = {
      'Windows': '🪟',
      'macOS': '🍎',
      'Linux': '🐧',
      'Android': '🤖',
      'iOS': '📱'
    };
    return icons[os] || '💻';
  }
}

export default new TelegramService();
