# Инструкция по работе с ветками проекта

## Структура веток

Проект реорганизован для удобной работы с feature branches и merge requests.

### Основная ветка

**`master`** - чистая базовая ветка (коммит `13947f6 first setup`)
- Содержит только первоначальную настройку проекта
- Служит отправной точкой для всех feature веток

### Feature ветки

#### 1️⃣ `feature/apollo-graphql`
**Базовая настройка Apollo Client с GraphQL**

**Что включает:**
- Настройка Apollo Client
- GraphQL queries и mutations для auth и chat
- MVP функциональность приложения

**Коммиты:**
- `787a9f1..59adb0a` (7 коммитов, финальный: `mvp`)

**Изменения:**
- Настройка Apollo Client с authLink
- Базовые GraphQL queries/mutations
- Компоненты для auth и chat
- Redux store для auth state

---

#### 2️⃣ `feature/refactoring`
**Рефакторинг кодовой базы**

**Базируется на:** `feature/apollo-graphql`

**Что включает:**
- Реорганизация структуры папок (feature-based architecture)
- Улучшение архитектуры кода
- Оптимизация и очистка кода

**Коммиты:**
- `c982f20, b7fcc72, e33ab3c, df3fa77, 33a5079` (5 коммитов)

**Изменения:**
- Переход на FSD архитектуру (features, shared, app)
- Разделение на api/model/ui слои
- Оптимизация импортов и зависимостей

---

#### 3️⃣ `feature/websocket`
**Добавление Socket.IO для real-time сообщений**

**Базируется на:** `feature/refactoring`

**Что включает:**
- Интеграция Socket.IO клиента
- WebSocket события (JOIN_CHAT, NEW_MESSAGE, etc.)
- Real-time обновления сообщений

**Коммиты:**
- `23a7179` (1 коммит: `add websocket`)

**Изменения:**
- `/src/app/socket/` - Socket.IO setup
- `/src/shared/hooks/` - хуки для работы с WebSocket
- Обновление Chat.tsx для real-time

---

#### 4️⃣ `feature/rtk-query-migration`
**Миграция с Apollo Client на RTK Query**

**Базируется на:** `feature/websocket`

**Что включает:**
- Замена Apollo Client на RTK Query + graphql-request
- Новые API endpoints (authApi, chatApi)
- Обновление всех компонентов и хуков

**Коммиты:**
- `b2e279a` (1 коммит: `add rtk query`)

**Изменения:**
- Удален `@apollo/client`
- Добавлен `graphql-request`
- Новые файлы: `authApi.ts`, `chatApi.ts`, `rtkQuery.ts`
- Обновлены все компоненты для RTK Query

---

## Порядок merge requests

Чтобы собрать полный проект, нужно мержить ветки в следующем порядке:

### 1. Merge `feature/apollo-graphql` → `master`

```bash
# Переключиться на master
git checkout master

# Смержить apollo-graphql
git merge feature/apollo-graphql --no-ff -m "feat: add Apollo Client with GraphQL queries and mutations"
```

**Результат:** Проект с базовым Apollo Client и GraphQL

---

### 2. Merge `feature/refactoring` → `master`

```bash
# После merge feature/apollo-graphql
git merge feature/refactoring --no-ff -m "refactor: improve architecture with FSD structure"
```

**Результат:** Рефакторинг + Apollo Client

---

### 3. Merge `feature/websocket` → `master`

```bash
# После merge feature/refactoring
git merge feature/websocket --no-ff -m "feat: add Socket.IO for real-time messaging"
```

**Результат:** Рефакторинг + Apollo + WebSocket

---

### 4. Merge `feature/rtk-query-migration` → `master`

```bash
# После merge feature/websocket
git merge feature/rtk-query-migration --no-ff -m "feat: migrate from Apollo Client to RTK Query"
```

**Результат:** Финальная версия с RTK Query + WebSocket

---

## Проверка текущей структуры

```bash
# Посмотреть все ветки
git branch -a

# Визуализировать структуру
git log --oneline --graph --all --decorate -20

# Проверить различия между ветками
git diff master feature/apollo-graphql
git diff feature/apollo-graphql feature/refactoring
git diff feature/refactoring feature/websocket
git diff feature/websocket feature/rtk-query-migration
```

---

## Push веток на remote

Если нужно загрузить ветки на GitHub/GitLab:

```bash
# Push всех feature веток
git push -u origin feature/apollo-graphql
git push -u origin feature/refactoring
git push -u origin feature/websocket
git push -u origin feature/rtk-query-migration

# Force push обновленного master (ОСТОРОЖНО!)
git push origin master --force
```

⚠️ **Внимание:** `git push --force` перезапишет удаленный master. Убедитесь, что это нужно!

---

## Создание Pull/Merge Requests

### На GitHub:

1. Перейдите в репозиторий на GitHub
2. Нажмите "Pull requests" → "New pull request"
3. Выберите: base: `master` ← compare: `feature/apollo-graphql`
4. Создайте PR с описанием изменений
5. После review и approve - смержите
6. Повторите для остальных веток по порядку

### На GitLab:

1. Перейдите в проект на GitLab
2. Нажмите "Merge requests" → "New merge request"
3. Выберите: Source: `feature/apollo-graphql` → Target: `master`
4. Создайте MR с описанием
5. После review - смержите
6. Повторите для остальных веток

---

## Backup

**`backup-master-original`** - backup оригинального master с RTK Query
- На случай если нужно вернуться к исходному состоянию
- Можно удалить после проверки новой структуры:
  ```bash
  git branch -D backup-master-original
  ```

**`base-clean`** - вспомогательная ветка (можно удалить):
```bash
git branch -D base-clean
```

---

## Текущее состояние

**Активная ветка:** `master` (чистая база)

**Доступные feature ветки:**
- ✅ `feature/apollo-graphql` - готова к merge
- ✅ `feature/refactoring` - готова к merge после apollo-graphql
- ✅ `feature/websocket` - готова к merge после refactoring
- ✅ `feature/rtk-query-migration` - готова к merge после websocket

---

## FAQ

**Q: Как вернуться к исходному состоянию?**
```bash
git checkout backup-master-original
git branch -D master
git checkout -b master
```

**Q: Как удалить feature ветки после merge?**
```bash
git branch -d feature/apollo-graphql
git branch -d feature/refactoring
git branch -d feature/websocket
git branch -d feature/rtk-query-migration
```

**Q: Как посмотреть что именно добавила каждая ветка?**
```bash
# Для apollo-graphql
git log master..feature/apollo-graphql --oneline

# Для websocket
git log feature/refactoring..feature/websocket --oneline

# И так далее
```

---

## Важные заметки

1. 🔒 Код не изменялся - только реорганизация Git истории
2. 📦 Все коммиты сохранены в соответствующих feature ветках
3. 🎯 Master теперь чистая база для организованной разработки
4. 🔄 Можно создавать MR/PR для каждой фичи отдельно
5. 💾 Оригинальное состояние сохранено в `backup-master-original`
