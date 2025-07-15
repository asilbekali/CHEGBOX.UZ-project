# 🛍️ Chegbox.uz - Backend

**Chegbox.uz** — chegirmadagi mahsulot va xizmatlar haqida e’lonlarni joylash va izlash imkonini beruvchi onlayn platformaning backend qismi.

> Ushbu repozitoriyda loyihaning faqat **backend** qismi joylangan. Frontend keyinchalik ulanishi mumkin.

---

## 📌 Loyiha haqida

Chegbox.uz — foydalanuvchilar va tadbirkorlar uchun chegirmadagi mahsulotlar va xizmatlar haqidagi ma’lumotlarni tez va oson joylash, ko‘rish hamda ulardan xabardor bo‘lish imkonini beruvchi onlayn platforma. Loyiha asosiy e’tiborni **foydalanuvchiga qulaylik**, **tezkor xabar yetkazish** va **rolga asoslangan boshqaruv tizimi**ga qaratadi.

---

## 🧑‍🤝‍🧑 Rollar va ularning vakolatlari

Loyihada foydalanuvchilar quyidagi rollardan biriga ega bo‘ladi:

| ROL           | TA'RIFI                                                                 |
|---------------|-------------------------------------------------------------------------|
| `USER`        | Oddiy foydalanuvchi. E’lonlarni ko‘radi, izlaydi, lekin joylay olmaydi. |
| `SELLER`      | E’lon joylashi mumkin. Mahsulotlarini qo‘shadi va boshqaradi.          |
| `ADMIN`       | E’lonlarni tasdiqlash, o‘chirish, userlarni ko‘rish huquqiga ega.       |
| `VIEWER_ADMIN`| Faqat ma’lumotlarni ko‘rish huquqiga ega (o‘zgartirish huquqisiz).       |
| `SUPER_ADMIN` | To‘liq huquqli boshqaruvchi. Barcha funksiyalarga ruxsat bor.           |

RBAC (Role-Based Access Control) orqali bu rollarga mos ravishda ruxsatlar nazorat qilinadi.

---

## ⚙️ Texnologiyalar

- **NestJS** – Backend arxitekturasi
- **PostgreSQL** – Ma’lumotlar bazasi
- **Prisma ORM** – Ma’lumotlar bilan ishlash
- **JWT** – Autentifikatsiya
- **bcrypt** – Parollarni xashlash
- **Nodemailer** – Email yuborish (tasdiqlash xatlari)
- **Eskiz.uz** – SMS orqali OTP yuborish
- **Swagger** – API hujjatlari
- **RBAC** – Rollar orqali kirish nazorati

---

## 📁 Asosiy modullar

- **Auth Module**: Ro‘yxatdan o‘tish, OTP yuborish, login, tokenlar
- **User Module**: CRUD, rollar, verifikatsiya
- **Product Module**: Mahsulot e’lonlari CRUD
- **Category Module**: Kategoriya yaratish va ro‘yxat
- **Region Module**: Viloyat/tuman bo‘yicha joylashuv
- **Session Module**: Login sessiyalari tarixi
- **Admin nazorati**: E’lonlarni tasdiqlash/o‘chirish, statistika

---

## 🚀 Loyihani ishga tushurish

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/asilbekali/CHEGBOX.UZ-project.git
cd CHEGBOX.UZ-project

# 2. Paketlarni o‘rnatish
npm install
# yoki
yarn install

# 3. .env faylni tayyorlash
cp .env.example .env

# 4. Prisma ORM: migratsiya va client yaratish
npx prisma migrate dev
npx prisma generate

# 5. Serverni ishga tushurish
npm run start:dev
```

---

## 🔑 .env konfiguratsiya namunasi

```env
DATABASE_URL="postgresql://user:password@localhost:5432/chegbox"
JWT_SECRET="secret-jwt-key"
MAIL_USER="youremail@gmail.com"
MAIL_PASSWORD="app-password"
ESKIZ_API_KEY="eskiz-token" //eskiz commitdan ochib qoyish kerak !
```

---

## 📄 Swagger API hujjati

Swagger UI orqali backend API'ni real vaqtda test qilish mumkin:

```
GET http://localhost:3000/api
```

---

## 📩 Xabarnomalar

- OTP kod: `Eskiz.uz` orqali SMS yuboriladi
- Email orqali: tasdiqlash yoki parol tiklash xabarlari yuboriladi (`nodemailer` bilan)

---

## 📝 Litsenziya

Loyiha ochiq manba (open-source) bo‘lishi rejalashtirilmoqda. Hozircha maxsus litsenziya belgilanmagan.

---

## 🤝 Hissa qo‘shish

Takliflar, `issue`lar va `pull request`lar orqali siz ham loyihaga hissa qo‘shishingiz mumkin!

---
