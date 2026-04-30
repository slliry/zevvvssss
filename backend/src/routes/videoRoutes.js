import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const SUPPORTED_LANGUAGES = ['ru', 'en', 'kk', 'uz', 'ky', 'tr'];
const VIDEO_DIR = path.join(__dirname, '../../public/videos');

// Получить видео для конкретного языка
router.get('/:lang', (req, res) => {
  try {
    const { lang } = req.params;
    
    // Проверяем что язык поддерживается
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(400).json({ 
        error: 'Unsupported language',
        supportedLanguages: SUPPORTED_LANGUAGES 
      });
    }

    // Ищем видео файл для этого языка
    const videoPath = path.join(VIDEO_DIR, `${lang}.mp4`);
    
    // Проверяем существует ли файл
    if (!fs.existsSync(videoPath)) {
      // Если нет видео для этого языка, возвращаем русское как fallback
      const fallbackPath = path.join(VIDEO_DIR, 'ru.mp4');
      
      if (!fs.existsSync(fallbackPath)) {
        return res.status(404).json({ 
          error: 'Video not found',
          message: `No video available for language: ${lang}` 
        });
      }
      
      console.log(`⚠️  Video for ${lang} not found, using Russian fallback`);
      return res.sendFile(fallbackPath);
    }

    console.log(`📹 Serving video for language: ${lang}`);
    res.sendFile(videoPath);
  } catch (error) {
    console.error('Error serving video:', error);
    res.status(500).json({ error: 'Failed to serve video' });
  }
});

// Получить список доступных языков с видео
router.get('/', (req, res) => {
  try {
    const availableVideos = SUPPORTED_LANGUAGES.filter(lang => {
      const videoPath = path.join(VIDEO_DIR, `${lang}.mp4`);
      return fs.existsSync(videoPath);
    });

    res.json({
      supportedLanguages: SUPPORTED_LANGUAGES,
      availableVideos,
      message: availableVideos.length === 0 
        ? 'No videos uploaded yet. Please add video files to backend/public/videos/' 
        : `${availableVideos.length} video(s) available`
    });
  } catch (error) {
    console.error('Error listing videos:', error);
    res.status(500).json({ error: 'Failed to list videos' });
  }
});

export default router;
