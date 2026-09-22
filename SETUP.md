# Запуск проекта

Гайд рассчитан на то, что все шаги выполняет ИИ-агент (или человек) в терминале macOS.
Команды можно выполнять подряд: каждая проверяет своё состояние и не ломается при повторном запуске.

Проект: React 19 + Vite 8, рабочий порт — **5199**.

---

## TL;DR — поднять и открыть в браузере

Из папки `react-app`:

```bash
npm install                                    # один раз (и после смены package.json)
npm run dev -- --port 5199 --strictPort &      # dev-сервер в фоне
until curl -sf -o /dev/null http://localhost:5199/; do sleep 0.3; done
open http://localhost:5199/                    # браузер по умолчанию
```

Цикл `until` нужен, чтобы `open` не сработал раньше, чем Vite поднимется, — иначе браузер
покажет «не удаётся подключиться».

Остановить:

```bash
lsof -ti:5199 | xargs kill
```

---

## 1. Проверить, что уже установлено

```bash
node -v    # нужно v20.19+ или v22.12+ (Vite 8 ниже не запустится)
npm -v     # ставится вместе с Node
```

Если обе команды напечатали версии и Node проходит по требованиям — переходи к шагу 3.
`command not found` означает, что Node нет.

Проверено на: macOS 26.6 (arm64), Node v24.11.1, npm 11.6.2.

## 2. Установить Node.js и npm

npm ставится вместе с Node — отдельно его устанавливать не нужно.

### Вариант А. Homebrew (проще)

```bash
brew --version || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

После установки Homebrew на Apple Silicon может потребоваться добавить его в `PATH`
(установщик печатает нужные строки в конце вывода):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Вариант Б. nvm (если нужно несколько версий Node)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22
nvm use 22
```

Проверить результат:

```bash
node -v && npm -v
```

## 3. Установить зависимости проекта

```bash
cd /Users/alexandrkucherenko/Desktop/tuskpay-homepage-2/react-app
npm install
```

Ставится React, Vite, `react-router-dom` и `vite-plugin-svgr` (через него подключаются все SVG).
Папку `node_modules` коммитить/копировать не нужно — она полностью восстанавливается этой командой.

## 4. Запустить dev-сервер на нужном порту

В `package.json` скрипт `dev` порт не фиксирует, поэтому передаём его флагом:

```bash
npm run dev -- --port 5199 --strictPort
```

- `--port 5199` — нужный порт;
- `--strictPort` — не искать соседний свободный порт молча, а упасть с ошибкой, если 5199 занят
  (иначе легко открыть браузер не на том адресе).

Запуск в фоне, чтобы терминал остался свободным, а логи писались в файл:

```bash
npm run dev -- --port 5199 --strictPort > /tmp/vite-5199.log 2>&1 &
```

Посмотреть логи: `tail -f /tmp/vite-5199.log`.

## 5. Открыть в браузере через `open`

```bash
open http://localhost:5199/                              # браузер по умолчанию
open -a Safari http://localhost:5199/                    # конкретный браузер
open -a "Google Chrome" http://localhost:5199/chargeback # сразу нужная страница
```

Надёжный вариант — дождаться готовности сервера:

```bash
until curl -sf -o /dev/null http://localhost:5199/; do sleep 0.3; done && open http://localhost:5199/
```

Альтернатива без `open` — Vite умеет открывать браузер сам:

```bash
npm run dev -- --port 5199 --strictPort --open
```

## 6. Проверить, что всё поднялось

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5199/            # ожидаем 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5199/chargeback  # тоже 200
```

Вторая проверка важна: `/chargeback` — не файл на диске, а маршрут react-router.
Сервер обязан отдавать на него `index.html`; dev-сервер Vite и `vite preview` делают это сами.

## 7. Остановить сервер

```bash
lsof -ti:5199 | xargs kill        # по порту
pkill -f "vite --port 5199"       # по команде
```

Если порт занят чужим процессом — сначала посмотреть, кем:

```bash
lsof -i:5199
```

---

## Прод-сборка

```bash
npm run build                                  # результат в dist/
npm run preview -- --port 4199 --strictPort &  # локальный просмотр собранного
until curl -sf -o /dev/null http://localhost:4199/; do sleep 0.3; done
open http://localhost:4199/
```

`dist/` — статика, её можно открыть на любом хостинге. **Важно:** из-за клиентского роутинга
хостинг должен отдавать `index.html` на неизвестные пути (rewrite / history API fallback),
иначе прямой заход на `/chargeback` вернёт 404. Открывать `dist/index.html` двойным кликом
(через `file://`) нельзя — не загрузятся модули.

---

## Если что-то пошло не так

| Симптом | Причина и что делать |
| --- | --- |
| `command not found: node` | Node не установлен или не в `PATH` — шаг 2. |
| `You are using Node.js XX. Vite requires...` | Старый Node, нужен 20.19+ / 22.12+: `brew upgrade node` или `nvm install 22 && nvm use 22`. |
| `Port 5199 is already in use` | Сервер уже запущен либо порт занят: `lsof -i:5199`, затем `lsof -ti:5199 \| xargs kill`. |
| Браузер: «не удаётся подключиться» | `open` выполнился раньше старта сервера — использовать цикл `until curl ...` из шага 5. |
| `/chargeback` даёт 404 | Открыт не dev-сервер, а статика без fallback на `index.html` — см. раздел про прод-сборку. |
| Пустая белая страница | Смотреть ошибки: `tail -50 /tmp/vite-5199.log` и консоль браузера. |
| Странные ошибки после смены зависимостей | `rm -rf node_modules package-lock.json && npm install` |

---

## Памятка для ИИ-агента

- Dev-сервер запускать **в фоне** (`&` или фоновый режим инструмента), иначе выполнение
  заблокируется — процесс работает, пока его не остановят.
- Всегда ставить `--strictPort`: без него Vite молча переедет на 5200, и проверки/скриншоты
  пойдут не на тот адрес.
- Перед `open` дожидаться ответа сервера циклом `until curl -sf ...`, а не `sleep` наугад.
- Проверять результат кодом ответа (`curl -w "%{http_code}"`), а не только глазами.
- После работы гасить сервер (`lsof -ti:5199 | xargs kill`), если он больше не нужен —
  иначе следующий запуск упадёт из-за занятого порта.
- `npm run preview` — это просмотр собранного `dist/`, он **не** связан с папкой `../preview`
  в корне репозитория (та — отдельный статический прототип, к сборке отношения не имеет).
