# 🛍️ Chegbox.uz

**Chegbox.uz** — foydalanuvchilar va tadbirkorlar chegirmadagi mahsulot va xizmatlar haqidagi e’lonlarni joylashi va izlashlari mumkin bo‘lgan onlayn platforma.

## 🎯 Maqsad

Foydalanuvchilar uchun mahsulot va xizmatlardagi chegirmalarni tez va qulay topish, tadbirkorlar uchun esa ularni reklama qilish imkoniyatini yaratish.

---

## 🧩 Asosiy modullar

### 1. Asosiy sahifa
- Logotip + navigatsiya menyusi
- Qidiruv paneli (mahsulot nomi, kategoriya, shahar)
- Eng so‘nggi va mashhur e’lonlar
- Kategoriyalar ro‘yxati
- Telegram kanalga ulanish

### 2. E’lonlar sahifasi
Har bir e’lon quyidagilardan iborat:
- Rasmlar galereyasi
- Mahsulot nomi va tavsifi
- Chegirma miqdori (% yoki so‘mda)
- Avvalgi va hozirgi narx
- Amal qilish muddati
- Lokatsiya (shahar, tuman)
- Aloqa raqami yoki yozish tugmasi

### 3. Kategoriya sahifalari
- Elektronika
- Kiyim-kechak
- Xizmatlar
- Avto
- Oziq-ovqat
- va boshqa yo‘nalishlar

### 4. Qidiruv va filtr
- Kategoriya
- Narx oralig‘i
- Chegirma foizi
- Shahar
- Qo‘shilgan sanasi (oxirgi e’lonlar)

### 5. E’lon joylash sahifasi
- Faqat ro‘yxatdan o‘tgan foydalanuvchilar uchun
- Mahsulot nomi, tavsifi
- Rasm yuklash
- Eski narx / yangi narx
- Chegirma miqdori (%)
- Amal muddati
- Lokatsiya
- Aloqa ma’lumotlari

### 6. Foydalanuvchi paneli
- Mening e’lonlarim
- E’lonni tahrirlash / o‘chirish
- Profil sozlamalari

---

## 🔐 Autentifikatsiya

- Ro‘yxatdan o‘tish / Kirish: email yoki telefon orqali
- Admin panel — alohida autentifikatsiya bilan

---

## ⚙️ Admin panel imkoniyatlari

- E’lonlarni ko‘rish, tasdiqlash, o‘chirish
- Foydalanuvchilarni boshqarish
- Platforma statistikasi
- Reklama joylarini boshqarish

---

## 📱 Mobil moslik

Barcha sahifalar to‘liq mobil mos dizayn bilan yaratiladi (responsive design).

---

## 📩 Bildirishnomalar

- Telegram orqali avtomatik bildirishnomalar
- Shahar va kategoriya bo‘yicha filterlangan xabarnomalar

---

## 💰 Monetizatsiya (kelajakdagi kengaytma uchun)

- **Premium e’lonlar** — asosiy sahifaning yuqori qismida ko‘rsatiladi
- **Reklama bannerlari** — to‘lov evaziga ko‘rsatiladigan joylar

---

## 🧪 Texnologiyalar (misol uchun)

> Agar bu qismi sizda tayyor bo‘lsa, qo‘shing. Misol:
- Frontend: React.js / Next.js
- Backend: Node.js (NestJS)
- DB: PostgreSQL (Prisma ORM)
- File Upload: Multer
- Auth: JWT, OTP
- Deployment: Vercel / Railway / Render

---

## 📁 Loyihani ishga tushirish (Development)

```bash
# Clone project
git clone https://github.com/username/chegbox.uz.git

# Install dependencies
npm install

# Yoki yarn ishlatsa
yarn install

# Prisma migration
npx prisma generate
npx prisma migrate dev

# Run project
npm run start:dev
