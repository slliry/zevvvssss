# Zeus Website

Полный стек проекта: фронтенд на React + Vite (`/`), бэкенд на Express + SQLite (`/backend`).  
Фронт собирается и кладётся в `/backend/public`, после чего сервис раздаёт статику и API из одного процесса.

## Docker

В корне есть единый `Dockerfile`, который:

1. Собирает фронтенд (`npm run build`) внутри stage `frontend-builder`.
2. Собирает прод-сборку бекенда (`npm ci --omit=dev`) в `backend-builder`.
3. Копирует статический билд фронта в `/public` бекенда и упаковывает рантайм-образ (~250 MB) на базе `node:20-bookworm-slim`.
4. Создаёт каталог `/data` под файл SQLite (см. `DATABASE_PATH`), монтируемый как volume для сохранности данных.

Запуск локально:

```bash
docker build -t zeus-app .
docker run --rm -p 4000:4000 \
  -e JWT_SECRET=change-me \
  -v zeus-data:/data \
  zeus-app
```

Фронтенд будет доступен по `http://localhost:4000`, API — по `http://localhost:4000/api/*`.

## Деплой на Railway

1. Создайте новый **Service** в Railway → «Deploy from repo» → выберите этот проект.  
   В настройках сборки укажите:
   - **Builder**: `Dockerfile`
   - **Root Directory**: `/` (по умолчанию).
2. В разделе **Variables** задайте:
   - `JWT_SECRET` — секрет для подписи токенов.
   - `CORS_ORIGIN` — домен админки (можно `*`, если фронт живёт здесь же).
   - `DATABASE_PATH=/data/app.db` (совпадает со значением по умолчанию, но лучше указать явно).
3. В разделе **Persistent Storage** добавьте volume (например, 1 GB) и смонтируйте его в контейнер по пути `/data`, чтобы база SQLite не терялась между рестартами.
4. Убедитесь, что порт сервиса равен `4000` (именно его экспонирует контейнер). Railway автоматически создаст внешний URL вида `https://<project>.up.railway.app`.
5. После деплоя можно создать администратора, выполнив в контейнере (через Railway Shell) команду:

```bash
npm run seed:admin --workspace backend
```

> Фронтенд общается с API по относительным ссылкам, поэтому дополнительных переменных `VITE_*` для продакшена не требуется: запросы уходят на тот же домен, где работает Node-сервис.
