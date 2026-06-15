import db from '../db/index.js';
import geoip from 'geoip-lite';

// Паттерны User-Agent ботов/сканеров (lowercase)
const BOT_UA_PATTERNS = [
  'bot', 'crawler', 'spider', 'scraper', 'scanner',
  'curl', 'wget', 'python-requests', 'python-urllib',
  'go-http-client', 'java/', 'ruby', 'perl/',
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'petalbot',
  'dataforseobot', 'yandexbot', 'baiduspider', 'bingbot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'zgrab', 'masscan', 'nmap', 'nuclei', 'sqlmap',
  'nikto', 'dirbuster', 'gobuster', 'wfuzz', 'ffuf',
  'httpx', 'shodan', 'censys', 'zmap',
];

// Пути которые явно мусорные (сканеры ищут уязвимости)
const SPAM_PATH_PATTERNS = [
  '/home/index', '/wp-', '/wordpress', '/wp-admin', '/wp-login',
  '/.env', '/.git', '/phpinfo', '/phpmyadmin', '/adminer',
  '/config', '/setup', '/install', '/shell', '/cmd',
  '/actuator', '/solr', '/jmx', '/.well-known/acme',
  '/cgi-bin', '/login.php', '/admin.php', '/manager/',
  '/xmlrpc', '/eval-stdin', '/vendor/', '/composer',
];

class AnalyticsService {
  isBot(userAgent) {
    if (!userAgent) return true;
    const ua = userAgent.toLowerCase();
    return BOT_UA_PATTERNS.some(pattern => ua.includes(pattern));
  }

  isSpamPath(pagePath) {
    if (!pagePath) return true;
    const path = pagePath.toLowerCase();
    return SPAM_PATH_PATTERNS.some(pattern => path.includes(pattern));
  }

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

    // Фильтруем ботов и сканеры
    if (this.isBot(userAgent) || this.isSpamPath(pagePath)) {
      return { success: false, filtered: true };
    }

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

    // Фильтр ботов для запросов (User-Agent без ботов)
    const botFilter = `
      AND (user_agent IS NULL OR (
        user_agent NOT LIKE '%bot%'
        AND user_agent NOT LIKE '%crawler%'
        AND user_agent NOT LIKE '%spider%'
        AND user_agent NOT LIKE '%curl%'
        AND user_agent NOT LIKE '%wget%'
        AND user_agent NOT LIKE '%python%'
        AND user_agent NOT LIKE '%zgrab%'
        AND user_agent NOT LIKE '%nuclei%'
      ))
    `;

    // Общая статистика (без ботов)
    const totalVisits = db.prepare(`
      SELECT COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ? ${botFilter}
    `).get(startDateStr).count;

    const uniqueVisitors = db.prepare(`
      SELECT COUNT(DISTINCT session_id) as count 
      FROM analytics 
      WHERE visited_at >= ? AND session_id IS NOT NULL ${botFilter}
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

    // По страницам (исключаем мусорные пути)
    const byPage = db.prepare(`
      SELECT page_path, COUNT(*) as count 
      FROM analytics 
      WHERE visited_at >= ?
        AND page_path NOT LIKE '%wp-%'
        AND page_path NOT LIKE '%/home/index%'
        AND page_path NOT LIKE '%/.env%'
        AND page_path NOT LIKE '%phpinfo%'
        AND page_path NOT LIKE '%phpmyadmin%'
        AND page_path NOT LIKE '%/cgi-bin%'
        AND (user_agent IS NULL OR (
          user_agent NOT LIKE '%bot%'
          AND user_agent NOT LIKE '%crawler%'
          AND user_agent NOT LIKE '%spider%'
          AND user_agent NOT LIKE '%curl%'
          AND user_agent NOT LIKE '%wget%'
          AND user_agent NOT LIKE '%python%'
          AND user_agent NOT LIKE '%zgrab%'
          AND user_agent NOT LIKE '%nuclei%'
        ))
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
    const stmt = db.prepare(`
      SELECT * FROM analytics
      ORDER BY visited_at DESC
      LIMIT ?
    `);

    return stmt.all(limit);
  }

  getDeviceStats(days = 7) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Парсим User Agent для определения браузера и ОС
    const visits = db.prepare(`
      SELECT user_agent FROM analytics
      WHERE visited_at >= ?
      AND user_agent IS NOT NULL
    `).all(since);

    const browsers = {};
    const os = {};

    visits.forEach(visit => {
      const ua = visit.user_agent;
      
      // Определяем браузер
      let browser = 'Other';
      if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
      else if (ua.includes('Edg')) browser = 'Edge';
      else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

      browsers[browser] = (browsers[browser] || 0) + 1;

      // Определяем ОС
      let osName = 'Other';
      if (ua.includes('Windows')) osName = 'Windows';
      else if (ua.includes('Mac OS')) osName = 'macOS';
      else if (ua.includes('Linux')) osName = 'Linux';
      else if (ua.includes('Android')) osName = 'Android';
      else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) osName = 'iOS';

      os[osName] = (os[osName] || 0) + 1;
    });

    return {
      browsers: Object.entries(browsers)
        .map(([browser, count]) => ({ browser, count }))
        .sort((a, b) => b.count - a.count),
      os: Object.entries(os)
        .map(([os, count]) => ({ os, count }))
        .sort((a, b) => b.count - a.count)
    };
  }

  getLiveVisitors() {
    // Последние 5 минут
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const visitors = db.prepare(`
      SELECT DISTINCT session_id, country, city, page_path, visited_at
      FROM analytics
      WHERE visited_at >= ?
      ORDER BY visited_at DESC
    `).all(fiveMinutesAgo);

    return {
      count: visitors.length,
      visitors: visitors.slice(0, 10)
    };
  }

  getRecentRequests(limit = 5) {
    const stmt = db.prepare(`
      SELECT * FROM requests
      ORDER BY created_at DESC
      LIMIT ?
    `);

    return stmt.all(limit);
  }
}

export default new AnalyticsService();
