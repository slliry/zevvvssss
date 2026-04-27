import express from 'express';
import * as translationController from '../controllers/translationController.js';
import { translationAdminAuth } from '../middleware/translationAuth.js';

const router = express.Router();

// Публичные эндпоинты (без авторизации) - для всех пользователей
router.get('/all', translationController.getAllTranslations);
router.get('/', translationController.getTranslation);
router.get('/lang/:lang', translationController.getTranslationsByLang);
router.post('/request-language', translationController.requestNewLanguage);

router.get('/cache/stats', translationAdminAuth, translationController.getCacheStats);
router.get('/cache/search', translationAdminAuth, translationController.searchCache);
router.delete('/cache', translationAdminAuth, translationController.clearCache);

router.post('/generate', translationAdminAuth, translationController.generateTranslation);
router.post('/generate-all', translationAdminAuth, translationController.generateAllTranslations);
router.post('/auto-translate', translationAdminAuth, translationController.autoTranslateKey);
router.put('/update', translationAdminAuth, translationController.updateTranslation);

export default router;
