import db from '../db/index.js';

console.log('📊 Проверка данных аналитики в БД...\n');

// Проверяем общее количество записей
const total = db.prepare('SELECT COUNT(*) as count FROM analytics').get();
console.log(`Всего записей в БД: ${total.count}`);

if (total.count > 0) {
  // Показываем последние 5 записей
  console.log('\n📝 Последние 5 записей:');
  const recent = db.prepare(`
    SELECT id, ip, country, city, page_path, visited_at 
    FROM analytics 
    ORDER BY visited_at DESC 
    LIMIT 5
  `).all();
  
  recent.forEach((row, i) => {
    console.log(`${i + 1}. [${row.visited_at}] ${row.ip} → ${row.page_path} (${row.country || 'Unknown'}, ${row.city || 'Unknown'})`);
  });
} else {
  console.log('\n⚠️  В БД нет записей!');
  console.log('\nВозможные причины:');
  console.log('1. Фронтенд не отправляет запросы (проверь консоль браузера)');
  console.log('2. Бэкенд не запущен');
  console.log('3. CORS блокирует запросы');
  console.log('4. Неправильный URL в VITE_API_URL');
}

console.log('\n✅ Проверка завершена');
