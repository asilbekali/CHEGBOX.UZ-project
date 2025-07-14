export enum Role {
  USER = 'user',               // oddiy foydalanuvchi (sotib oluvchi)
  SELLER = 'seller',           // mahsulot yuklaydigan sotuvchi
  ADMIN = 'admin',             // barcha CRUD'ga ruxsat
  SUPER_ADMIN = 'super-admin', // faqat update va create
}
