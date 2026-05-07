# MobileHybridSolutionWHB API Reference

Dokumentasi lengkap untuk semua endpoint di aplikasi ini. Gunakan panduan ini untuk melakukan tes di Postman atau integrasi dengan Frontend.

**Penting:** 
- Base URL: `http://localhost:3000/api` (atau disesuaikan dengan konfigurasi port servermu)
- Untuk endpoint yang membutuhkan **Auth**, tambahkan Header: `Authorization: Bearer <token_jwt_kamu>`
- Role yang tersedia: `USER` (Default saat daftar), `TRAINER`, `ADMIN`.

---

## 1. 🔑 Auth & Users

### Auth
1. **Register**
   - **POST** `/auth/register`
   - **Akses:** Public
   - **JSON Body:**
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - **POST** `/auth/login`
   - **Akses:** Public
   - **JSON Body:**
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```

### Users
*Semua endpoint `/users` membutuhkan Auth (Login).*
3. **Get All Users**
   - **GET** `/users`
   - **Akses:** ADMIN
   - **Query Params:** `?page=1&limit=10` (Opsional)

4. **Get User By ID**
   - **GET** `/users/:id`
   - **Akses:** Semua User Login

5. **Update User Profile**
   - **PATCH** `/users/:id`
   - **Akses:** Semua User Login
   - **JSON Body:** *(Semua field opsional)*
     ```json
     {
       "name": "John Updated",
       "email": "john_updated@example.com",
       "avatar": "https://link-to-gambar.com/avatar.jpg"
     }
     ```

6. **Delete User**
   - **DELETE** `/users/:id`
   - **Akses:** ADMIN

7. **Upload/Update Avatar**
   - **PATCH** `/users/:id/avatar`
   - **Akses:** Semua User Login
   - **Request:** `multipart/form-data`
   - **Body:**
     - `avatar`: File gambar (jpg/jpeg/png/webp)

---

## 2. 📂 Kategori (Categories)

1. **Get All Categories**
   - **GET** `/categories`
   - **Akses:** Public

2. **Get Category By ID**
   - **GET** `/categories/:id`
   - **Akses:** Public

3. **Create Category**
   - **POST** `/categories`
   - **Akses:** ADMIN
   - **JSON Body:**
     ```json
     {
       "name": "Pemrograman"
     }
     ```

4. **Update Category**
   - **PATCH** `/categories/:id`
   - **Akses:** ADMIN
   - **JSON Body:**
     ```json
     {
       "name": "Pemrograman Web"
     }
     ```

5. **Delete Category**
   - **DELETE** `/categories/:id`
   - **Akses:** ADMIN

---

## 3. 🎓 Kursus (Courses)

1. **Get All Courses**
   - **GET** `/courses`
   - **Akses:** Public
   - **Query Params (Opsional):** `?page=1&limit=10&categoryId=1&search=react&isFree=true&minPrice=0&maxPrice=100000&status=PUBLISHED`

2. **Get Course By ID**
   - **GET** `/courses/:id`
   - **Akses:** Public

3. **Create Course**
   - **POST** `/courses`
   - **Akses:** TRAINER, ADMIN
   - **JSON Body:**
     ```json
     {
       "title": "Mastering React JS",
       "description": "Belajar React JS dari nol",
       "price": 150000,
       "isFree": false,
       "thumbnail": "https://link-gambar.com/thumb.jpg",
       "previewYoutubeUrl": "https://youtube.com/watch?v=...",
       "categoryId": 1,
       "status": "DRAFT" 
     }
     ```
     *(Hanya `title` dan `categoryId` yang wajib, status bisa "DRAFT" atau "PUBLISHED", lainnya opsional)*

4. **Update Course**
   - **PATCH** `/courses/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **JSON Body:** Sama seperti Create Course, tapi semua field opsional.

5. **Delete Course**
   - **DELETE** `/courses/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN

6. **Get Course Students**
   - **GET** `/courses/:courseId/students`
   - **Akses:** TRAINER (Pemilik course), ADMIN

7. **Upload/Update Thumbnail Course**
   - **PATCH** `/courses/:id/thumbnail`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **Request:** `multipart/form-data`
   - **Body:**
     - `thumbnail`: File gambar (jpg/jpeg/png/webp)

---

## 4. 📑 Sections & Lessons

### Sections
1. **Get Course Sections**
   - **GET** `/courses/:courseId/sections`
   - **Akses:** Public

2. **Create Section**
   - **POST** `/courses/:courseId/sections`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **JSON Body:**
     ```json
     {
       "title": "Bagian 1: Pengenalan",
       "order": 1
     }
     ```
     *(`order` opsional)*

3. **Update Section**
   - **PATCH** `/sections/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **JSON Body:** *(Semua opsional)*
     ```json
     {
       "title": "Bagian 1: Pengenalan Updated",
       "order": 2
     }
     ```

