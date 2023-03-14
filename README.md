## Описание

Проект Messenger (практика Yandex.Praktikum).

#### 1 спринт
Использование Parcel, Sass, Express для реализации статики.

#### 2 спринт
Разбиение на компоненты (js-модули) из статичной верстки. Использование TypeScript.

#### 3 спринт
Добавление роутинга, запросов к API. Использование WebSocket. Защита от XSS и DOS.

#### 4 спринт
Перевод проекта на WebPack. Монтирование проекта в Docker. Написание тестов модулей.

## Дизайн

[Макет в Figma](https://www.figma.com/file/RyCIabsvFXGjxt9MkMcJdj/Messenger-Yandex.Praktikum)

## Скрипты

- `npm install` — установка node-пакетов
- `npm run dev` — создание сборки для разработки
- `npm run build` — создание продакшн-сборки
- `npm run start` — режим отладки/разработки приложения с запуском сервера
- `npm run serve` — запуск сервера

## Тесты кода

- `npm run check:eslint` — запуск ESLint
- `npm run check:stylelint` — запуск StyleLint
- `npm run check:test` — запуск Jest
- `npm run check` — запуск всех тестов `check:*`

### Deploys

#### Netlify
https://yp-ivan-messenger.netlify.app/

#### Render
https://yp-ivan-messenger.onrender.com \
https://yp-ivan-messenger-docker.onrender.com [docker]
