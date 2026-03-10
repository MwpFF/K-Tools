Учебный проект «Интернет‑магазин инструментов K-Tools»

Сделал небольшой веб‑магазин строительных инструментов, чтобы разобраться как работают микросервисы и асинхронные события.

В одном репозитории:
- Frontend: React SPA (каталог/корзина/заказы)  
- Backend: 3 Spring Boot сервиса + Kafka + PostgreSQL  
- DevOps: Docker Compose и манифесты Kubernetes (Minikube)

---

## Что это такое и как работает?

Это полноценный интернет-магазин строительных инструментов — система, которая автоматически обрабатывает заказы от начала до конца.
Пользователь оформляет заказ например на «Перфоратор». Что происходит дальше:

1. В UI нажимает «Оформить заказ» → запрос `POST /api/v1/orders`
2. Order Service сохраняет заказ в PostgreSQL со статусом `PENDING`
3. Order Service публикует событие `ORDER_CREATED` в Kafka topic `order-events`
4. Inventory Service получает событие, «резервирует» товар (логика в сервисе), публикует `STOCK_RESERVED`
5. Order Service получает `STOCK_RESERVED` и обновляет заказ на `RESERVED`
6. Notification Service слушает события и пишет информативные логи (создание/резерв)

Статус заказа меняется «сам», без ручного вмешательства.

---

##  Демо запуск

1. Запускаешь проект и открываешь `http://localhost`
2. На странице Каталог добавляешь товар в корзину
3. Переходишь в Корзину и жмёшь «Оформить»
4. Открываешь Заказы → видишь заказ со статусом `PENDING`, а спустя момент — `RESERVED`
5. Открываешь Детали заказа и смотришь итоговые данные

---

## Что делает веб‑приложение

### Каталог (`/`)
- Показывает список инструментов (демо‑каталог в UI)
- Даёт добавить позицию в корзину
- Удобная навигация через верхнее меню

### Корзина (`/cart`)
- Показывает выбранные позиции и их количество
- Считает суммы (unitPrice × quantity → total)
- Отправляет оформление заказа в backend:
  - `POST /api/v1/orders`
  - тело запроса: `productCode`, `productName` (если передан), `quantity`, `unitPrice`

### Заказы (`/orders`)
- Загружает список заказов:
  - `GET /api/v1/orders`
- Отображает статусы (`PENDING` → `RESERVED`)
- Позволяет перейти в детали заказа

### Детали заказа (`/orders/:id`)
- Загружает заказ по id:
  - `GET /api/v1/orders/{id}`
- Показывает поля заказа и текущий статус

### 👤 Профиль (`/profile`)
- Страница‑заглушка для профиля менеджера (без авторизации/логина в текущей версии)

---

##№ Архитектура 

В прод‑режиме (Docker) у проекта одна точка входа:
- UI: `http://localhost`
- API: `http://localhost/api/...` (Nginx проксирует на backend)

```

В `docker-compose.yml` поднимаются 6 контейнеров: zookeeper, kafka, postgres, backend-service (order-service), inventory-service, notification-service, frontend (nginx+react).

---

### Как запустить

### Способ 1 — всё сразу (самый простой, через Docker)

```bash
git clone https://github.com/MwpFF/K-Tools
cd K-Tools/ecommerce-tools-shop
docker-compose up --build
```

Открывай `http://localhost`.

Полезно знать:
- UI работает на 80 порту
- Backend (Order Service) дополнительно проброшен наружу на `http://localhost:18080` (если нужно ходить в API напрямую)
- В UI API вызывается относительно `/api/v1` (через Nginx reverse proxy)

### Способ 2 — по частям (для понимания)

1) Инфраструктура:

```bash
docker-compose up -d zookeeper kafka postgres
```

2) Backend (3 терминала). Рекомендую собирать jar и запускать его (на Windows/путях с кириллицей так надёжнее):

```bash
# Сборка (из корня репозитория)
mvn package -DskipTests -pl order-service -am
mvn package -DskipTests -pl inventory-service -am
mvn package -DskipTests -pl notification-service -am

# Запуск (каждый в отдельном терминале)
java -jar order-service/target/order-service-1.0.0-SNAPSHOT-exec.jar
java -jar inventory-service/target/inventory-service-1.0.0-SNAPSHOT-exec.jar
java -jar notification-service/target/notification-service-1.0.0-SNAPSHOT-exec.jar
```

3) Frontend (отдельно):

```bash
cd frontend
npm install
npm run dev
```

Dev UI откроется на `http://localhost:3000`.  
Vite проксирует `/api` на `http://localhost:8080` (поэтому Order Service в этом режиме должен быть на 8080).

---

### Order Service
- `POST /api/v1/orders` — создать заказ  
- `GET  /api/v1/orders` — список заказов  
- `GET  /api/v1/orders/{id}` — заказ по id  

### Kafka topic
- `order-events`  
  - `ORDER_CREATED` (публикует Order Service)
  - `STOCK_RESERVED` (публикует Inventory Service)

---

## Быстрый тест API (cURL)

Если backend доступен напрямую (например локально на `8080`, или через compose на `18080`), можно так:

PowerShell:

```powershell
curl -X POST http://localhost:18080/api/v1/orders `
  -H "Content-Type: application/json" `
  -d "{\"productCode\":\"PERF001\",\"productName\":\"Перфоратор\",\"quantity\":2,\"unitPrice\":25000}"
```

bash:

```bash
curl -X POST http://localhost:18080/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{"productCode":"PERF001","productName":"Перфоратор","quantity":2,"unitPrice":25000}'
```

Проверить:

```bash
curl http://localhost:18080/api/v1/orders/1
```

---

## Технологии 

- Backend: Spring Boot 3.3.5, Java 21, Maven, Spring Web, Spring Data JPA, Spring Kafka, Validation  
- DB: PostgreSQL 16  
- Messaging: Kafka (Confluent images 7.5.0) + ZooKeeper  
- Frontend: React 18 + Vite, React Router, Tailwind CSS  
- Reverse proxy: Nginx (в Docker‑образе фронта)  
- DevOps: Docker Compose, Kubernetes манифесты в `k8s/` (Minikube)

---
