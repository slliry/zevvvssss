import db from '../db/index.js';
import geoip from 'geoip-lite';

class AnalyticsService {
  trackVisit(data) {
    const {
      ip,
      pagePath,
      referrer = null,
      userAgent = null,
      language = null,
      screenWidth = null,
      screenHeight = null,
      sessionId = null
    } = data;

    // Определяем геолокацию по IP
    const geo = geoip.lookup(ip);
    const country = geo?.country || null;
    const region = geo?.region || null;
    const city = geo?.city || null;

    const stmt = db.prepare(`
      INSERT INTO analytics (
        ip, country, region, city, page_path, referrer, 
        user_agent, language, screen_width, screen_height, 
        visited_at, session_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const visitedAt = new Date().toISOString();

    stmt.run(
      ip,
      country,
      region,
      city,
      pagePath,
      referrer,
      userAgent,
      language,
      screenWidth,
      screenHeight,
      visitedAt,
      sessionId
    );

    return { success: true, geo: { country, region, city } };
  }

  getStats(days = 3) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString();

    // Общая статистика
    const totalVisits = db.prepare(`
      SELECT COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ?
    `).get(startDateStr).count;

    const uniqueVisitors = db.prepare(`
      SELECT COUNT(DISTINCT session_id) as count 
      FROM analytics 
      WHERE visited_at >= ? AND session_id IS NOT NULL
    `).get(startDateStr).count;

    // По странам
    const byCountry = db.prepare(`
      SELECT country, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ? AND country IS NOT NULL
      GROUP BY country 
      ORDER BY count DESC 
      LIMIT 10
    `).all(startDateStr);

    // По регионам
    const byRegion = db.prepare(`
      SELECT country, region, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ? AND region IS NOT NULL
      GROUP BY country, region 
      ORDER BY count DESC 
      LIMIT 10
    `).all(startDateStr);

    // По городам
    const byCity = db.prepare(`
      SELECT country, city, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ? AND city IS NOT NULL
      GROUP BY country, city 
      ORDER BY count DESC 
      LIMIT 10
    `).all(startDateStr);

    // По страницам
    const byPage = db.prepare(`
      SELECT page_path, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ?
      GROUP BY page_path 
      ORDER BY count DESC 
      LIMIT 10
    `).all(startDateStr);

    // По дням
    const byDay = db.prepare(`
      SELECT DATE(visited_at) as date, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ?
      GROUP BY DATE(visited_at) 
      ORDER BY date ASC
    `).all(startDateStr);

    return {
      period: `${days} days`,
      totalVisits,
      uniqueVisitors,
      byCountry,
      byRegion,
      byCity,
      byPage,
      byDay
    };
  }

  getRecentVisits(limit = 20) {
    return db.prepare(`
      SELECT * FROM analytics 
      ORDER BY visited_at DESC 
      LIMIT ?
    `).all(limit);
  }
}

export default new AnalyticsService();
