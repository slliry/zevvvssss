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
        `<b>Статистика:</b>\n` +
        `/statistics - За последние 3 дня\n` +
        `/stats7 - За последние 7 дней\n` +
        `/stats30 - За последние 30 дней\n\n` +
        `<b>Автоматические отчеты:</b>\n` +
        `Бот автоматически отправляет статистику каждые 3 дня в 10:00 (Алматы)\n\n` +
        `<b>Уведомления:</b>\n` +
        `Бот отправляет уведомления о каждой новой заявке с сайта`;
      
      this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
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
}

export default new TelegramService();
