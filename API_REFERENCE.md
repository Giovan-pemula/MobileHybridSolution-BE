# Udemy Clone API Reference

Gunakan daftar ini sebagai contekan / panduan setiap kali kamu ingin melakukan tes di Postman atau Frontend. Pastikan tambahkan **Header: `Authorization: Bearer <token_kamu>`** di Postman (atau menggunakan fitur Collection Variables) untuk *route* yang butuh Autentikasi.

_Semua url diawali dengan `http://localhost:3000/api`_

---

## 1. 🔑 Auth & Users
1. **Register**
   - **POST** `http://localhost:3000/api/auth/register`
   - **JSON Body:**
     ```json
     {
       "name": "Giovan",
       "email": "giovan@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - **POST** `http://localhost:3000/api/auth/login`
   - **JSON Body:**
     ```json
     {
       "email": "admin@example.com",
       "password": "admin123"
     }
     ```

3. **Update User Profile (Auth)**
   - **PATCH** `http://localhost:3000/api/users/:id`
   - **JSON Body:** *(semua opsional)*
     ```json
     {
       "name": "Giovan Updated",
       "avatar": "https://link-to-gambar.com/avatar.jpg"
     }
     ```

---

## 2. 📂 Kategori (Categories)
1. **Get All Categories**
   - **GET** `http://localhost:3000/api/categories`

2. **Create Category (Khusus ADMIN)**
   - **POST** `http://localhost:3000/api/categories`
   - **JSON Body:**
     ```json
     {
       "name": "Artificial Intelligence",
       "slug": "artificial-intelligence",
       "description": "Belajar AI dan Machine Learning"
     }
     ```

---

## 3. 🎓 Kursus (Courses)
1. **Get All Courses (Public)**
   - **GET** `http://localhost:3000/api/courses`
   - *(Bisa ditambahkan query: `?categoryId=1&search=react&isFree=false`)*

2. **Create Course (Khusus TRAINER & ADMIN)**
   - **POST** `http://localhost:3000/api/courses`
   - **JSON Body:** 
     ```json
     {
       "title": "Mastering React JS",
       "description": "Belajar React JS dari nol",
       "price": 150000,
       "isFree": false,
       "categoryId": 1
     }
     ```
     *(Opsional: `thumbnail`, `previewYoutubeUrl`)*

---

## 4. 📑 Sections & Lessons
1. **Create Section (Khusus TRAINER)**
   - **POST** `http://localhost:3000/api/courses/:courseId/sections`
     (Ganti `:courseId` dengan id course)
   - **JSON Body:**
     ```json
     {
       "title": "Bagian 1: Pengenalan"
     }
     ```

2. **Create Lesson (Khusus TRAINER)**
   - **POST** `http://localhost:3000/api/sections/:sectionId/lessons`
     (Ganti `:sectionId` dengan id section)
   - **JSON Body:**
     ```json
     {
       "title": "Apa itu React?",
       "youtubeUrl": "https://www.youtube.com/watch?v=...",
       "duration": 600,
       "isPreview": true
     }
     ```

---

## 5. 🛒 Pembayaran / Enroll (Orders & Wishlist)
1. **Beli Kursus (Orders)**
   - **POST** `http://localhost:3000/api/orders`
   - **JSON Body:** (Bisa mengirim banyak `courseId` sekaligus)
     ```json
     {
       "courseIds": [1, 2]
     }
     ```

2. **Tambah ke Wishlist**
   - **POST** `http://localhost:3000/api/wishlist`
   - **JSON Body:**
     ```json
     {
       "courseId": 1
     }
     ```

---

## 6. 📚 Ruang Belajar (My Courses & Progress)
1. **Lihat Kursusku (My Courses)**
   - **GET** `http://localhost:3000/api/my-courses`

2. **Penyelesaian Lesson (Mark As Completed)**
   - **POST** `http://localhost:3000/api/lessons/:lessonId/complete`
   - *(Tidak butuh JSON Body)*

3. **Lihat Statistik Belajarku**
   - **GET** `http://localhost:3000/api/analytics/learning`

---

## 7. ⭐ Rating & Diskusi (Q&A)
1. **Tambah Rating/Review di Course**
   - **POST** `http://localhost:3000/api/courses/:courseId/rating`
   - **JSON Body:**
     ```json
     {
       "rating": 5,
       "review": "Sangat membantu!"
     }
     ```

2. **Bikin Diskusi di Lesson (Tanya Jawab)**
   - **POST** `http://localhost:3000/api/lessons/:lessonId/discussions`
   - **JSON Body:**
     ```json
     {
       "comment": "Saya bingung pas install dependencies, ada yang bisa bantu?"
     }
     ```

3. **Balas Diskusi**
   - **POST** `http://localhost:3000/api/discussions/:id/replies`
     (Ganti `:id` dengan id discussion)
   - **JSON Body:**
     ```json
     {
       "comment": "Coba gunakan npm install dengan flag --legacy-peer-deps"
     }
     ```

---

## 8. 👨‍🏫 Panel Instruktur (Trainer)
1. **User Request Jadi Instruktur**
   - **POST** `http://localhost:3000/api/trainer/request`
   - **JSON Body:**
     ```json
     {
       "cvUrl": "https://link-drive-cv-mu.com/cv.pdf",
       "bio": "Software Engineer di Tech Company...",
       "experience": "Pengalaman 5 tahun mengajar React JS..."
     }
     ```

2. **Admin Verify Instruktur**
   - **PATCH** `http://localhost:3000/api/admin/trainer/:id/verify`
     (Ganti `:id` dengan id dari TrainerRequest)
   - **JSON Body:**
     ```json
     {
       "status": "APPROVED" 
     }
     ```
     *(Isi status bisa `APPROVED` atau `REJECTED`. Kalau Approved, user otomatis jadi TRAINER).*

3. **Lihat Dashboard Penjualan (Khusus Trainer)**
   - **GET** `http://localhost:3000/api/trainer/dashboard`
   - **GET** `http://localhost:3000/api/trainer/sales`
