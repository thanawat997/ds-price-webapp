# ds-price

## Setup

1. ติดตั้ง dependencies

```bash
npm install
```

2. สร้างไฟล์ `.env`

```bash
cp .env.example .env
```

3. เตรียม Google Service Account

- วางไฟล์ `credentials.json` (Service Account JSON) ไว้ที่โฟลเดอร์โปรเจกต์
- แชร์ Google Sheet ให้ `client_email` ใน Service Account เป็น Editor

4. ตั้งค่า LINE

- ใส่ค่า `LINE_CHANNEL_ACCESS_TOKEN` และ `LINE_GROUP_ID` ใน `.env`

## Run

```bash
npm run dev
```

เปิดที่ `http://127.0.0.1:3000/`

