# Rusden Frontend

Фронтенд для агрегатора объявлений из Telegram каналов для русскоязычных экспатов в Турции. Создан на Next.js 14 с HeroUI.

## 🌐 Продакшен сервер

- **URL:** https://rusden-frontend.onrender.com
- **Статус:** ✅ Работает, есть проблема с загрузкой данных
- **Backend API:** https://rusden-backend.onrender.com/api
- **Management:** MCP (Model Context Protocol)

## 🛠️ Технологии

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **UI:** HeroUI v2 + Tailwind CSS
- **Анимации:** Framer Motion
- **Темы:** next-themes
- **Хостинг:** Render (Node.js)
- **API:** Rusden Backend (Supabase + Groq AI)
- **Management:** MCP (Model Context Protocol)

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установить зависимости
npm install

# Настроить .env.local
cp .env.example .env.local
# Заполнить переменные окружения

# Запустить сервер
npm run dev
```

Сервер запустится на http://localhost:3000

### Управление через MCP

Фронтенд развернут на **Render** и управляется через **MCP**.

**Service ID:** `srv-d3k4pb3uibrs73f0usrg`

**Основные MCP команды:**
```bash
# Проверить статус сервиса
mcp__render__get_service(serviceId: "srv-d3k4pb3uibrs73f0usrg")

# Посмотреть последние деплои
mcp__render__list_deploys(serviceId: "srv-d3k4pb3uibrs73f0usrg")

# Проверить метрики
mcp__render__get_metrics(resourceId: "srv-d3k4pb3uibrs73f0usrg", metricTypes: ["cpu_usage", "memory_usage"])
```

## 🔐 Переменные окружения

```env
# Backend API
NEXT_PUBLIC_API_URL=https://rusden-backend.onrender.com/api

# Next.js
NODE_ENV=production
```

## ⚠️ Текущие проблемы

### Server Components не могут загрузить данные

**Проблема:** Next.js Server Components выполняются на сервере Render и не могут подключиться к внешнему API.

**Симптомы:**
- Страница показывает спиннеры загрузки
- В браузере видны ошибки сетевых запросов

**Решения:**
1. **Перенести API вызовы в Client Components**
2. **Создать API Routes в Next.js** для проксирования запросов
3. **Настроить CORS** на бэкенде для Render IP

### Статус компонента

- ✅ Приложение запускается и работает
- ✅ Навигация и UI отображаются корректно
- ✅ Темная тема работает
- ❌ Загрузка данных с бэкенда не работает (Server Components)
- ✅ Бэкенд API работает идеально

## 📦 Структура проекта

```
rusden-frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Главный layout
│   ├── page.tsx           # Главная страница
│   ├── home-page.tsx      # Компонент домашней страницы
│   └── globals.css        # Глобальные стили
├── lib/                   # Утилиты
│   └── api.ts            # API функции для бэкенда
├── types/                 # TypeScript типы
│   ├── listing.ts        # Типы объявлений
│   └── index.ts          # Экспорт типов
├── components/            # React компоненты
├── public/               # Статические файлы
├── .env.local           # Локальные переменные окружения
├── .env.example         # Пример переменных
└── package.json         # Зависимости
```

## 📝 Скрипты

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Запуск production
npm start

# Линтинг
npm run lint

# TypeScript проверка
npm run type-check
```

## 🔍 Мониторинг и отладка

### Проверить статус сервиса
```bash
# Health check
curl -I https://rusden-frontend.onrender.com

# Через MCP
mcp__render__get_service(serviceId: "srv-d3k4pb3uibrs73f0usrg")
```

### Просмотр логов
```bash
# Через MCP (когда будут доступны)
mcp__render__list_logs(resource: "srv-d3k4pb3uibrs73f0usrg")

# Через Render Dashboard
# https://dashboard.render.com/web/srv-d3k4pb3uibrs73f0usrg/logs
```

## 🚀 Деплой на Render

Автоматический деплой настроен на main branch:

```bash
git push origin main
```

**Ручной деплой:**
1. Зайти в Render Dashboard
2. Service: srv-d3k4pb3uibrs73f0usrg
3. Manual Deploy

## 📚 Дополнительная документация

- [🔧 MCP гайд по управлению Render](../rusden-backend/docs/RENDER_MCP_GUIDE.md)
- [📊 Rusden Backend документация](../rusden-backend/README.md)
- [🎨 HeroUI документация](https://heroui.com/)
- [⚡ Next.js документация](https://nextjs.org/docs)

## 📝 Лицензия

MIT

## 🤝 Вклад

Contributions welcome! Открывайте Issues и Pull Requests.
