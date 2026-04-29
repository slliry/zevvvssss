import express from 'express';
import analyticsService from '../services/analyticsService.js';
import telegramService from '../services/telegramService.js';

const router = express.Router();

// Трекинг посещения
router.post('/track', (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const data = {
      ip: ip.replace('::ffff:', ''), // Убираем IPv6 префикс
      pagePath: req.body.pagePath,
      referrer: req.body.referrer,
      userAgent: req.headers['user-agent'],
      language: req.body.language,
      screenWidth: req.body.screenWidth,
      screenHeight: req.body.screenHeight,
      sessionId: req.body.sessionId
    };

    const result = analyticsService.trackVisit(data);
    res.json(result);
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Получить статистику
router.get('/stats', (req, res) => {
  try {
    const days = parseInt(req.query.days) || 3;
    const stats = analyticsService.getStats(days);
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Получить последние посещения
router.get('/recent', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const visits = analyticsService.getRecentVisits(limit);
    res.json(visits);
  } catch (error) {
    console.error('Error getting recent visits:', error);
    res.status(500).json({ error: 'Failed to get recent visits' });
  }
});

// Отправить отчет в Telegram (ручной триггер)
router.post('/send-report', async (req, res) => {
  try {
    const days = parseInt(req.body.days) || 3;
    const result = await telegramService.sendAnalyticsReport(days);
    res.json(result);
  } catch (error) {
    console.error('Error sending report:', error);
    res.status(500).json({ error: 'Failed to send report' });
  }
});

export default router;