4. **Delete Section**
   - **DELETE** `/sections/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN

### Lessons
5. **Create Lesson**
   - **POST** `/sections/:sectionId/lessons`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **JSON Body:**
     ```json
     {
       "title": "Apa itu React?",
       "youtubeUrl": "https://youtube.com/watch?v=...",
       "duration": 600,
       "isPreview": true,
       "order": 1
     }
     ```
     *(Hanya `title` yang wajib, lainnya opsional)*

6. **Update Lesson**
   - **PATCH** `/lessons/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN
   - **JSON Body:** Sama seperti Create Lesson, tapi semua field opsional.

7. **Delete Lesson**
   - **DELETE** `/lessons/:id`
   - **Akses:** TRAINER (Pemilik course), ADMIN

---

## 5. 🛒 Pembayaran, Enroll & Wishlist

### Orders
1. **Get My Orders**
   - **GET** `/orders`
   - **Akses:** Semua User Login

2. **Create Order (Beli Kursus)**
   - **POST** `/orders`
   - **Akses:** Semua User Login
   - **JSON Body:**
     ```json
     {
       "courseIds": [1, 2]
     }
     ```

### Enrollment
3. **Get My Courses (Kursus yang dibeli/diikuti)**
   - **GET** `/my-courses`
   - **Akses:** Semua User Login

4. **Enroll In Course (Daftar kursus)**
   - **POST** `/courses/:courseId/enroll`
   - **Akses:** Semua User Login

### Wishlist
5. **Get Wishlist**
   - **GET** `/wishlist`
   - **Akses:** Semua User Login

6. **Add To Wishlist**
   - **POST** `/wishlist`
   - **Akses:** Semua User Login
   - **JSON Body:**
     ```json
     {
       "courseId": 1
     }
     ```

7. **Remove From Wishlist**
   - **DELETE** `/wishlist/:courseId`
   - **Akses:** Semua User Login

---

## 6. 📚 Progress Belajar (Lesson Completion)

1. **Toggle Lesson Completion (Tandai selesai/belum selesai)**
   - **POST** `/lessons/:lessonId/complete`
   - **Akses:** Semua User Login
   - *(Tidak butuh JSON Body)*

2. **Get Learning Analytics (Statistik Belajarku)**
   - **GET** `/analytics/learning`
   - **Akses:** Semua User Login

---

## 7. ⭐ Rating & Diskusi (Q&A)

### Rating
1. **Get Course Ratings**
   - **GET** `/courses/:courseId/ratings`
   - **Akses:** Public

2. **Create Rating**
   - **POST** `/courses/:courseId/rating`
   - **Akses:** Semua User Login (Disarankan yang sudah enroll)
   - **JSON Body:**
     ```json
     {
       "rating": 5,
       "review": "Sangat membantu!"
     }
     ```
     *(`rating` wajib 1-5, `review` opsional)*

3. **Update Rating**
   - **PATCH** `/ratings/:id`
   - **Akses:** Semua User Login (Pemilik rating)
   - **JSON Body:**
     ```json
     {
       "rating": 4,
       "review": "Update: Bagus banget"
     }
     ```

4. **Delete Rating**
   - **DELETE** `/ratings/:id`
   - **Akses:** Semua User Login (Pemilik rating)

### Diskusi
5. **Get Discussions By Lesson**
   - **GET** `/lessons/:lessonId/discussions`
   - **Akses:** Public

6. **Create Discussion**
   - **POST** `/lessons/:lessonId/discussions`
   - **Akses:** Semua User Login
   - **JSON Body:**
     ```json
     {
       "comment": "Saya bingung pas install dependencies, ada yang bisa bantu?"
     }
     ```

7. **Create Reply (Balas diskusi)**
   - **POST** `/discussions/:id/replies`
   - **Akses:** Semua User Login
   - **JSON Body:**
     ```json
     {
       "comment": "Gunakan npm install --legacy-peer-deps"
     }
     ```

---

## 8. 👨‍🏫 Panel Instruktur (Trainer) & Pengajuan

### Pengajuan Trainer (Trainer Request)
1. **Submit Trainer Request**
   - **POST** `/trainer/request`
   - **Akses:** Semua User Login (USER biasa)
   - **Request:** `multipart/form-data`
   - **Body:**
     - `bio`: (Text, minimal 10 karakter) "Software Engineer di Tech Company..."
     - `experience`: (Text, minimal 10 karakter) "Pengalaman 5 tahun mengajar React JS..."
     - `cv`: File Dokumen (PDF)

2. **Get All Trainer Requests**
   - **GET** `/admin/trainer-requests`
   - **Akses:** ADMIN
   - **Query Params:** `?status=PENDING` (Opsional)

3. **Verify Trainer Request**
   - **PATCH** `/admin/trainer/:id/verify`
   - **Akses:** ADMIN
   - **JSON Body:**
     ```json
     {
       "status": "APPROVED" 
     }
     ```
     *(Pilihan status: `APPROVED` atau `REJECTED`)*

### Dashboard Instruktur
4. **Get Trainer Dashboard**
   - **GET** `/trainer/dashboard`
   - **Akses:** TRAINER, ADMIN

5. **Get Trainer Sales**
   - **GET** `/trainer/sales`
   - **Akses:** TRAINER, ADMIN

---

## 9. 🩺 Health Check

1. **System Health Check**
   - **GET** `/health`
   - **Akses:** Public
